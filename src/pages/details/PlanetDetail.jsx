import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export const PlanetDetail = () => {

    //Conectamos la API con los planetas
    const BASE_URL = "https://www.swapi.tech/api";

    //Definimos función que muestre un planeta específico
    const getPlanetById = async (id) => {
        // https://www.swapi.tech/api/planets/4
        const response = await fetch(`${BASE_URL}/planets/${id}`);
        if (!response.ok) throw new Error("Error fetching Planets");
        const data = await response.json();
        return data.result;
    }

    const { id } = useParams();
    const { data: planet, loading, error } = useFetch(getPlanetById, id);

    if (loading) return <p>Loading ....</p>;
    if (error) return <p>Error loading planet.</p>;

    const {
        name,
        diameter,
        rotation_period,
        orbital_period,
        gravity,
        population,
        climate,
        terrain,
        surface_water,
    } = planet.properties;

        
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
                    <div className="col-md-3 mb-3">Diametro: <br /><span className="text-dark fw-normal">{diameter}</span></div>
                    <div className="col-md-3 mb-3">Periodo de rotación: <br /><span className="text-dark fw-normal">{rotation_period}</span></div>
                    <div className="col-md-3 mb-3">Periodo de orbita: <br /><span className="text-dark fw-normal">{orbital_period}</span></div>
                    <div className="col-md-3 mb-3">Gravedad: <br /><span className="text-dark fw-normal">{gravity}</span></div>
                    <div className="col-md-3 mb-3">Populación: <br /><span className="text-dark fw-normal">{population}</span></div>
                    <div className="col-md-3 mb-3">Clima: <br /><span className="text-dark fw-normal">{climate}</span></div>
                    <div className="col-md-3 mb-3">Terreno: <br /><span className="text-dark fw-normal">{terrain}</span></div>
                    <div className="col-md-3 mb-3">Superficie del agua: <br /><span className="text-dark fw-normal">{surface_water}</span></div>
                </div>
            
                <div className="d-flex justify-content-center">
                    <Link to="/planets">
                        <button className="btn btn-primary m-3">
                            Volver
                        </button>
                    </Link>
                </div>
                        
            
            </div>
        </>
    )
}