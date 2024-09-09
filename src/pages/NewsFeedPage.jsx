import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

import FilterPanel from '../components/FilterPanel'
import GroupedFeed from '../components/GroupedFeed'
import MainNewsDisplay from '../components/MainNewsDisplay'

import { getCombinedNewsFeed } from '../components/utils/getCombinedNewsFeed'
import { sortArticlesByCustomTimespans } from '../components/utils/filteringUtils';


const NewsFeedPage = () => {

    //masterNewsFeed, setMasterNewsFeed
    const { masterNewsFeed, setMasterNewsFeed, getAllSrNewsArticles, querys } = useContext(GlobalContext)


    //Vi hämtar HELA feedet från apier, placera dom alla i context, sorterar det efter timespanns, och assignar sorterade i en variabel:
    const [groupedNewsByTimeSpans, setGroupedNewsByTimeSpans] = useState(null);

    useEffect(() => {
        (async () => {
            const combinedNewsFeed = await getCombinedNewsFeed()
            console.log("variabeln combinedNewsFeed: ", combinedNewsFeed)

            setMasterNewsFeed(combinedNewsFeed)

            const sortedArticles = sortArticlesByCustomTimespans(combinedNewsFeed, "published")
            setGroupedNewsByTimeSpans(sortedArticles)
        })()
    }, [])



    const [filteredFeedBySource, setFilteredFeedBySource] = useState(null)
    useEffect(() => {


        let updatedArray = [];
        console.log(updatedArray)

        updatedArray = masterNewsFeed.filter((article) => {
            // Kontrollera hierarki av matchningar
            return (
                // Kontrollera coverage (lägsta nivån i hierarkin)
                (querys.coverages.length === 0 || querys.coverages.includes(article.coverage)) &&
                // Kontrollera sourceType (nästa nivå i hierarkin)
                (querys.sourceTypes.length === 0 || querys.sourceTypes.includes(article.sourceType)) &&
                // Kontrollera mainSource (nästa nivå i hierarkin)
                (querys.mainSources.length === 0 || querys.mainSources.includes(article.mainSource)) &&
                // Kontrollera subSource (högsta nivån i hierarkin)
                (querys.subSources.length === 0 || querys.subSources.includes(article.subSource))
            );
        });
        console.log(updatedArray)

        updatedArray = sortArticlesByCustomTimespans(updatedArray, "published")
        console.log(updatedArray)

        setFilteredFeedBySource(updatedArray)
        // console.log("querys", querys)


        // setFilteredFeedBySource([groupedNewsByTimeSpans[2]])

    }, [querys, masterNewsFeed])


    // detta objektet kan vi leka med för att se hur de serut på sidan:
    // masterNewsFeed[2].subSource = ""
    // console.log(masterNewsFeed[0].content)



    // kallar på funktoin som hämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    // console.log(masterNewsFeed);

    //skapa array baserat på timmar sedan den publicerades:c

    const groupedNewsByTimes = sortArticlesByCustomTimespans(masterNewsFeed, "published")
    // console.log(groupedNewsByTimes)





    return (<>
        <div className='container-fluid' style={{ height: "100%" }} >
            {/* <FilterPanel /> */}
            <div className='row' style={{ height: "100%" }}>
                <div className='col-6' style={{ height: "100%" }}>

                    <div className='card' style={{
                        height: "100%", overflowY: "auto", overflowX: "hidden"
                    }}>
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


    )
}

export default NewsFeedPage