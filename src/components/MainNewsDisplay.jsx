import React from 'react'
import { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import { formatDateAndTime } from './utils/dateFormatsUtils'

const MainNewsDisplay = () => {

    const {
        allSrNews,
        activeArticleId, setActiveArticleId
    } = useContext(GlobalContext)

    const articleToDisplay = allSrNews.find((article) => article.id === activeArticleId)
    console.log("activeArticleId:", activeArticleId)
    console.log("artikel att visa, articleToDisplay:", articleToDisplay)


    return (<>

        {articleToDisplay
            ?
            <div className='card p-2' style={{ maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>

                <div className='row'>
                    <div className="col">
                        <p className='mb-2'>

                            <span className='badge text-body-secondary bg-body-secondary'>
                                {articleToDisplay.subSource}
                            </span>

                            <span className='badge text-body-secondary bg-body-tertiary'>
                                {articleToDisplay.mainSource}
                            </span>

                            <a className="icon-link icon-link-hover px-2" target="_blank" href={articleToDisplay.link}>
                                <i className="bi bi-box-arrow-up-right"></i>
                            </a>

                        </p>
                    </div>


                    <div className='col-auto'>

                        <button type="button" className="btn btn-sm btn-outline-secondary border-0"
                            onClick={() => {
                                console.log("hlickad kryss", activeArticleId)
                                setActiveArticleId(null)
                            }}
                        ><i className="bi bi-x-lg"></i></button>

                    </div>

                </div>





                <h2 className="mb-0 display-6" style={{ fontSize: '170%' }}>{articleToDisplay.title}</h2>





                <small><small>{formatDateAndTime(articleToDisplay.published)}
                    {/* eftersom redaktioner ibland skriver sina texter innan de publiceras så görs jämföreleen på detta vis " < " och endast visar uppdaterat om den är uppdaterad efter att den är publicerad. */}
                    {articleToDisplay.published < articleToDisplay.updated && (
                        <><i>, Upd.: <mark>{formatDateAndTime(articleToDisplay.updated)}</mark></i></>
                    )}
                </small></small>



                <hr />
                <div dangerouslySetInnerHTML={{ __html: articleToDisplay.content }} />

                <div dangerouslySetInnerHTML={{ __html: articleToDisplay.media }} />
            </div >

            :
            // ingen artikel att displaya:
            <div className='card p-2' style={{ maxHeight: "80vh", overflow: "auto" }}>
                <p className='opacity-50 text-center mt-5 mb-5'>Välj en nyhetsartikel att visa</p>
            </div>

        }
    </>
    )
}

export default MainNewsDisplay