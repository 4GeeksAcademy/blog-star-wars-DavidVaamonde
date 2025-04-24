import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const PeopleDetail = () => {

    //Conectamos la API con los planetas
    const BASE_URL = "https://www.swapi.tech/api";

     //Definimos función que muestre un planeta específico
    const getPeopleById = async (id) => {
    // https://www.swapi.tech/api/people/1
        const response = await fetch(`${BASE_URL}/people/${id}`);
        if (!response.ok) throw new Error("Error fetching People");
        const data = await response.json();
        return data.result;
    }

    const { id } = useParams();
    const { data: character, loading, error } = useFetch(getPeopleById, id);


    if (loading) return <p>Loading ....</p>;
    if (error) return <p>Error loading planet.</p>;

    const {
        name,
        gender,
        height,
        birth_year,
        eye_color,
        hair_color,
        skin_color,
    } = character.properties;

    return (
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
                <div className="col">Nombre: <br /><span className="text-dark fw-normal">{name}</span></div>
                <div className="col">Genero: <br /><span className="text-dark fw-normal">{gender}</span></div>
                <div className="col">Año de nacimiento: <br /><span className="text-dark fw-normal">{birth_year}</span></div>
                <div className="col">Altura: <br /><span className="text-dark fw-normal">{height}</span></div>
                <div className="col">Color de ojos: <br /><span className="text-dark fw-normal">{eye_color}</span></div>
                <div className="col">Color de pelo: <br /><span className="text-dark fw-normal">{hair_color}</span></div>
                <div className="col">Color de piel: <br /><span className="text-dark fw-normal">{skin_color}</span></div>
            </div>
        </div>
    )
}