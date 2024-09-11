import { getSrNews } from "./getSrNews";
import { getPLACEHOLDERNews } from "./getPLACEHOLDERNews ";

export async function getCombinedNewsFeed() {

    const combinedNewsFeed = []


    // Anropa getSrNews och spara resultatet i en variabel
    const srNewsFeed = await getSrNews();
    // console.log("sr: ", srNewsFeed)
    combinedNewsFeed.push(...srNewsFeed)
    // console.log("combined: ", combinedNewsFeed)


    // const PLACEHOLDERNewsFeed = getPLACEHOLDERNews();
    // console.log("PLACEHOLDERNEWS: ", PLACEHOLDERNewsFeed)
    // combinedNewsFeed.push(...PLACEHOLDERNewsFeed)
    // console.log("combined: ", combinedNewsFeed)


    // Sortera arrayen här eftersom arrayerna från olika källor bara läggs efter varanra.
    // även ifalll nyheterna är sorterade i respektive array så beäver de schufflas ihop i den sammanslagna.
    combinedNewsFeed.sort((a, b) => {
        return new Date(b.published) - new Date(a.published);
    });

    // console.log("combined, sorterad? ", combinedNewsFeed)
    return combinedNewsFeed

}