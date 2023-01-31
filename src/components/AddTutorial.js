import { useState } from "react";
import TutorialService from "../services/TutorialService";

function AddTutorial() {
	const initialTutorialState = {
		id: null,
		title: "",
		description: "",
		published: false,
	};
	const [tutorial, setTutorial] = useState(initialTutorialState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (e) => {
		console.log(e);
		const { name, value } = e.target;
		setTutorial({ ...tutorial, [name]: value });
	};

	const saveTutorial = () => {
		var data = {
			title: tutorial.title,
			description: tutorial.description,
		};

		TutorialService.create(data)
			.then((response) => {
				setTutorial({
					id: response.data.id,
					title: response.data.title,
					description: response.data.description,
					published: response.data.published,
				});
				setSubmitted(true);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<form>
				<div className="mb-3">
					<label className="form-label">Title</label>
					<input
						required
						type="text"
						className="form-control"
						id="title"
						value={tutorial.title}
						onChange={handleInputChange}
						name="title"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<input
						type="text"
						className="form-control"
						id="description"
						required
						value={tutorial.description}
						onChange={handleInputChange}
						name="description"
					/>
				</div>

				<button onClick={saveTutorial} className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default AddTutorial;
