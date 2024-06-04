import axios from 'axios'

//Parser för att läsa xmls:
const parser = new DOMParser()


// här hämtar vi info om varje srkanal som finns
export function getAllSrChannels() {

    /*DETTA ÄR FRÅN DERAS EGNA LISTA */
    /*DETTA ÄR FRÅN DERAS EGNA LISTA*/
    /*DETTA ÄR FRÅN DERAS EGNA LISTA*/
    // const allSrChannels = axios.get(`https://api.sr.se/api/v2/channels?format=json&pagination=false`)
    //     .then(result => {
    //         console.log(result.data)
    //         // console.log(result.data.channels[0])
    //         return result.data.channels;
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })


    /*HÄMTAR DATA FRÅN MIN JSON*/
    const allSrChannels = axios.get(`src/data/srChannelsInfo.json`)
        .then(result => {
            console.log(result)
            return result.data;
        })
        .catch((error) => {
            console.log(error);
        })

    return allSrChannels

}

// denna hämtar nyhetsfeeden baserat på srs kanalID.
export function getSrNewsFeedByChannelId(channelId, kanalnamn) {

    const nyheter = axios.get(`https://api.sr.se/api/rss/program/${channelId}?`)
        .then(result => {

            // console.log(result.data)

            // Parsar datan till xml:
            let XMLDATA = parser.parseFromString(result.data, "application/xml")
            // console.log("Parsad xml: ", XMLDATA)

            // konverterar datan till en nodelist vaserat på översta taggen för varje nyhet:
            XMLDATA = XMLDATA.querySelectorAll("entry")

            // Konvertera NodeListen till en array och mappa upp de olika taggarna som key.
            // Varje nyhetr är nu ett samlat objekt i arrayen
            const items = Array.from(XMLDATA).map((item) => {
                return {
                    id: item.getElementsByTagName("id")[0].textContent,
                    title: item.getElementsByTagName("title")[0].textContent,
                    summary: item.getElementsByTagName("summary")[0].textContent,
                    published: item.getElementsByTagName("published")[0].textContent,
                    updated: item.getElementsByTagName("updated")[0].textContent,
                    author: item.getElementsByTagName("author")[0].textContent,
                    link: item.getElementsByTagName("link")[0].getAttribute("href"),
                    category: item.getElementsByTagName("category")[0].textContent,
                    content: item.getElementsByTagName("content")[0].textContent
                }

            })
            // console.log(nyheter)
            return items
        })
        .catch((error) => {
            // console.log(error);
            console.log(" Det gick inte att hämta data från kanal " + channelId + " " + kanalnamn)


        })
    return nyheter
}


// Detta hämtar och sammanställer en array med alla Sveriges Radios Nyhetsartiklar.

export async function getAllSrNewsArticles() {
    let allNewsFomSR = [];

    //hämtar alla kanaler...
    try {
        const allChannels = await getAllSrChannels();
        // för varje kanal, hämta dess nyhetsfeed...
        allChannels.forEach(channel => {

            // console.log(channel.channelId )
            // console.log(channel.channelId, channel.name)
            getSrNewsFeedByChannelId(channel.channelId, channel.channelName).
                then((svar) => {

                    // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
                    if (svar.length > 0) {
                        // console.log(svar)
                        svar.forEach((newsitem) => {
                            const mergesNewsIem = { ...newsitem, ...channel };
                            // console.log(mergesNewsIem)
                            allNewsFomSR.push(mergesNewsIem);
                        });

                    }

                }).catch((err) => { });
        });
        return allNewsFomSR;
    } catch (err_1) {
        console.log(err_1);
    }


}


// export function getAllSrNewsArticles() {
//     let allNewsFomSR = [];

//     //hämtar alla kanaler...
//     return getAllSrChannels()
//         .then((allChannels) => {

//             // för varje kanal, hämta dess nyhetsfeed...
//             allChannels.forEach(channel => {

//                 // console.log(channel.channelId )
//                 // console.log(channel.channelId, channel.name)

//                 getSrNewsFeedByChannelId(channel.channelId, channel.channelName).
//                     then((svar) => {

//                         // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
//                         if (svar.length > 0) {
//                             // console.log(svar)
//                             svar.forEach((newsitem) => {
//                                 const mergesNewsIem = { ...newsitem, ...channel }
//                                 // console.log(mergesNewsIem)

//                                 allNewsFomSR.push(mergesNewsIem)
//                             })

//                         }

//                         // console.log(allNewsFomSR)

//                     }).catch((err) => { })
//             });

//         }).then(() => {
//             // Returnera arrayen allNewsFomSR
//             return allNewsFomSR;
//         }).catch((err) => { console.log(err) })


// }

