import GlobalContext from "../../context/GlobalContext"
import { useContext } from "react"


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

                    <small><small>{article.mainSource} {article.subSource}</small></small>
                    <h2 className="h5 m-0">{article.title}</h2>
                    <p className="mb-1"><small> <small>{article.published} {article.updated}</small></small></p>
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