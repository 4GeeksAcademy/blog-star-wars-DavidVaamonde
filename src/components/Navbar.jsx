import { Link } from "react-router-dom";
import starwarsLogo from "../assets/img/star-wars-impactmkt-medium-size.jpg"

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				{/* Imagen Star Wars*/ }
				<Link to="/">
					<img id="logoStar" src={starwarsLogo} />
				</Link>
				
				{/* Botón para el Offcanvas */}
				<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      				<span class="navbar-toggler-icon"></span>
    			</button>

				{/* Componente OffCanvas */}
				<div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
					<div className="offcanvas-header">
        				<h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Blog de Star Wars</h5>
        				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      				</div>
					<hr />
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1">
							<li className="nav-item">
								<Link to="/" className="nav-link active" aria-current="page">
									<span className="navbar-brand">Home</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/films" className="nav-link">
									Películas
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/people" className="nav-link">
									Protagonistas
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/planets" className="nav-link">
									Planetas
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/species" className="nav-link">
									Especies
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/starships" className="nav-link">
									Naves estelares
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/vehicles" className="nav-link">
									Vehículos
								</Link>
							</li>
						</ul>
					</div>
				</div>
				
			</div>
		</nav>
	);
};