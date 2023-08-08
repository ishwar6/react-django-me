import React from 'react'

function Error404() {
    return (
        <div id="ftco-loader" className="show fullscreen" style={{ flexDirection: "column" }}>
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
            <h1 style={{ color: "black" }} className="title">Oops something went wrong!!</h1>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
        </div>
    )
}

export default Error404