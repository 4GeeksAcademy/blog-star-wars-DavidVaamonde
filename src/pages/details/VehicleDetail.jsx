import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export const VehicleDetail = () => {

    //Conectamos la API con los planetas
    const BASE_URL = "https://www.swapi.tech/api";

    //Definimos función que muestre una nave estelar específico
    const getVehicleById = async (id) => {
        // https://www.swapi.tech/api/vehicles/4
        const response = await fetch(`${BASE_URL}/vehicles/${id}`);
        if (!response.ok) throw new Error("Error fetching Vehicles");
        const data = await response.json();
        return data.result;
    }

    const { id } = useParams();
    const { data: vehicle, loading, error } = useFetch(getVehicleById, id);
        
    if (loading) return <p>Loading ....</p>;
    if (error) return <p>Error loading vehicle.</p>;

    const {
        name,
        model,
        vehicle_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        consumables,
        cargo_capacity,
    } = vehicle.properties;

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
                    <div className="col-md-3 mb-3">Clase de vehículo: <br /><span className="text-dark fw-normal">{vehicle_class}</span></div>
                    <div className="col-md-3 mb-3">Manufacturación: <br /><span className="text-dark fw-normal">{manufacturer}</span></div>
                    <div className="col-md-3 mb-3">Precio en créditos: <br /><span className="text-dark fw-normal">{cost_in_credits}</span></div>
                    <div className="col-md-3 mb-3">Longitud: <br /><span className="text-dark fw-normal">{length}</span></div>
                    <div className="col-md-3 mb-3">Tripulantes: <br /><span className="text-dark fw-normal">{crew}</span></div>
                    <div className="col-md-3 mb-3">Pasajeros: <br /><span className="text-dark fw-normal">{passengers}</span></div>
                    <div className="col-md-3 mb-3">Máxima velocidad atmorférica: <br /><span className="text-dark fw-normal">{max_atmosphering_speed}</span></div>
                    <div className="col-md-3 mb-3">Consumibles: <br /><span className="text-dark fw-normal">{consumables}</span></div>
                    <div className="col-md-3 mb-3">Capacidad de carga: <br /><span className="text-dark fw-normal">{cargo_capacity}</span></div>
                </div>
                
                <div className="d-flex justify-content-center">
                    <Link to="/vehicles">
                        <button className="btn btn-primary m-3">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}