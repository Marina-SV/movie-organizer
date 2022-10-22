import React, { Component } from 'react';
import './ListPage.css';


const key = '5bbe6c33'

class ListPage extends Component {

    state = {
        title: '',
        movies: [],
    }

    getList = async (id) => {
        const res  = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        const json = await res.json()
        return json
    }

    getMovie = async (imdbID) => {
        const res  = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apiKey=${key}`)
        const json = await res.json()
        return json
    }

    init = async () =>  {
        const list = await this.getList(this.props.match.params.id);
        const movies = list.movies.map(async (id) => await this.getMovie(id));

        this.setState({
            title: list.title, 
            movies: await Promise.all(movies)
        })

    }
   
    componentDidMount() {
        this.init()
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        const {movies, title} = this.state
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul>
                    {movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}`} rel="noopener noreferrer" target="_blank"> {item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;