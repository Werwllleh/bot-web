import axios from "axios";

export const getPartnersData = async () => {
	return (
		await axios.get(
			'https://script.google.com/macros/s/AKfycbxBJcTulyPPlLTw1XQ9oobyhX3iL95AakHteTdfPRytaEjYDZP9XfKBaOCoeb1_8JQ3Ag/exec'
		)
	)
};