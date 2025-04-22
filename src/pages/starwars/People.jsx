import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import useGlobalReducer from '../../hooks/useGlobalReducer';

export const People = () => {

        //Usamos la base de favoritos
        const navigate = useNavigate();
        const { store, dispatch } = useGlobalReducer();

        const isFavourite = store.favourites.some((fav) => fav.uid == uid);

        const handleFavorite = () => {
            if (isFavourite) {
                dispatch({ type: "remove_favourite", payload: { uid } });
            } else {
                dispatch({ type: "add_favourite", payload: { uid, name: title.name } });
            }
        };

        //Conectamos la API con los planetas
        const BASE_URL = "https://www.swapi.tech/api";
        //Definimos función que muestre todos los personajes
        const getPeople = async () => {
            // https://www.swapi.tech/api/people
            const response = await fetch(`${BASE_URL}/people`);
            if (!response.ok) throw new Error("Error fetching People");
            const data = await response.json();
            // {message: '', results: []}
            return data.results;
        }
        //Definimos función que muestre un planeta específico
        const getPeopleById = async (id) => {
            // https://www.swapi.tech/api/people/1
            const response = await fetch(`${BASE_URL}/people/${id}`);
            if (!response.ok) throw new Error("Error fetching People");
            const data = await response.json();
            return data.result;
        }
    
        const { data: people, loading: loadingPeople } = useFetch(getPeople, null);

    return (
        <>
            <h1>Personajes</h1>

            <div className='row'>
                {loadingPeople ? (
                    <p>Cargando personajes ....</p>
                ) : (
                    people.map((person, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className='card'>
                                <img
                                    src="https://placehold.co/400x200"
                                    className="card-img-top"
                                    alt={person.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-text'>{person.name}</h5>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button
                                        className={`favorite-btn ${isFavourite ? "active" : ""}`}
                                        onClick={handleFavorite}
                                    >
                                        <i className="bi bi-heart-fill"></i>
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