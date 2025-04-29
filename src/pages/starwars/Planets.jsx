import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import "https://kit.fontawesome.com/072e5df971.js"

export const Planets = () => {

    //Usamos la base de favoritos
      const navigate = useNavigate();
      const { store, dispatch } = useGlobalReducer();
    
      /**
       * Returns true if the person with the given uid is in the favourites list
       * @param {string} uid - The id of the person to check
       * @returns {boolean} - Whether the person is in the favourites list
       */
      const isFavourite = (uid) => {
        const isTrue = store.favourites.some((fav) => fav.uid == uid);
        return isTrue;
      };

      /**
        * Toggles the favorite status of a planet.
        * If the planet is already a favorite, they will be removed from the favorites list.
        * If the planet is not a favorite, they will be added to the favorites list.
        *
        * @param {Object} planet - The planet object containing at least a `name` and `uid`.
        */
      const handleFavorite = (planet) => {
        if (isFavourite(planet.uid)) {
          dispatch({ type: "remove_favourite", payload: planet.uid });
        } else {
            const newFavourite = {
                name: planet.name,
                type: "planets",
                uid: planet.uid
            }
          dispatch({ type: "add_favourite", payload: newFavourite });
        }
      };

    //Conectamos la API con los planetas
    const BASE_URL = "https://www.swapi.tech/api";
    //Definimos función que muestre todos los planetas
    const getPlanets = async () => {
        // https://www.swapi.tech/api/planets
        const response = await fetch(`${BASE_URL}/planets`);
        if (!response.ok) throw new Error("Error fetching Planets");
        const data = await response.json();
        // {message: '', results: []}
        return data.results;
    }
    

    const { data: planets, loading: loadingPlanets } = useFetch(getPlanets, null);

    return (
        <>
            <h1>Planetas</h1>
            <div className='row'>
                {loadingPlanets ? (
                    <p>Cargando planetas ....</p>
                ) : (
                    planets.map((planet, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className='card'>
                                <img
                                    src="https://placehold.co/400x200"
                                    className="card-img-top"
                                    alt={planet.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-text'>{planet.name}</h5>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around">
                                    <Link to={`/planets/${planet.uid}`} className="btn btn-primary mb-2">
                                        Learn More
                                    </Link>
                                    <button
                                        className={`favorite-btn ${isFavourite ? "active" : ""}`}
                                        onClick={() => {handleFavorite(planet)}}
                                    >
                                        <i class="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Link to="/">
                <button className='btn btn-primary'>
                    Volver
                </button>
            </Link>
            
        </>
    )
}