
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
}

// FINNS EGEN LISTA MED CHANNEL INFO
// FINNS EGEN LISTA MED CHANNEL INFO
// FINNS EGEN LISTA MED CHANNEL INFO
// FINNS EGEN LISTA MED CHANNEL INFO
// FINNS EGEN LISTA MED CHANNEL INFO



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


