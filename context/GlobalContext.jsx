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
    // Variabel som håller koll på den aktuella artikelns id som ska visas
    const [activeArticleId, setActiveArticleId] = useState(null);

    /* ********************************************************* */

    // funktion som returnerar ett objekt enligt den mall som behövs.
    function formatGlobalNewsObject(title, mainSource, subSource, coverage, image, media, summary, content, published, updated, link) {
        const formattedObject = {
            title: title || "",
            mainSource: mainSource || "",
            subSource: subSource || "",
            coverage: coverage || "",
            image: image || "",
            media: media || "",
            summary: summary || "",
            content: content || "",
            published: published || "",
            updated: updated || "",
            link: link || "",
        };
        return formattedObject;


    }

    /* ********************************************************* */

    // Denna hämtar allt från sr-apiet och skickar in de i arrayen för Alla sr-nyheter..
    function getAllSrNewsArticles() {
        let completedArray = [];

        srChannelInfo.forEach(channel => {
            // console.log(channel.channelId, channel.channelName)

            getSrNewsFeedByChannelId(channel.channelId, channel.channelName).
                then((svar) => {
                    // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
                    // console.log(svar)
                    if (svar) {
                        if (svar.length > 0) {
                            // console.log(svar)
                            svar.forEach((newsitem) => {
                                const mergedObjekt = { ...newsitem, ...channel }
                                // console.log(mergesNewsIem)

                                const formatedObject = formatGlobalNewsObject(
                                    mergedObjekt.title,
                                    "Sveriges Radio",
                                    mergedObjekt.channelName,
                                    mergedObjekt.coverage,
                                    mergedObjekt.image,
                                    mergedObjekt.media,
                                    mergedObjekt.summary,
                                    mergedObjekt.content,
                                    mergedObjekt.published,
                                    mergedObjekt.updated,
                                    mergedObjekt.link)



                                completedArray.push(formatedObject)
                            })
                        }
                        // console.log(completedArray)
                    }


                })
                .then((__) => {
                    completedArray.sort((a, b) => {
                        return new Date(b.published) - new Date(a.published);
                    });

                    setAllSrNews(completedArray)
                }).catch((err) => { console.log(err) })
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