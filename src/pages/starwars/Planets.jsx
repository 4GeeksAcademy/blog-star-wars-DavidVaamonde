import React from 'react'
import { Link } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';

export const Planets = () => {

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
    //Definimos función que muestre un planeta específico
    const getPlanetById = async (id) => {
        // https://www.swapi.tech/api/planets/4
        const response = await fetch(`${BASE_URL}/planets/${id}`);
        if (!response.ok) throw new Error("Error fetching Planets");
        const data = await response.json();
        return data.result;
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