import axios from "axios";

export default axios.create({
	baseURL: "https://63db214fe4158e02f31692c2.mockapi.io/api",
	headers: {
		"Content-type": "application/json",
	},
});
