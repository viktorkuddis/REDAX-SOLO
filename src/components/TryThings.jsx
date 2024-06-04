import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';


import NewsCard from './NewsCard';




const TryThings = () => {

    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)

    // detta objektet kan vi leka med för att se hur de serut på sidan:
    allSrNews[2].subSource = ""
    console.log(allSrNews[2])



    // kallar på funktoin som kämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    return (<>
        <h2>Senaste Nytt:</h2>
        {allSrNews.map((article) => (
            <NewsCard key={article.id + article.link} article={article} />
        ))}
    </>
    );
}

export default TryThings