import axios from "axios";

export default axios.create({
	baseURL: "https://63da32612af48a60a7c755b2.mockapi.io/api",
	headers: {
		"Content-type": "application/json",
	},
});
