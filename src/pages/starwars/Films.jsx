import React from 'react'
import { Link } from "react-router-dom";

export const Films = () => {

    return (
        <>
            <h1>En mantenimiento</h1>

            <Link to="/">
                <button className='btn btn-primary'>
                    Volver
                </button>
            </Link>
            
        </>
    )
}