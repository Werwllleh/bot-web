import axios from "axios";

/**
 * Get cats pictures
 * @param {number} length
 * @returns {Promise<Array<{ title: string, url:string }>}
 * 
 */
export const getImages = (length = 10) => {
	return fetch(`https://api.thecatapi.com/v1/breeds`)
		.then((response) => response.json())
		.then((response) => {
			const images = [];
			response.forEach((c) => {
				const title = c?.description;
				const url = c?.image?.url;

				images.push({ title, url });
			});
			return images.slice(0, length); // remove the extra cats
		});
};

/* export const getImages = (length = 10) => {

	return axios
		.get(
			`https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`
		)
		// .then((response) => response.json())
		.then((response) => {
			return console.log(response);; // remove the extra cats
		});
} */