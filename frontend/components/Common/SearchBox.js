import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'


const SearchBox = (props) => {
    const userInputHandler = (e) => {
        e.preventDefault();
        props.onChange(e.target.value)
    };
    return (
        <div className="search-box">
            <a className="search-btn" href="#">
                <FontAwesomeIcon icon={faSearch} />
            </a>
            <input type="text" className="search-txt" placeholder="검색어를 입력하세요" value={props.filterText} onChange={userInputHandler}/>
        </div>
    )
}

export default SearchBox;