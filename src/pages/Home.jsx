import React from "react";
import starwarsLogo from "../assets/img/star-wars-impactmkt-medium-size.jpg"

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1>Hola Joven Padawan!!</h1>
			<p>
				<img src={starwarsLogo} />
				
			</p>
		</div>
	);
}; 