import React from 'react'
import { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'


const MainNewsDisplay = () => {

    const { allSrNews, activeArticleId } = useContext(GlobalContext)

    const articleToDisplay = allSrNews.find((article) => article.id === activeArticleId)
    console.log(articleToDisplay)
    console.log(activeArticleId)

    return (<>

        {articleToDisplay
            ?
            <div className='card p-2' style={{ maxHeight: "80vh", overflow: "auto" }}>
                <p>{articleToDisplay.mainSource}{articleToDisplay.subSource}</p>
                <h2>{articleToDisplay.title}</h2>
                <p>{articleToDisplay.published} {articleToDisplay.updated}</p>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: articleToDisplay.content }} />

                <div dangerouslySetInnerHTML={{ __html: articleToDisplay.media }} />
            </div>
            :
            <div className='card p-2' style={{ maxHeight: "80vh", overflow: "auto" }}>
                <p className='opacity-50 text-center mt-5 mb-5'>Välj en nyhetsartikel att visa</p>
            </div>

        }
    </>
    )
}

export default MainNewsDisplay