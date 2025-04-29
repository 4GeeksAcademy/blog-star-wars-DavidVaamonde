import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import "https://kit.fontawesome.com/072e5df971.js"

export const Starships = () => {

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
        * Toggles the favorite status of a starship.
        * If the starship is already a favorite, they will be removed from the favorites list.
        * If the starship is not a favorite, they will be added to the favorites list.
        *
        * @param {Object} starship - The starship object containing at least a `name` and `uid`.
    */
          const handleFavorite = (starship) => {
            if (isFavourite(starship.uid)) {
              dispatch({ type: "remove_favourite", payload: starship.uid });
            } else {
                const newFavourite = {
                    name: starship.name,
                    type: "starships",
                    uid: starship.uid
                }
              dispatch({ type: "add_favourite", payload: newFavourite });
            }
          };


    //Conectamos la API con las naves estelares
    const BASE_URL = "https://www.swapi.tech/api";
    //Definimos función que muestre todas las naves estelares
    const getStarships = async () => {
        // https://www.swapi.tech/api/starships
        const response = await fetch(`${BASE_URL}/starships`);
        if (!response.ok) throw new Error("Error fetching Starships");
        const data = await response.json();
        // {message: '', results: []}
        return data.results;
    }

    const { data: starships, loading: loadingStarships } = useFetch(getStarships, null);

    return (
        <>
            <h1>Naves estelares</h1>
            <div className='row'>
                {loadingStarships ? (
                    <p>Cargando naves estelares ....</p>
                ) : (
                    starships.map((starship, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className='card'>
                                <img
                                    src="https://placehold.co/400x200"
                                    className="card-img-top"
                                    alt={starship.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-text'>{starship.name}</h5>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around">
                                    <Link to={`/starships/${starship.uid}`} className="btn btn-primary mb-2">
                                        Learn More
                                    </Link>
                                    <button
                                        className={`favorite-btn ${isFavourite ? "active" : ""}`}
                                        onClick={() => {handleFavorite(starship)}}
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