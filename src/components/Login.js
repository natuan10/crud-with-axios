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
				<section
					className="vh-100 bg-image"
					style={{
						backgroundImage:
							"url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp'",
					}}
				>
					<p
						ref={errRef}
						className={errMessage ? "errmsg" : "offscreen"}
					>
						{errMessage}
					</p>
					<div className="mask d-flex align-items-center h-100 gradient-custom-3">
						<div className="container h-100">
							<div className="row d-flex justify-content-center align-items-center h-100">
								<div className="col-12 col-md-9 col-lg-7 col-xl-6">
									<div
										className="card"
										style={{ borderRadius: "15px" }}
									>
										<div className="card-body p-5">
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
														onChange={(e) =>
															setEmail(
																e.target.value
															)
														}
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
															setPassword(
																e.target.value
															)
														}
														value={password}
														required
													/>
												</div>
												<div className="d-flex justify-content-center">
													<button
														type="submit"
														className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
													>
														Sign In
													</button>
												</div>
											</form>
											<p>
												Need an Account ? <br />
												<span className="line">
													<Link
														to={"/sign-up"}
														className="nav-link"
													>
														Sign-up
													</Link>
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default Login;
