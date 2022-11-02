import { BiSearch } from 'react-icons/bi';
import React from 'react'


const SearchBox = (props) => {
    const userInputHandler = (e) => {
        e.preventDefault();
        props.onChange(e.target.value)
    };
    return (
        <div className="search-box mb-2 me-2">      
             <div className="position-relative">
             <input type="text" className="form-control bg-light border-light rounded" placeholder="검색어를 입력하세요" value={props.filterText} onChange={userInputHandler}/>
             <i className='search-icon'><BiSearch /></i>                
            </div>
        </div>
    )
}

export default SearchBox;