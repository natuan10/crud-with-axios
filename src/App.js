import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from "react-router-dom";
import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
	return (
		<div>
			{/* <nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/tutorials" className="navbar-brand">
					CRUD
				</a>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/tutorials"} className="nav-link">
							Tutorials
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/add"} className="nav-link">
							Add
						</Link>
					</li>
				</div>
			</nav> */}

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/tutorials" element={<TutorialsList />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/add" element={<AddTutorial />} />
				<Route path="/tutorials/:id" element={<Tutorial />} />
			</Routes>
		</div>
	);
}

export default App;
