import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
//just for console:
import { getSrNews } from './utils/getSrNews';
import { getCombinedNewsFeed } from './utils/getCombinedNewsFeed';

import GroupedFeed from './GroupedFeed';

import NewsCard from './NewsCard';
import MainNewsDisplay from './MainNewsDisplay';
import FilterPanel from './FilterPanel';

import { sortArticlesByCustomTimespans } from './utils/filteringUtils';

const combinedNewsFeed = await getCombinedNewsFeed()
console.log("variabeln combinedNewsFeed: ", combinedNewsFeed)

const groupedNewsByTimesTEST = sortArticlesByCustomTimespans(combinedNewsFeed, "published")



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
        <div className='container-fluid'>
            <br />
            <FilterPanel />
            <br />
            <div className='row'>
                <div className='col-6'>

                    <div className='card' style={{ maxHeight: "90svh", overflowY: "auto", overflowX: "hidden" }}>
                        <h2>Senaste Nytt:</h2>
                        <GroupedFeed groupedNewsArray={groupedNewsByTimesTEST} />

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