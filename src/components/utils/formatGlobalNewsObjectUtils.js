// funktion som returnerar ett objekt enligt den mall som behövs.
export function formatGlobalNewsObject(title, id, mainSource, subSource, coverage, image, media, summary, content, published, updated, link) {
    const formattedObject = {
        title: title || "",
        id: id || "",
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