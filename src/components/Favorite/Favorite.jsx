import React from "react";
import './Favorite.css'
// props всегда объект
export default function Favorite (props) {

    
    console.log(props)
    const {imdbID, Title, Year} = props;
    return (
        <div className="favorite-item">
            <li className="favorite" key={imdbID}>{Title} ({Year})</li>
        </div>
    )
}