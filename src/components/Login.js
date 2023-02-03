import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import httpCommon from "../http-common";

const LOGIN_URL = "/authentication/login";
function Login() {
	// const { setAuth } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setErrMessage("");
	}, [email, password]);

	const userRef = useRef();
	const errRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await httpCommon.post(
				LOGIN_URL,
				JSON.stringify({ email, password })
			);

			console.log(JSON.stringify(response?.data));
			// const accessToken = response?.data?.token;
			// const roles = response?.data?.roles;

			// setAuth({ email, password, roles, accessToken });
			setEmail("");
			setPassword("");
			setSuccess(true);
		} catch (error) {
			if (!error.response) {
				setErrMessage("No server response");
			} else if (!error.response.status === 400) {
				setErrMessage("Missing username or password");
			} else if (!error.response.status === 401) {
				setErrMessage("Unauthorized");
			} else {
				setErrMessage("Login failed");
			}
			errRef.current.focus();
		}
		console.log(email, password);
	};

	return (
		<>
			{success ? (
				<section>
					<h1>You are login</h1>
					<br />
					<a href="">Go to home</a>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMessage ? "errmsg" : "offscreen"}
					>
						{errMessage}
					</p>
					<div className="col-md-6">
						<h1>Sign In</h1>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label
									htmlFor="username"
									className="form-label"
								>
									Username
								</label>
								<input
									type="text"
									className="form-control"
									id="username"
									ref={userRef}
									autoComplete="off"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									required
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="password"
									className="form-label"
								>
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="password"
									autoComplete="off"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
									required
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Sign In
							</button>
						</form>
						<p>
							Need an Account ? <br />
							<span className="line">
								<Link to={"/sign-up"} className="nav-link">
									Sign-up
								</Link>
							</span>
						</p>
					</div>
				</section>
			)}
		</>
	);
}

export default Login;
