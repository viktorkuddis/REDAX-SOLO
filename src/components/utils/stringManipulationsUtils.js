
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
    return htmlStr.replace(/<[^>]*>/g, ' ');
}

// HITTA BILDER OCH SÄTT MAXSTORLEK TILL 100%
export function addMaxWidthToImages(htmlString) {
    // Använder regex för att hitta alla <img>-taggar och deras attribut
    return htmlString.replace(
        /<img\s+([^>]*?)(style\s*=\s*(['"])(.*?)\3|)([^>]*)>/gi,
        (match, beforeStyle, styleAttr, quote, styleContent, afterStyle) => {
            // Om style-attributet finns, lägg till max-width: 100%; annars sätt det som enda stil
            const newStyle = styleContent ? `${styleContent}; max-width: 100%;` : 'max-width: 100%;';
            // Bygg om <img>-taggen med den nya eller uppdaterade style-attributet
            return `<img ${beforeStyle}style="${newStyle}"${afterStyle}>`;
        }
    );
}

// SÄTT ALLA A-TAGGAR TILL ATT ÖNNA I NY FLIK ELLER FÖNSTER
export function addTargetBlankToLinks(htmlString) {
    // Regex för att hitta och modifiera <a>-taggar
    return htmlString.replace(/<a\s+(?![^>]*\b(?:target|rel)="[^"]*")(.*?)>/gi, (match, attributes) => {
        // Lägg till target="_blank" och rel="noopener noreferrer"
        const updatedAttributes = `${attributes.trim()} target="_blank" rel="noopener noreferrer"`;
        // Bygg om <a>-taggen med de nya attributen
        return `<a ${updatedAttributes}>`;
    });
}