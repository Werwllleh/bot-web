import axios from "axios";

export const getPartnersData = async () => {

	return (
		await axios.get(
			'https://script.google.com/macros/s/AKfycbw2LiDhoOW4PC5bYXiP0J4GY03O460rLkSvwtT2JsDLk93OEvFIhzRqe-3xTK7qa_vBUw/exec'
		)
	)
};

export const groupedPartnersFunc = (requiredArr) => {

	const groupedObject = {}

	requiredArr.forEach(item => {
		if (!groupedObject[item.partCategory]) {
			groupedObject[item.partCategory] = [];
		}
		groupedObject[item.partCategory].push({
			name: item.partName,
			description: item.partDescp,
			link: item.partLink,
			phone: item.partPhone,
			address: item.partAddress
		});
	});

	return groupedObject;

}

export const phoneArrayFunc = (phones) => {

	const phonesCleaned = []

	phones.split(',').map(phone => {
		// Удалить все символы, кроме цифр и заменить "-" на пустую строку
		const cleanedPhone = phone.replace(/\D/g, '').replace('-', '');
		// Если первый символ - это "8", заменить его на "7"
		phonesCleaned.push(cleanedPhone.startsWith('8') && cleanedPhone.length === 11 ? '+7' + cleanedPhone.slice(1) : cleanedPhone);
	})

	return phonesCleaned;
};

export const linksArrayFunc = (links) => {

	const linksCleaned = []

	links.split(',').map(link => {
		linksCleaned.push(link.trim());
	})

	return linksCleaned;
};
