import React from 'react'
import { Link } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import "https://kit.fontawesome.com/072e5df971.js"

export const Starships = () => {

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
    //Definimos función que muestre una nave estelar específico
    const getStarshipById = async (id) => {
        // https://www.swapi.tech/api/starships/4
        const response = await fetch(`${BASE_URL}/starships/${id}`);
        if (!response.ok) throw new Error("Error fetching Starships");
        const data = await response.json();
        return data.result;
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