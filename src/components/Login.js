import { useState, useEffect } from "react";

function Login() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState(false);

	return (
		<section>
			<div className="col-md-3">
				<h1>Sign In</h1>
				<form>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Username:
						</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
						/>
					</div>
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="exampleCheck1"
						/>
						<label className="form-check-label">Check me out</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}

export default Login;
