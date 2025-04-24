import React from 'react'
import { Link } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import "https://kit.fontawesome.com/072e5df971.js"

export const Vehicles = () => {

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
    //Definimos función que muestre una nave estelar específico
    const getVehicleById = async (id) => {
        // https://www.swapi.tech/api/vehicles/4
        const response = await fetch(`${BASE_URL}/vehicles/${id}`);
        if (!response.ok) throw new Error("Error fetching Vehicles");
        const data = await response.json();
        return data.result;
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