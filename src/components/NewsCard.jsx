import GlobalContext from "../../context/GlobalContext"
import { useContext } from "react"
import { formatDateAndTime } from "./utils/dateFormatsUtils"


const NewsCard = ({ article }) => {

    //skapa lite dummy hårdkodat
    const { allSrNews, getAllSrNewsArticles, activeArticleId, setActiveArticleId } = useContext(GlobalContext)






    return (


        <div className="card m-1 p-1 border-0" onClick={() => { setActiveArticleId(article.id), console.log(activeArticleId) }} style={{ cursor: 'pointer', }}>



            <div className="row g-0 gap-1" >

                <div className="card border-0 rounded-1  col-2 col-md-3 col-lg-2" style={{
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>



                <div className="col-1 card-body p-2 lh-sm">

                    <small>
                        <span className='badge text-body-secondary bg-body-secondary'>
                            {article.subSource}
                        </span>
                        <span className='badge text-body-secondary bg-body-tertiary'>
                            {article.mainSource}
                        </span>

                    </small>

                    <h2 className="h5 m-0">{article.title}</h2>
                    <p className="mb-1">


                        <small><small>{formatDateAndTime(article.published)}
                            {/* eftersom redaktioner ibland skriver sina texter innan de publiceras så görs jämföreleen på detta vis " < " och endast visar uppdaterat om den är uppdaterad efter att den är publicerad. */}
                            {article.published < article.updated && (
                                <><i>, Upd.: <mark>{formatDateAndTime(article.updated)}</mark></i></>
                            )}
                        </small></small>




                    </p>
                    <p className="m-0 lh-1" style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                    }}>
                        <small>{article.summary}</small>
                    </p>
                </div>

            </div>





        </div >
    )
}

export default NewsCard