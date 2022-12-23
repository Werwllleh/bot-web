
let tg = window.Telegram.WebApp;

export default function useTelegram() {

	const onClose = () => {
		tg.close()
	}

	const onToggleButton = () => {
		tg.MainButton.text = "Отправить";
		if (tg.MainButton.isVisible) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}

	return {
		onClose,
		onToggleButton,
		tg,
		user: tg.initDataUnsafe?.user,
	}
}