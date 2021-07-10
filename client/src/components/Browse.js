import {React, useState} from 'react'
import SearchBar from './SearchBar'

const Browse = () => {

    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            {(showSearch === false) ? <button className="btn btn-primary text-center" onClick={e => setShowSearch(true)}>Search for a Business</button>:null}
            {(showSearch) ? <SearchBar /> : null}
        </div>
    )
}

export default Browse
