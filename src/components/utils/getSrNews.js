
import srChannelInfo from "./srChannelsInfo";
import { getSrNewsFeedByChannelId } from "./getFromSR";
import { formatGlobalNewsObject } from "./formatGlobalNewsObjectUtils";

// console.log(srChannelInfo)

export async function getSrNews() {
    let completedArray = [];

    // Skapa en array av promises
    let promises = srChannelInfo.map(async (channel) => {
        try {
            const svar = await getSrNewsFeedByChannelId(channel.channelId, channel.channelName);

            // om svaret är en array med innehåll så skickas varje nyhet in i samlings-arrayen med alla nyheter.:
            // console.log(svar)
            if (svar && svar.length > 0) {
                svar.forEach((newsitem) => {
                    const mergedObjekt = { ...newsitem, ...channel };

                    const formatedObject = formatGlobalNewsObject(
                        mergedObjekt.title,
                        mergedObjekt.id,
                        "Sveriges Radio",
                        mergedObjekt.channelName,
                        mergedObjekt.coverage,
                        mergedObjekt.image,
                        mergedObjekt.media,
                        mergedObjekt.summary,
                        mergedObjekt.content,
                        mergedObjekt.published,
                        mergedObjekt.updated,
                        mergedObjekt.link
                    );

                    completedArray.push(formatedObject);
                });
                // console.log(completedArray)
            }
        } catch (err) {
            console.log(err);
        }

    });
    // console.log(promises)
    // Vänta på att alla promises är klara
    await Promise.all(promises);

    // Sortera arrayen
    completedArray.sort((a, b) => {
        return new Date(b.published) - new Date(a.published);
    });

    // Logga ut den fyllda arrayen
    // console.log(completedArray);
    return completedArray
}

// // Anropa funktionen
// let resultatAvFuntionen = await getSrNews();
// console.log(resultatAvFuntionen)




// ***************************************** //
// ***************************************** //
// ************** OLD STUFF nedan: ********* //
// ***************************************** //
// ***************************************** //

/*
export async function getSrNews() {
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

                            const formatedObject = formatGlobalNewsObject(
                                mergedObjekt.title,
                                mergedObjekt.id,
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

                // console.log(completedArray)
                // setAllSrNews(completedArray)
            }).catch((err) => { console.log(err) })
    })

    console.log(completedArray)
}

*/
