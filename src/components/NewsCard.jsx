import GlobalContext from "../../context/GlobalContext"
import { useContext } from "react"


const NewsCard = () => {

    //skapa lite dummy hårdkodat
    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)
    let article = allSrNews[1];

    console.log(article)



    return (


        <div className="card m-2 p-3  shadow">
            <small>{article.author}</small>
            <h2 className="h5 m-0">{article.title}</h2>
            <p className="mb-1"><small> <small>{article.published}</small></small></p>
            <p className="m-0"><small>{article.summary}</small></p>

            <iframe title="Inbäddat innehåll från Sveriges Radio" width="100%" src="https://sverigesradio.se/embed/publication/8388534"></iframe>

        </div>
    )
}

export default NewsCard