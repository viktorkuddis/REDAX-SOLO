import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';







const TryThings = () => {

    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)

    // kallar på funktoin som kämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    return (
        <div >

            <>
                <h2>Senaste Nytt:</h2>
                <ul>
                    {allSrNews.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </>

        </div>
    );









    //     const [artiklar, setArtiklar] = useState([])


    //     useEffect(() => {

    //         getAllSrNewsArticles()
    //             .then((svar) => {
    //                 console.log("detta är arraien:", svar)
    //                 setArtiklar(svar)

    //             })


    //     }, [])

    //     useEffect(() => {

    //         console.log(artiklar, "den i useeffekten")


    //     }, [artiklar])



    //     return (
    //         <div>
    //             {artiklar && "ye"}
    //             <br />
    //             {artiklar.length > 0 && artiklar.summary}
    //             {/* {artiklar[0].id} */}

    //         </div>
    //     )
    //
}

export default TryThings