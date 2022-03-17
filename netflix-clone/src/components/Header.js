import React from "react";
import './Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black' : '' }>
            <div className="header--logo">
        <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"></img>
        </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg" alt="Usuário"></img>
                </a>
            </div>
        </header>
    );
}