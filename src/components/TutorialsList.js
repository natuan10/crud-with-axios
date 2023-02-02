import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TutorialService from "../services/TutorialService";

function TutorialsList() {
	const [tutorials, setTutorials] = useState([]);
	const [currentTutorial, setCurrentTutorial] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);

	useEffect(() => {
		retrieveTutorials();
	}, []);

	const retrieveTutorials = () => {
		TutorialService.getAll()
			.then((response) => {
				setTutorials(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const setActiveTutorial = (tutorial, index) => {
		setCurrentTutorial(tutorial);
		setCurrentIndex(index);
	};

	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="search"
						className="form-control rounded"
						placeholder="Search by title"
					/>
					<button type="button" className="btn btn-outline-primary">
						search
					</button>
				</div>
			</div>
			<div className="col-md-6">
				<h4>List group</h4>
				<ul className="list-group">
					{tutorials &&
						tutorials.map((tutorial, index) => (
							<li
								className={
									"list-group-item " +
									(index === currentIndex ? "active" : "")
								}
								onClick={() =>
									setActiveTutorial(tutorial, index)
								}
								key={index}
							>
								{tutorial.title}
							</li>
						))}
				</ul>
			</div>
			<div className="col-md-6">
				{currentTutorial ? (
					<div>
						<h4>Tutorial</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>
							{currentTutorial.title}
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>
							{currentTutorial.description}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
							</label>
							{currentTutorial.published
								? "Published"
								: "Pending"}
						</div>

						<Link to={"/tutorials/" + currentTutorial.id}>
							Edit
						</Link>
					</div>
				) : (
					<div>
						<p>Please choose a tutorial</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default TutorialsList;
