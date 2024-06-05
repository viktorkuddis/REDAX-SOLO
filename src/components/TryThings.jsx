import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';


import NewsCard from './NewsCard';
import MainNewsDisplay from './MainNewsDisplay';




const TryThings = () => {

    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)

    // detta objektet kan vi leka med för att se hur de serut på sidan:
    // allSrNews[2].subSource = ""
    // console.log(allSrNews[0].content)



    // kallar på funktoin som hämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    return (<>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                    <div className='card' style={{ maxHeight: "90vh", overflow: "auto" }}>
                        <h2>Senaste Nytt:</h2>
                        {allSrNews.map((article) => (
                            <NewsCard key={article.id + article.link} article={article} />
                        ))}
                    </div>
                </div>
                <div className='col-6'>
                    {/* <MainNewsDisplay articleToDisplay={allSrNews[0]} /> */}
                </div>
            </div>
        </div>


    </>
    );
}

export default TryThings