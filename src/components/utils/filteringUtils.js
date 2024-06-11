

// här förväntas en array med artiklar samt namnet på den key som jämförelse av tid ska ske mot.
export function sortArticlesByCustomTimespans(articles, keyToCompare) {
    const labels = [
        { label: 'senaste timmen', hours: 1 },
        { label: 'senaste 3 timmarna', hours: 3 },
        { label: 'senaste 6 timmarna', hours: 6 },
        { label: 'senaste 12 timmarna', hours: 12 },
        { label: 'senaste 24 timmarna (1 dygn)', hours: 24 },
        { label: 'senaste 48 timmarna (2 dygn)', hours: 48 },
        { label: 'senaste 72 timmarna (3 dygn)', hours: 72 },
        { label: 'senaste veckan (7 dygn)', hours: 7 * 24 },
        { label: 'senaste halvåret', hours: 6 * 30 * 24 },
        { label: 'senaste året', hours: 365 * 24 },
        { label: 'över 1 år sedan', hours: Infinity }
    ];

    const currentTime = new Date();

    // Initiera resultatarrayen med tomma artikellistor
    const sortedArticles = labels.map((l) => ({
        label: l.label,
        articles: []
    }));


    articles.forEach(article => {
        const updatedTime = new Date(article[keyToCompare]);

        // Beräkna antalet timmar sedan artikeln publicerades.
        // Dela resultatet (i millisekunder) med antalet millisekunder i en timme för att få timmar
        const hoursSincePublished = (currentTime - updatedTime) / (60 * 60 * 1000);

        // Iterera igenom varje tidsintervall i 'labels' arrayen
        for (let i = 0; i < labels.length; i++) {
            // Kontrollera om antalet timmar är mindre än eller lika med det aktuella intervallets timmar
            if (hoursSincePublished <= labels[i].hours) {
                // Om ja, lägg till artikeln i rätt kategori i 'sortedArticles' arrayen under motsvarande tidsintervall
                sortedArticles[i].articles.push(article);
                // Avbryt loopen eftersom rätt intervall redan har hittats
                break;
            }
        }
    });
    // console.log(sortedArticles[0])
    return sortedArticles;
}

/* 
// Exempel på användning:
const articles = [
    {
        content: "<p><img style=\"max-width: 100%;\"src=\"https://static-cdn.sr.se/images/94/957477fc-fc3f-4370-b97b-56e800726511.jpg?preset=api-default-rectangle\" /></p><p><strong>Lyssna:</strong> <a href=\"https://api.sr.se/api/radio/radio.aspx?type=db&id=9359315&codingformat=.m4a&metafile=m3u\" target=\"_blank\" rel=\"noopener noreferrer\">Häst dog på Visbytravet</a></p><ul><li><p>Hästen Keep the Pace segnade ned och dog efter ett knappt varv på banan under måndagkvällens första lopp på Visbytravet, vilket Helagotland var först med att berätta. </p></li><li><p>Kusken Zeb Jonasson lyckades köra hästen in mot sidan när han kände att något var fel och lyckades på så sätt förhindra vad som kunnat bli en olycka med fler inblandade. </p></li></ul><!-- Byline --><p class=\"byline\">Stina Kätting<br><a class=\"internal-link\" href=\"mailto:stina.katting@sverigesradio.se\" target=\"_self\">stina.katting@sverigesradio.se</a></p>",
        coverage: "lokal",
        id: "rss:sr.se/article/8684307",
        image: "https://static-cdn.sr.se/images/94/957477fc-fc3f-4370-b97b-56e800726511.jpg?preset=api-default-rectangle",
        link: "https://sverigesradio.se/artikel/8684307",
        mainSource: "Sveriges Radio",
        media: "<iframe title=\"Inbäddat innehåll från Sveriges Radio\" width=\"100%\" src=\"https://sverigesradio.se/embed/publication/8684307\"></iframe>",
        published: "2024-06-10T23:10:00+02:00",
        subSource: "P4 Gotland",
        summary: "Hästen Keep the Pace segnade ned och dog efter ett knappt varv på banan under måndagkvällens första lopp på Visbytravet, vilket Helagotland var först med att berätta. Kusken Zeb Jonasson lyckades köra hästen in mot sidan när han kände att något var fel och lyckades på så sätt förhindra vad som kunnat bli en olycka med fler inblandade.",
        title: "Dramatik på Visbytravet - häst dog under lopp",
        updated: "2024-06-10T23:10:00+02:00"
    }
    // Fler artiklar kan läggas till här
];

console.log(sortArticlesByCustomTimespans(articles, 'updated'));
*/
