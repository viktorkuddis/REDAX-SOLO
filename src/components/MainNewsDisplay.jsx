import React from 'react'

const MainNewsDisplay = ({ articleToDisplay }) => {
    return (<>
        <div className='card p-2' style={{ maxHeight: "80vh", overflow: "auto" }}>
            <p>{articleToDisplay.mainSource}{articleToDisplay.subSource}</p>
            <h2>{articleToDisplay.title}</h2>
            <p>{articleToDisplay.published} {articleToDisplay.updated}</p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: articleToDisplay.content }} />

            <div dangerouslySetInnerHTML={{ __html: articleToDisplay.media }} />
        </div>
    </>
    )
}

export default MainNewsDisplay