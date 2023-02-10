import {
	faCheck,
	faInfoCircle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import httpCommon from "../http-common";
import "./style.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const SIGNUP_URL = "/authentication/signup";

function SignUp() {
	// const userRef = userRef();
	// const errRef = userRef();

	const { setAuth } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const result = USER_REGEX.test(name);
		console.log(result);
		console.log(name);
		setValidName(result);
	}, [name]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PWD_REGEX.test(password);
		console.log(result);
		console.log(name);
		setValidPassword(result);
		const match = password === matchPwd;
		setValidMatch(match);
	}, [password, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [name, password, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const v1 = USER_REGEX.test(name);
		const v2 = PWD_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await httpCommon.post(
				SIGNUP_URL,
				JSON.stringify({ name, email, password })
			);
			console.log(response.data, "response");
			const roles = response?.data?.roles;
			setAuth({ roles });
			setSuccess(true);

			// setName("");
			// setEmail("");
			// setPassword("");
			// setMatchPwd("");
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No server response");
			} else if (error.response.status === 409) {
				setErrMsg("username taken");
			} else {
				setErrMsg("registration failed");
			}
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>success</h1>
					<Link to={"/login"} className="nav-link">
						Login
					</Link>
				</section>
			) : (
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
											<p
												className={
													errMsg
														? "errmsg"
														: "offscreen"
												}
											>
												{errMsg}
											</p>
											<form onSubmit={handleSubmit}>
												<div className="form-outline mb-4">
													<label
														className="form-label"
														htmlFor="username"
													>
														Username
														<span
															className={
																validName &&
																name
																	? "valid"
																	: "hide"
															}
														>
															<FontAwesomeIcon
																icon={faCheck}
															/>
														</span>
														<span
															className={
																validName ||
																!name
																	? "hide"
																	: "invalid"
															}
														>
															<FontAwesomeIcon
																icon={faTimes}
															/>
														</span>
													</label>
													<input
														type="text"
														id="username"
														autoComplete="off"
														onChange={(e) =>
															setName(
																e.target.value
															)
														}
														aria-invalid={
															validName
																? "false"
																: "true"
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
															userFocus &&
															!validName
																? "instructions"
																: "offscreen"
														}
													>
														4 to 24 characters.{" "}
														<br />
														Must begin with a
														letter. <br />
														Letters, numbers,
														underscores, hyphens
														allowed
													</p>
												</div>

												<div className="form-outline mb-4">
													<label
														className="form-label"
														htmlFor="username"
													>
														Email
														<span
															className={
																validEmail &&
																email
																	? "valid"
																	: "hide"
															}
														>
															<FontAwesomeIcon
																icon={faCheck}
															/>
														</span>
														<span
															className={
																validEmail ||
																!email
																	? "hide"
																	: "invalid"
															}
														>
															<FontAwesomeIcon
																icon={faTimes}
															/>
														</span>
													</label>
													<input
														type="text"
														id="username"
														autoComplete="off"
														onChange={(e) =>
															setEmail(
																e.target.value
															)
														}
														aria-invalid={
															validEmail
																? "false"
																: "true"
														}
														aria-describedby="emailnote"
														onFocus={() =>
															setEmailFocus(true)
														}
														onBlur={() =>
															setEmailFocus(false)
														}
														required
														className="form-control form-control-lg"
													/>
													<p
														id="emailnote"
														className={
															emailFocus &&
															!validEmail
																? "instructions"
																: "offscreen"
														}
													>
														Regex Email
													</p>
												</div>
												<div className="form-outline mb-4">
													<label
														className="form-label"
														htmlFor="password"
													>
														Password
														<span
															className={
																validPassword &&
																password
																	? "valid"
																	: "hide"
															}
														>
															<FontAwesomeIcon
																icon={faCheck}
															/>
														</span>
														<span
															className={
																validPassword ||
																!password
																	? "hide"
																	: "invalid"
															}
														>
															<FontAwesomeIcon
																icon={faTimes}
															/>
														</span>
													</label>
													<input
														type="password"
														id="password"
														autoComplete="off"
														onChange={(e) =>
															setPassword(
																e.target.value
															)
														}
														required
														aria-invalid={
															validPassword
																? "false"
																: "true"
														}
														aria-describedby="uidpwd"
														onFocus={() =>
															setPasswordFocus(
																true
															)
														}
														onBlur={() =>
															setPasswordFocus(
																false
															)
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
														8 to 24 characters.{" "}
														<br />
														Must include uppercase
														and lowercase letter, a
														number and a special
														characters
														<br />
														Allowed special
														characters: !, @, #, $,
														%
													</p>
												</div>

												<div className="form-outline mb-4">
													<label
														className="form-label"
														htmlFor="rePassword"
													>
														Confirm password
														<span
															className={
																validMatch &&
																matchPwd
																	? "valid"
																	: "hide"
															}
														>
															<FontAwesomeIcon
																icon={faCheck}
															/>
														</span>
														<span
															className={
																validMatch ||
																!matchPwd
																	? "hide"
																	: "invalid"
															}
														>
															<FontAwesomeIcon
																icon={faTimes}
															/>
														</span>
													</label>
													<input
														type="password"
														id="password"
														autoComplete="off"
														onChange={(e) =>
															setMatchPwd(
																e.target.value
															)
														}
														required
														aria-invalid={
															validMatch
																? "false"
																: "true"
														}
														aria-describedby="confirmnote"
														onFocus={() =>
															setMatchFocus(true)
														}
														onBlur={() =>
															setMatchFocus(false)
														}
														className="form-control form-control-lg"
													/>
													<p
														id="confirmnote"
														className={
															matchFocus &&
															!validMatch
																? "instructions"
																: "offscreen"
														}
													>
														<FontAwesomeIcon
															icon={faInfoCircle}
														/>
														Must match the first
														password input field.
													</p>
												</div>
												<div className="d-flex justify-content-center">
													<button
														disabled={
															!validMatch ||
															!validPassword ||
															!validName ||
															!validEmail
																? true
																: false
														}
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
			)}
		</>
	);
}

export default SignUp;
