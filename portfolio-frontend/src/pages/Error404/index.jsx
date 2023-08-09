import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error404() {
    const navigate = useNavigate();
    return (
        <div id="ftco-loader" className="show fullscreen" style={{ flexDirection: "column" }}>
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
            <h2 style={{ color: "black" }} className="title">Oops something went wrong!!</h2>
            <a onClick={() =>{
                navigate('/')
            }} className="btn btn-primary my-3 py-2 px-4">
                Go to Home
            </a>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
        </div>
    )
}

export default Error404