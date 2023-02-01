import { useEffect, useState } from "react";
import TutorialService from "../services/TutorialService";

function TutorialsList() {
	const [tutorials, setTutorials] = useState([]);
	const [currentTutorial, setCurrentTutorial] = useState(null);

	useEffect(() => {
		retrieveTutorials();
	});

	const retrieveTutorials = () => {
		TutorialService.getAll()
			.then((response) => {
				setTutorials(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
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
					<li className="list-group-item active" aria-current="true">
						An active item
					</li>
					<li className="list-group-item">A second item</li>
					<li className="list-group-item">A third item</li>
					<li className="list-group-item">A fourth item</li>
					<li className="list-group-item">And a fifth one</li>
				</ul>
			</div>
			<div className="col-md-6">
				<div>
					<h4>Tutorial</h4>
					<div>
						<label>
							<strong>Title:</strong>
						</label>
					</div>
					<div>
						<label>
							<strong>Description:</strong>
						</label>
					</div>
					<div>
						<label>
							<strong>Status:</strong>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TutorialsList;
