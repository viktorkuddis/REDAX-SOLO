import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

import FilterPanel from '../components/FilterPanel'
import FilterModal from '../components/FilterModal';
import GroupedFeed from '../components/GroupedFeed'
import MainNewsDisplay from '../components/MainNewsDisplay'
import CardSizeBtn from '../components/CardSizeBtn'



import { getCombinedNewsFeed } from '../components/utils/getCombinedNewsFeed'
import { sortArticlesByCustomTimespans } from '../components/utils/filteringUtils';





const NewsFeedPage = () => {

    //masterNewsFeed, setMasterNewsFeed
    //querys är den iltrering som användaren gjort som liggeri globala kontexten.
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


    //variabeln som finally kommer innehålla de artiklar som ska visas på sidan. samt i kronologisk ordning.
    const [filteredFeedBySource, setFilteredFeedBySource] = useState(null)

    // här sorteras array så att de bara innehåller det som motsvarar de efterfrågade enligt querys. 
    //Querys är de som användarenfiltrerat fram och ligger i den globala kontexten
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
    //denna variabeln fungerar att skicka som prop till groupedFeed. men den tar inte hänsyn till filtret om källa och kommer bara visa allt.
    const groupedNewsByTimes = sortArticlesByCustomTimespans(masterNewsFeed, "published")
    // console.log(groupedNewsByTimes)





    return (<>
        <div className='container-fluid' style={{ height: "100%" }} >
            {/* <FilterPanel /> */}


            <div className='row pb-3' style={{ height: "100%" }}>

                <div className='col-6' style={{ height: "100%" }}>


                    <div className='card border bg-body-tertiary' style={{
                        height: "100%", overflowY: "auto", overflowX: "hidden"
                    }}>
                        <div className='d-flex d-flex align-items-center gap-2 p-1'>
                            <FilterModal />
                            <small> <i>
                                {/* kollar om filtret är aktivt eller ej: 
                                finns de querys skrivs meddelande om aktivt ut*/}
                                { //lopar genom varje key
                                    Object.keys(querys).some(key =>
                                        //returnerar true om NÅGON array är längre än noll
                                        Array.isArray(querys[key]) && querys[key].length > 0
                                    )
                                    //om true:
                                    && "(Aktivt)"
                                }
                            </i></small>
                            <div className='ms-auto'>
                                <CardSizeBtn />
                            </div>


                        </div>

                        <div className='card border-0 m-1' style={{
                            height: "100%", overflowY: "auto", overflowX: "hidden"
                        }}>
                            {/* VI FILTRERAR NYHETER BY KÄLLLA. DET ÄR SÅ FILTRET KICKAR IN. */}
                            <GroupedFeed groupedNewsArray={filteredFeedBySource} />
                        </div>


                    </div>
                </div>
                <div className='col-6' style={{ height: "100%" }}>
                    <MainNewsDisplay />
                </div>
            </div>
        </div >

    </>




    )
}

export default NewsFeedPage