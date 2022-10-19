import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    

    // movie.imdbID передаем через key, хоть он и содержится во всем объекте props
    render() { 
        const {movies, onAdd, onRemove} = this.props
        return ( 
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}> 
                        <MovieItem onAdd={onAdd} onRemove={onRemove} {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;