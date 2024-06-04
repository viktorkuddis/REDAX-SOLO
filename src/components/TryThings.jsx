import React, { useEffect } from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';


import NewsCard from './NewsCard';




const TryThings = () => {

    const { allSrNews, getAllSrNewsArticles } = useContext(GlobalContext)

    // kallar på funktoin som kämtar data från apiet.
    useEffect(() => { getAllSrNewsArticles() }, [])

    return (<>


        < NewsCard />
        < NewsCard />
        < NewsCard />
        <div >
            <h2>Senaste Nytt:</h2>

        </div>
    </>
    );
}

export default TryThings