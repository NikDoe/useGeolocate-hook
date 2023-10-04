import { useState } from "react";

type TCoordinates = {
	latitude: number;
	longitude: number;
}

export const useGeolocation = function () {
	const [coordinates, setCoordinates] = useState<null | TCoordinates>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	const getCurrentPostion = function () {
		if(!navigator.geolocation) {
			setErrorMessage("Геолокация не поддерживается в вашем браузере");
		}

		setIsLoading(true);

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoordinates(
					{
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}
				);

				setIsLoading(false);
			},
			(error) => {
				const errorMessages: Record<number, string> = {
					1: "Пользователь запретил доступ к геолокации",
					2: "Информация о местоположении недоступна",
					3: "Время ожидания запроса геолокации истекло"
				};

				setErrorMessage(errorMessages[error.code] || "Произошла неизвестная ошибка");
				setIsLoading(false);
			}
		);
	};

	return { coordinates, isLoading, errorMessage, getCurrentPostion };
};