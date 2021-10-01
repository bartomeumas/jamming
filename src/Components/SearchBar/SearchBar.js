import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }

        this.search = this.search.bind(this);
        this.handleTermSearch = this.handleTermSearch.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermSearch(e) {
        this.setState({
            term: e.target.value
        })
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermSearch}/>
                <button class="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar