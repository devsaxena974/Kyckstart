import {React, useState} from 'react'
import SearchBar from './SearchBar'
import FilterCategory from './FilterCategory'

const Browse = () => {

    const [showSearch, setShowSearch] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    return (
        <div>
            <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
                {(showSearch === false) ? <button className="btn btn-primary text-center" onClick={e => setShowSearch(true)}>Search for a Business</button>:null}
                {(showSearch) ? <SearchBar /> : null}
                
                {(showSearch) ? null : <FilterCategory />}
            </div>
        </div>
    )
}

export default Browse
