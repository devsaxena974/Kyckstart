import {React, useState} from 'react'
import SearchBar from './SearchBar'
import FilterCategory from './FilterCategory'

const Browse = () => {

    const [showSearch, setShowSearch] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    return (
        <div>
            <div className="d-flex justify-content-center w-100 h-100">
                <div className="mr-4">
                    {(showSearch === false) ? <button className="btn btn-primary text-center" onClick={e => setShowSearch(true)}>Search for a Business</button>:null}
                </div>
                <div>
                    {(showSearch) ? <SearchBar /> : null}
                </div>
                <div>
                    {(showSearch) ? null : <FilterCategory />}
                </div>
            </div>
        </div>
    )
}

export default Browse
