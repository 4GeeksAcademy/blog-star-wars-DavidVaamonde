import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export const StarshipDetail = () => {

    //Conectamos la API con los planetas
    const BASE_URL = "https://www.swapi.tech/api";

    //Definimos función que muestre una nave estelar específico
    const getStarshipById = async (id) => {
        // https://www.swapi.tech/api/starships/4
        const response = await fetch(`${BASE_URL}/starships/${id}`);
        if (!response.ok) throw new Error("Error fetching Starships");
        const data = await response.json();
        return data.result;
    }

    const { id } = useParams();
    const { data: starship, loading, error } = useFetch(getStarshipById, id);
    
    if (loading) return <p>Loading ....</p>;
    if (error) return <p>Error loading starship.</p>;

    const {
        name,
        model,
        starship_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        hyperdrive_rating,
        MGLT,
        cargo_capacity,
    } = starship.properties;

    return (
        <>
            <div className="container">
                <div className="row">
            
                    <div className="col-md-6 text-center">
                        <img
                            src="https://placehold.co/400x200"
                            alt={name}
                            className="img-fluid"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
    
    
                    <div className="col-md-6">
                        <h1>{name}</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                            suscipit velit animi natus nesciunt adipisci tempora similique
                            perspiciatis maiores!
                        </p>
                    </div>
                </div>

                <hr className="my-4" />
            
            
                <div className="row text-center fw-bold">
                    <div className="col-md-3 mb-3">Nombre: <br /><span className="text-dark fw-normal">{name}</span></div>
                    <div className="col-md-3 mb-3">Modelo: <br /><span className="text-dark fw-normal">{model}</span></div>
                    <div className="col-md-3 mb-3">Clase de nave estelar: <br /><span className="text-dark fw-normal">{starship_class}</span></div>
                    <div className="col-md-3 mb-3">Manufacturación: <br /><span className="text-dark fw-normal">{manufacturer}</span></div>
                    <div className="col-md-3 mb-3">Precio en créditos: <br /><span className="text-dark fw-normal">{cost_in_credits}</span></div>
                    <div className="col-md-3 mb-3">Longitud: <br /><span className="text-dark fw-normal">{length}</span></div>
                    <div className="col-md-3 mb-3">Tripulantes: <br /><span className="text-dark fw-normal">{crew}</span></div>
                    <div className="col-md-3 mb-3">Pasajeros: <br /><span className="text-dark fw-normal">{passengers}</span></div>
                    <div className="col-md-3 mb-3">Máxima velocidad atmorférica: <br /><span className="text-dark fw-normal">{max_atmosphering_speed}</span></div>
                    <div className="col-md-3 mb-3">Calificación de hiperpropulsión: <br /><span className="text-dark fw-normal">{hyperdrive_rating}</span></div>
                    <div className="col-md-3 mb-3">Máximo número de Megaluces: <br /><span className="text-dark fw-normal">{MGLT}</span></div>
                    <div className="col-md-3 mb-3">Capacidad de carga: <br /><span className="text-dark fw-normal">{cargo_capacity}</span></div>
                </div>

                <div className="d-flex justify-content-center">
                    <Link to="/starships">
                        <button className="btn btn-primary m-3">
                             Volver
                        </button>
                    </Link>
                </div>

            </div>
        </>
    )
}