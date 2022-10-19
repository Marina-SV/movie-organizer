import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        
        const {onSearch} = this.props; // пропс- это ссылка на функцию search
        onSearch(this.state.searchLine) // здесь функция вызывается с аргументом this.state.searchLine
    }
    render() {
        const { searchLine } = this.state;
     
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            name='query'
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit" // по умолчанию все кнопки submit. type=button если не нужно submit
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;