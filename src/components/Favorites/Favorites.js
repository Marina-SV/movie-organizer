import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Favorite from '../Favorite/Favorite';
import './Favorites.css';


class Favorites extends Component {

    render() {
        const { favorites, title, list, onSave, onChange } = this.props; // 
        // onChange and onClick дефолтный пропс, поэтому запускает функцию из пропсов
        return (
            <div className="favorites">
                <input placeholder="Новый список" className="favorites__name" value={title} onChange={onChange} />
                <ul className="favorites__list">
                    {favorites.map(item => <Favorite {...item} />)}
                </ul>
                {list ?
                    (<Link to={`/list/${list.id}`}>
                        <button type="button" className="favorites__save"> Посмотреть список {list.title}</button>
                    </Link>)
                    : <button onClick={onSave} type="button" className="favorites__save" disabled={!favorites.length || !title}> Сохранить список</button>}
            </div>
        );
    }
}

export default Favorites;