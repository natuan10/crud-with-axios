import httpCommon from "../http-common";

const getAll = () => {
	return httpCommon.get("/tutorials");
};

const login = () => {
	return httpCommon.post("/user/login");
};

const get = (id) => {
	return httpCommon.get(`/tutorials/${id}`);
};

const create = (data) => {
	return httpCommon.post("/tutorials", data);
};

const update = (id, data) => {
	return httpCommon.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
	return httpCommon.delete(`/tutorials/${id}`);
};

const removeAll = () => {
	return httpCommon.delete(`/tutorials`);
};

const findByTitle = (title) => {
	return httpCommon.get(`/tutorials?title=${title}`);
};

const TutorialService = {
	login,
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
};

export default TutorialService;
