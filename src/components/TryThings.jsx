import React, { useState, useEffect } from 'react'

import srChannelInfo from './utils/srChannelsInfo';
import { getAllSrChannels, getSrNewsFeedByChannelId, getAllSrNewsArticles } from './utils/getFromSR';









const TryThings = () => {







    const [data, setData] = useState([]);


    useEffect(() => {


        function getAllSrNewsArticles() {
            let allNewsFomSR = [];

            srChannelInfo.forEach(channel => {

                // console.log(channel.channelId)
                console.log(channel.channelId, channel.channelName)

                getSrNewsFeedByChannelId(channel.channelId, channel.channelName).
                    then((svar) => {

                        // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
                        if (svar.length > 0) {
                            // console.log(svar)
                            svar.forEach((newsitem) => {
                                const mergesNewsIem = { ...newsitem, ...channel }
                                // console.log(mergesNewsIem)

                                allNewsFomSR.push(mergesNewsIem)
                            })

                        }

                        // console.log(allNewsFomSR)

                    })
                    .then((__) => { setData(allNewsFomSR) }).catch((err) => { })
            })
            // .then(() => {
            //     // Returnera arrayen allNewsFomSR
            //     return allNewsFomSR;
            // }).catch((err) => { console.log(err) })


        }

        getAllSrNewsArticles()

    }, [])


    return (
        <div>
            {data.length > 0 ? (
                <ul>
                    {data.map((item) => (
                        <>
                            <li key={item.id}>{item.title}</li>

                        </>

                    ))}
                </ul>

            ) : (
                <p>Laddar...</p>
            )}
        </div>
    );









    //     const [artiklar, setArtiklar] = useState([])


    //     useEffect(() => {

    //         getAllSrNewsArticles()
    //             .then((svar) => {
    //                 console.log("detta är arraien:", svar)
    //                 setArtiklar(svar)

    //             })


    //     }, [])

    //     useEffect(() => {

    //         console.log(artiklar, "den i useeffekten")


    //     }, [artiklar])



    //     return (
    //         <div>
    //             {artiklar && "ye"}
    //             <br />
    //             {artiklar.length > 0 && artiklar.summary}
    //             {/* {artiklar[0].id} */}

    //         </div>
    //     )
    //
}

export default TryThings