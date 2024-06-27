import { getSrNews } from "./getSrNews";

export async function gatALL() {

    const combinedNewsFeed = []

    // Anropa getSrNews och spara resultatet i en variabel
    const srNewsFeed = await getSrNews();
    console.log("sr: ", srNewsFeed)
    combinedNewsFeed.push(...combinedNewsFeed, ...srNewsFeed)
    console.log("combined: ", combinedNewsFeed)

    const svtNewsFeed = await getSrNews();
    console.log("svt: ", svtNewsFeed)
    combinedNewsFeed.push(...combinedNewsFeed, ...svtNewsFeed)
    console.log("combined: ", combinedNewsFeed)

    console.log(combinedNewsFeed)

}


gatALL()