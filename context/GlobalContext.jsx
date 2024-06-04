import { createContext, useState } from "react";

import { getSrNewsFeedByChannelId } from "../src/components/utils/getFromSR";
import srChannelInfo from "../src/components/utils/srChannelsInfo";
import React from 'react'


//skapar kontext och exporterar som default.
const GlobalContext = createContext()
export default GlobalContext;

//funtion som returnerar en provider av min kontext med prop destructad children:
export function GlobalContextProvider({ children }) {


    // ------------------------
    // Innehåll i context här:

    /* ********************************************************* */
    // hämtar info om darkmode från LS. om de inte finns så sätter darkmode på egen hand. 
    // fallback behöver vara false för annars kommer de sättas till true när man återbesöker sidan och får false från local storage.
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("isDarkMode")) || false)
    /* ********************************************************* */

    const [allSrNews, setAllSrNews] = useState([
        {
            id: "DummyID1",
            title: "Den stor placeholderdagen lockar generella meningar till Lorem Ipsum."
        },
        {
            id: "DummyID2",
            title: "JUBEL!- placeholders har aldrig varit mer inne än nu!"
        },
        {
            id: "DummyID3",
            title: "10 anledningar till att Lorem är det nya Ipsum: Vi har hela listan !"
        }]);

    /* ********************************************************* */
    function getAllSrNewsArticles() {
        let completedArray = [];

        srChannelInfo.forEach(channel => {
            // console.log(channel.channelId, channel.channelName)

            getSrNewsFeedByChannelId(channel.channelId, channel.channelName).
                then((svar) => {
                    // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
                    if (svar.length > 0) {
                        // console.log(svar)
                        svar.forEach((newsitem) => {
                            const mergesNewsIem = { ...newsitem, ...channel }
                            // console.log(mergesNewsIem)
                            completedArray.push(mergesNewsIem)
                        })
                    }
                    // console.log(completedArray)

                })
                .then((__) => { setAllSrNews(completedArray) }).catch((err) => { })
        })
    }
    /* ********************************************************* */

    // ------------------------
    // ------------------------
    // ------------------------

    //returnerar provider av min kontext som  omsluter children.
    //Värden skickas med i kontexten här.
    return (
        //provider av min kontext
        <GlobalContext.Provider value={{
            isDarkMode, setIsDarkMode,
            allSrNews, setAllSrNews,
            getAllSrNewsArticles
        }}>

            {children}

        </GlobalContext.Provider>
    );
}