import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
function SignUp() {
	// const userRef = userRef();
	// const errRef = userRef();

	const [user, setUser] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		console.log(result);
		console.log(user);
		setValidName(result);
	}, [user]);

	useEffect(() => {
		const result = PWD_REGEX.test(password);
		console.log(result);
		console.log(user);
		setValidPassword(result);
		const match = password === matchPwd;
		setValidMatch(match);
	}, [password, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, password, matchPwd]);

	return (
		<section
			className="vh-100 bg-image"
			style={{
				backgroundImage:
					"url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp'",
			}}
		>
			<div className="mask d-flex align-items-center h-100 gradient-custom-3">
				<div className="container h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-9 col-lg-7 col-xl-6">
							<div
								className="card"
								style={{ borderRadius: "15px" }}
							>
								<div className="card-body p-5">
									<h2 className="text-uppercase text-center mb-5">
										Create an account
									</h2>

									<form>
										<div className="form-outline mb-4">
											<label
												className="form-label"
												htmlFor="username"
											>
												Username
											</label>
											<input
												type="text"
												id="username"
												autoComplete="off"
												onChange={(e) =>
													setUser(e.target.value)
												}
												aria-invalid={
													validName ? "false" : "true"
												}
												aria-describedby="uidnote"
												onFocus={() =>
													setUserFocus(true)
												}
												onBlur={() =>
													setUserFocus(false)
												}
												required
												className="form-control form-control-lg"
											/>
											<p
												id="uidnote"
												className={
													userFocus && !validName
														? "instructions"
														: "offscreen"
												}
											>
												4 to 24 characters. <br />
												Must begin with a letter. <br />
												Letters, numbers, underscores,
												hyphens allowed
											</p>
										</div>
										<div className="form-outline mb-4">
											<label
												className="form-label"
												htmlFor="password"
											>
												Password
											</label>
											<input
												type="password"
												id="password"
												autoComplete="off"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												required
												aria-invalid={
													validPassword
														? "false"
														: "true"
												}
												aria-describedby="uidpwd"
												onFocus={() =>
													setPasswordFocus(true)
												}
												onBlur={() =>
													setPasswordFocus(false)
												}
												className="form-control form-control-lg"
											/>
											<p
												id="uidpwd"
												className={
													passwordFocus &&
													!validPassword
														? "instructions"
														: "offscreen"
												}
											>
												password regex. <br />
												. <br />
											</p>
										</div>

										<div className="form-outline mb-4">
											<label
												className="form-label"
												htmlFor="rePassword"
											>
												Confirm password
											</label>
											<input
												type="password"
												id="form3Example4cdg"
												className="form-control form-control-lg"
											/>
										</div>

										<div className="form-check d-flex justify-content-center mb-5">
											<input
												className="form-check-input me-2"
												type="checkbox"
												value=""
												id="form2Example3cg"
											/>
											<label
												className="form-check-label"
												htmlFor="checkLabel"
											>
												I agree all statements in{" "}
												<a
													href="#!"
													className="text-body"
												>
													<u>Terms of service</u>
												</a>
											</label>
										</div>

										<div className="d-flex justify-content-center">
											<button
												type="button"
												className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
											>
												Register
											</button>
										</div>

										<p className="text-center text-muted mt-5 mb-0">
											Have already an account?{" "}
											<Link
												to={"/login"}
												className="fw-bold text-body"
											>
												Login here
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SignUp;
