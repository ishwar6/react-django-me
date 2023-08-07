import React from 'react'

function Error404() {
    return (
        <div id="ftco-loader" className="show fullscreen" style={{ flexDirection: "column" }}>
            <div class="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" />
            <h1 style={{ color: "black" }} class="title">Oops something went wrong!!</h1>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" class="spaceship" />
        </div>
    )
}

export default Error404