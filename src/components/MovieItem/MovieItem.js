import React, { Component } from 'react';
import './MovieItem.css';

class MovieItem extends Component {
    state = {
        isFavorite: false,
    }

    click = () => {
        const {onAdd, onRemove, ...rest } = this.props
        this.state.isFavorite ? onRemove(this.props.imdbID) : onAdd(rest);// rest - объект (title, year, poster)
        this.setState({isFavorite: !this.state.isFavorite})
    }

    render() {
        const { Title: title, Year: year, Poster: poster} = this.props;
        const {isFavorite} = this.state;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={poster} alt={title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
                    <button 
                        type="button" 
                        className={`movie-item__add-button${isFavorite ? ' movie-item__add-button_remove': ''}`}
                        onClick={this.click}
                    >{isFavorite ? 'Убрать из списка' : 'Добавить  в список'}
                    </button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;