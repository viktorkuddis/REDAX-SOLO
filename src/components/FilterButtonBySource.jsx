import React from 'react'
import { useContext } from 'react'

import GlobalContext from '../../context/GlobalContext'

const FilterButtonBySource = ({ queryKey, queryKeyItem, handleToggleQueryItem, markedAsDefault }) => {

    const { querys } = useContext(GlobalContext)

    console.log(typeof queryKey)
    return (
        // om den när proppen markedAsDefault men queryn är tom (dvs inget aktivt val gjorts.)så blir den blå outlined (indirekt markerad som vald)
        <div className={markedAsDefault && !(querys[queryKey].length)
            ? 'btn btn-outline-primary btn-sm rounded-pill me-1 my-1'
            //om den finns i queryn blir den ifylld blå
            : querys[queryKey].includes(queryKeyItem)
                ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
                // pm den inte finns i queryn blir den grå noutlined
                : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'
        }
            onClick={() => { handleToggleQueryItem(queryKey, queryKeyItem) }
            }
        >
            {queryKeyItem} från komponent

            {markedAsDefault && "default markering är true"}
        </div >


    )


}

export default FilterButtonBySource