import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

import GroupedFeed from './GroupedFeed';

import NewsCard from './NewsCard';
import MainNewsDisplay from './MainNewsDisplay';

import { sortArticlesByCustomTimespans } from './utils/filteringUtils';




const TryThings = () => {

    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)

    // detta objektet kan vi leka med för att se hur de serut på sidan:
    // allSrNews[2].subSource = ""
    // console.log(allSrNews[0].content)



    // kallar på funktoin som hämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    // console.log(allSrNews);

    //skapa array baserat på timmar sedan den publicerades:

    const groupedNewsByTimes = sortArticlesByCustomTimespans(allSrNews, "published")
    // console.log(groupedNewsByTimes)

    return (<>

        {/* <GroupedFeed groupedNewsArray={groupedNewsByTimes} /> */}

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6'>

                    <div className='card' style={{ maxHeight: "90svh", overflowY: "auto" }}>
                        <h2>Senaste Nytt:</h2>
                        <GroupedFeed groupedNewsArray={groupedNewsByTimes} />

                        {/* {allSrNews.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))} */}

                    </div>
                </div>
                <div className='col-6'>
                    <MainNewsDisplay articleToDisplay={allSrNews[0]} />
                </div>
            </div>
        </div >


    </>
    );
}

export default TryThings