import { useGeolocation } from "./hooks/useGeolocation";

function App() {

	const { 
		coordinates,
		isLoading,
		errorMessage,
		getCurrentPostion 
	} = useGeolocation();

	const loaderContent = <p>Loading...</p>;

	const errorContent = <p>{errorMessage}</p>;

	const coordsString = `${coordinates?.latitude}/${coordinates?.longitude}`;

	const coordsLink = (
		<a 
			target="blank"
			href={
				`https://www.openstreetmap.org/#map=16/${coordsString}`
			}>
			{coordsString}
		</a>
	);

	const coordsContent = (
		<p>Ваше текущее местомоложение : {coordsLink}</p>
	);

	return (
		<div>
			<button
				onClick={getCurrentPostion}
			>
				моё местоположение 🌍
			</button>
			{isLoading && loaderContent}
			{errorMessage && errorContent}
			{coordinates && !isLoading && !errorMessage && coordsContent}
		</div>
	);
}

export default App;
