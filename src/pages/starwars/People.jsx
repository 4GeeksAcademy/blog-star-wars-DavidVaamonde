import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "https://kit.fontawesome.com/072e5df971.js";

export const People = () => {
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
   * Toggles the favorite status of a person.
   * If the person is already a favorite, they will be removed from the favorites list.
   * If the person is not a favorite, they will be added to the favorites list.
   *
   * @param {Object} person - The person object containing at least a `name` and `uid`.
   */
  const handleFavorite = (person) => {
    if (isFavourite(person.uid)) {
      dispatch({ type: "remove_favourite", payload: person.uid });
    } else {
        const newFavourite = {
            name: person.name,
            type: "people",
            uid: person.uid
        }
      dispatch({ type: "add_favourite", payload: newFavourite });
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
  };

  const { data: people, loading: loadingPeople } = useFetch(getPeople, null);

  return (
    <>
      <h1>Personajes</h1>

      <div className="row">
        {loadingPeople ? (
          <p>Cargando personajes ....</p>
        ) : (
          people?.map((person, index) => (
            <div className="col col-3 mb-4 mx-3" key={index}>
              <div className="card">
                <img
                  src="https://placehold.co/400x200"
                  className="card-img-top"
                  alt={person.name}
                />
                <div className="card-body">
                  <h5 className="card-text">{person.name}</h5>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  <Link to={`/people/${person.uid}`} className="btn btn-primary mb-2">
                    Learn More
                  </Link>
                  <button
                    className={`favorite-btn ${isFavourite ? "active" : ""}`}
                    onClick={() => {handleFavorite(person)}}
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
        <button className="btn btn-primary">Volver</button>
      </Link>
    </>
  );
};
