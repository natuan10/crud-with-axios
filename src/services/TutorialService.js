import httpCommon from "../http-common";

const getAll = () => {
	return httpCommon.get("/fakeData");
};

const get = (id) => {
	return httpCommon.get(`/fakeData/${id}`);
};

const create = (data) => {
	return httpCommon.post("/fakeData", data);
};

const update = (id, data) => {
	return httpCommon.put(`/fakeData/${id}`, data);
};

const remove = (id) => {
	return httpCommon.delete(`/fakeData/${id}`);
};

const removeAll = () => {
	return httpCommon.delete(`/fakeData`);
};

const findByTitle = (title) => {
	return httpCommon.get(`/fakeData?title=${title}`);
};

const TutorialService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
};

export default TutorialService;
