import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
//just for console:
import { getCombinedNewsFeed } from './utils/getCombinedNewsFeed';

import GroupedFeed from './GroupedFeed';
import MainNewsDisplay from './MainNewsDisplay';
import FilterPanel from './FilterPanel';

import { sortArticlesByCustomTimespans } from './utils/filteringUtils';





const TryThings = () => {


    //Vi hämtar HELA feedet, sorterar det efter timespanns,  och assignar det till en variabel:
    const [groupedNewsByTimeSpans, setGroupedNewsByTimeSpans] = useState(null);
    useEffect(() => {
        (async () => {
            console.log("detta är min anonyma funktion")

            const combinedNewsFeed = await getCombinedNewsFeed()
            console.log("variabeln combinedNewsFeed: ", combinedNewsFeed)

            const sortedArticles = sortArticlesByCustomTimespans(combinedNewsFeed, "published")
            setGroupedNewsByTimeSpans(sortedArticles)
        })()
    }, [])




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
        <div className='container-fluid'>
            <br />
            <FilterPanel />
            <br />
            <div className='row'>
                <div className='col-6'>

                    <div className='card' style={{ maxHeight: "90svh", overflowY: "auto", overflowX: "hidden" }}>
                        <h2>Senaste Nytt:</h2>
                        <GroupedFeed groupedNewsArray={groupedNewsByTimeSpans} />

                    </div>
                </div>
                <div className='col-6'>
                    <MainNewsDisplay />
                </div>
            </div>
        </div >


    </>
    );
}

export default TryThings