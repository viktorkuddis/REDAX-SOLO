
export function getPLACEHOLDERNews() {



    const now = new Date();

    const larvigaNyheter = [
        {
            title: "Skvätt! Grannens katt lärde sig jonglera med vattenballonger",
            id: "nyhet001",
            mainSource: "⚠️ HUVUDTIDNINGEN ETT",
            subSource: "Djurnytt",
            sourceType: "Public Service",
            coverage: "Lokalt",
            image: "https://plus.unsplash.com/premium_photo-1707353402114-9881ed692913?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            media: "Bild",
            summary: "En lokal katt har förvånat alla genom att jonglera med vattenballonger.",
            content: "Grannens katt har blivit en sensation efter att ha lärt sig jonglera med vattenballonger. Katten, som heter Missan, har tränat i flera månader och kan nu jonglera med upp till tre vattenballonger samtidigt.",
            published: new Date(now.getTime() - (0 * 60000)),
            updated: new Date(now.getTime() - (0 * 60000)),
            link: "https://www.youtube.com/watch?v=uHgt8giw1LY"
        },
        {
            title: "En snigelrace i parken - vinnaren belönas med ett salladshuvud",
            id: "nyhet002",
            mainSource: "⚠️ HUVUDTIDNINGEN ETT",
            subSource: "Underhållningsbladet",
            sourceType: "Kommersiell Nyhetsmedia",
            coverage: "Lokalt",
            image: "https://images.unsplash.com/photo-1471042621947-ab726b22555c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            media: "Bild",
            summary: "Parken arrangerar ett snigelrace där vinnaren får ett stort salladshuvud.",
            content: "Ett spännande snigelrace ägde rum i stadsparken igår. Sniglar från hela kvarteret deltog och vinnaren, en snigel vid namn Speedy, belönades med ett stort, krispigt salladshuvud.",
            published: new Date(now.getTime() - (0.5 * 60000)),
            updated: new Date(now.getTime() - (0.5 * 60000)),
            link: "https://www.youtube.com/watch?v=uHgt8giw1LY"
        },
        {
            title: "Tårtfest! Pensionärerna bakar världens största smörgåstårta",
            id: "nyhet003",
            mainSource: "⚠️ HUVUDTIDNINGEN DEN ANDRA",
            subSource: "Samhällsposten",
            sourceType: "Viral/Klickvänligt",
            coverage: "Nationellt",
            image: "https://plus.unsplash.com/premium_photo-1681826782468-438a700f374c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            media: "Bild",
            summary: "En grupp pensionärer har bakat världens största smörgåstårta för att fira nationaldagen.",
            content: "För att fira nationaldagen bestämde sig en grupp pensionärer för att baka världens största smörgåstårta. Tårtan mäter hela 10 meter i diameter och består av flera lager med olika fyllningar.",
            published: new Date(now.getTime() - (1 * 60000)),
            updated: new Date(now.getTime() - (1 * 60000)),
            link: "https://www.youtube.com/watch?v=uHgt8giw1LY"
        },
        {   // DENNA SIMULERAR EN UPPDATERAD:
            title: "Höns i kostym! Lokala bonden klär sina hönor för modevisning",
            id: "nyhet004",
            mainSource: "⚠️ HUVUDTIDNINGEN ETT",
            subSource: "Livsstilmagazinet",
            sourceType: "Viral/Klickvänligt",
            coverage: "Natioinellt",
            image: "https://plus.unsplash.com/premium_photo-1664527009806-2db3830199b7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            media: "Bild",
            summary: "En bonde har klätt sina höns i små kostymer för en lokal modevisning.",
            content: "Den lokala bonden Gunnar har blivit känd för att klä sina höns i små kostymer. Hans senaste projekt, en modevisning för höns, drog stor publik och blev en succé.",
            published: new Date(now.getTime() - (1.5 * 60000)),
            updated: new Date(now.getTime() - (0 * 60000)),
            link: "https://www.youtube.com/watch?v=uHgt8giw1LY"
        },
        {
            title: "Ekorre på skateboard! Djurparkens nya attraktion lockar besökare",
            id: "nyhet005",
            mainSource: "⚠️ HUVUDTIDNINGEN DEN ANDRA",
            subSource: "Attraktionsnytt",
            sourceType: "Nischmedia",
            coverage: "Nationellt",
            image: "https://images.unsplash.com/photo-1446452259634-1c479ec7ff5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNvb2wlMjBzcXVpcnJlbCUyMHNrYXRlfGVufDB8fDB8fHww",
            media: "Bild",
            summary: "En ekorre som åker skateboard har blivit den nya attraktionen på djurparken.",
            content: "Djurparkens senaste attraktion är en ekorre som åker skateboard. Ekorren, som heter Sk8ter, har tränats av djurparkens personal och imponerar på besökarna med sina trick.",
            published: new Date(now.getTime() - (2 * 60000)),
            updated: new Date(now.getTime() - (2 * 60000)),
            link: "https://www.youtube.com/watch?v=uHgt8giw1LY"
        }
    ];

    const completedArray = larvigaNyheter;

    // Sortera arrayen
    completedArray.sort((a, b) => {
        return new Date(b.published) - new Date(a.published);
    });

    return completedArray
}
