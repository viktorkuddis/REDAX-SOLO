import React from 'react'

const FilterButtonBySource = ({ queryKey, queryKeyItem }) => {
    return (<>
        {/* <span>FilterButtonBySource</span> <br />
        {queryKey}<br /> */}


        <div className={queryKey.includes(queryKeyItem)
            ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
            : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
            onClick={() => { handleToggleQueryItem("sourceTypes", queryKeyItem) }}>
            {queryKeyItem} DET FUNKA
        </div>
    </>
    )
}

export default FilterButtonBySource