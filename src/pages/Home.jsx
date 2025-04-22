import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import starwarsLogo from "../assets/img/star-wars-impactmkt-medium-size.jpg"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Hola Joven Padawan!!</h1>
			<p>
				<img src={starwarsLogo} />
				
			</p>
		</div>
	);
}; 