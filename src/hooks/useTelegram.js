
export default function useTelegram() {

	const tg = window.Telegram.WebApp;

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

/* import React, { useEffect, useState, createContext, useContext, useMemo } from "react";

export const TelegramContext = createContext({});
export const TelegramProvider = ({ children, React }) => {

	const [webApp, setWebApp] = useState(null);

	useEffect(() => {
		const app = window.Telegram?.WebApp;
		if (app) {
			app.ready();
			setWebApp(app);
		}
	}, []);

	const value = useMemo(() => {
		return webApp
			? {
				webApp,
				unsafeData: webApp.initDataUnsafe,
				user: webApp.initDataUnsafe.user,
			}
			: {};
	}, [webApp]);

	return (
		<TelegramContext.Provider value={value}>
<Script
	src="https://telegram.org/js/telegram-web-app.js"
/>
{ children }
		</TelegramContext.Provider >
	);
};

export const useTelegram = () => useContext(TelegramContext); */