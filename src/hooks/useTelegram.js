/* const tg = window.Telegram.WebApp;

export function useTelegram() {

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
} */

import React, { useEffect, useState, createContext, useContext, useMemo } from "react";

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
			{/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
			<Script
				src="https://telegram.org/js/telegram-web-app.js"
				strategy="beforeInteractive"
			/>
			{children}
		</TelegramContext.Provider>
	);
};

export const useTelegram = () => useContext(TelegramContext);