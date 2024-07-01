import React from 'react'
import { useContext } from 'react'

import GlobalContext from '../../context/GlobalContext'

const FilterButtonBySource = ({ queryKey, queryKeyItem, handleToggleQueryItem }) => {

    const { masterNewsFeed, querys, setQuerys } = useContext(GlobalContext)

    console.log(typeof queryKey)
    return (
        <div className={querys[queryKey].includes(queryKeyItem)
            ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
            : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
            onClick={() => { handleToggleQueryItem(queryKey, queryKeyItem) }
            }>
            {queryKeyItem} från komponent
        </div>

    )


}

export default FilterButtonBySource