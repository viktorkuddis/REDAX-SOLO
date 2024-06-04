
// EXTRAHERA BILD UT HTML-STRING
export function hittaForstaBildsokvag(htmlStr) {
    // Regex för att matcha img-taggen och extrahera src-attributet
    const bildsokvagMonster = /<img[^>]+src="([^">]+)"/;
    const match = htmlStr.match(bildsokvagMonster);
    if (match) {
        return match[1];
    }
    return null;
}

// TVÄTTA STRING FRÅN HTMLTAGGAR
export function taBortHtmlTaggar(htmlStr) {
    // Använd en regex för att ersätta alla HTML-taggar med tomt utrymme
    return htmlStr.replace(/<[^>]*>/g, '');
}

