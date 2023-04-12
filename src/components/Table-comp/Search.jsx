import { useState } from "react"

export default function Search(){

    const[searchElem, setSearchElem] = useState('')


    return(
        <div className="search">
            <input 
                className='search-inp' 
                name="search" 
                placeholder="Поиск" 
                value={searchElem}
                onChange={(e) => setSearchElem(e.target.value)}
            />
        </div>
    )
    
}