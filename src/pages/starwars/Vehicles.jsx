import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import "https://kit.fontawesome.com/072e5df971.js"

export const Vehicles = () => {

    //Usamos la base de favoritos
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
            
    /**
        * Returns true if the vehicle with the given uid is in the favourites list
        * @param {string} uid - The id of the vehicle to check
        * @returns {boolean} - Whether the vehicle is in the favourites list
    */
    
        const isFavourite = (uid) => {
            const isTrue = store.favourites.some((fav) => fav.uid == uid);
            return isTrue;
         };
        
        /**
            * Toggles the favorite status of a vehicle.
            * If the vehicle is already a favorite, they will be removed from the favorites list.
            * If the vehicle is not a favorite, they will be added to the favorites list.
            *
            * @param {Object} vehicle - The vehicle object containing at least a `name` and `uid`.
        */
              const handleFavorite = (vehicle) => {
                if (isFavourite(vehicle.uid)) {
                  dispatch({ type: "remove_favourite", payload: vehicle.uid });
                } else {
                    const newFavourite = {
                        name: vehicle.name,
                        type: "vehicles",
                        uid: vehicle.uid
                    }
                  dispatch({ type: "add_favourite", payload: newFavourite });
                }
              };

    //Conectamos la API con los vehículos
    const BASE_URL = "https://www.swapi.tech/api";
    //Definimos función que muestre todos los vehiculos
    const getVehicles = async () => {
        // https://www.swapi.tech/api/vehicles
        const response = await fetch(`${BASE_URL}/vehicles`);
        if (!response.ok) throw new Error("Error fetching Vehicles");
        const data = await response.json();
        // {message: '', results: []}
        return data.results;
    }
    
    const { data: vehicles, loading: loadingVehicles } = useFetch(getVehicles, null);

    return (
        <>
            <h1>Vehículos</h1>

            <div className='row'>
                {loadingVehicles ? (
                    <p>Cargando vehículos ....</p>
                ) : (
                    vehicles.map((vehicle, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className='card'>
                                <img
                                    src="https://placehold.co/400x200"
                                    className="card-img-top"
                                    alt={vehicle.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-text'>{vehicle.name}</h5>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-around">
                                    <Link to={`/vehicles/${vehicle.uid}`} className="btn btn-primary mb-2">
                                        Learn More
                                    </Link>
                                    <button
                                        className={`favorite-btn ${isFavourite ? "active" : ""}`}
                                        onClick={() => {handleFavorite(vehicle)}}
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