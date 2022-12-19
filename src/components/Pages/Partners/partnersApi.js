import axios from "axios";

export const getPartnersData = async () => {
	return (
		await axios.get(
			`https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`
		)
	)
};