import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';


const key = '5bbe6c33'

class MainPage extends Component {

    state = {
        movies: [],
        favorites: [],
        query: '',
        listTitle: "",
        list: null // по типу это объект
    }

    search = (searchLine) => {
        this.setState({ query: searchLine })
    }

    async componentDidUpdate(_, state) { // функция запускается после render, а последний запускается после изменения state 
        if (state.query === this.state.query) return;
        this.setState({
            movies: await this.searchMovies(this.state.query)
        })
    }

    async componentDidMount() {
        this.setState({ movies: await this.searchMovies() })
    }

    searchMovies = async (title = 'superman') => { // по умолчанию superman, но меняется с приходом нового значения

        const res = await fetch(`http://www.omdbapi.com/?s=${title}&apiKey=${key}`)
        const json = await res.json();
        return json.Search
    }

    // const list = {
    //     title: this.listTitle
    //     favorites: []
    // }

    add = (movie) => {
        this.setState({ favorites: [...this.state.favorites, movie] })
    }

    remove = (imdbID) => {
        this.setState({ favorites: this.state.favorites.filter(movie => movie.imdbID !== imdbID) }) // filter перезаписывает массив,
    }


    saveList = async (list) => {
        const res = await fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(list) // 
        });

        return await res.json()
    }


    save = async () => {
        console.log(1)
        this.setState({
            list: await this.saveList({
                    title: this.state.listTitle,
                    movies: this.state.favorites.map(item => item.imdbID) // момент формирования объекта list
            }),
            listTitle: "",
            favorites: []
        })
    }

    changeTitle = (e) => {
        this.setState({
            listTitle: e.target.value
        }) // связывает input в favorites c this.state.listTitle
    }
    render() {
        const { movies, favorites, list, listTitle } = this.state;
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox onSearch={this.search} />
                        </div>
                        <div className="main-page__movies">
                            <Movies movies={movies} onAdd={this.add} onRemove={this.remove} />
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites favorites={favorites} list={list} title={listTitle} onSave={this.save} onChange={this.changeTitle} />
                    </aside>
                </main>
            </div>
        );
    }
}

export default MainPage;