
export function formatDateAndTime(datumsträng) {
    // console.log("datumsträng", typeof datumsträng, datumsträng)

    let formattedDate = new Date(datumsträng)
        .toLocaleString("sv-SE",
            {
                dateStyle: "medium",
                timeStyle: "short"
            });

    // console.log("formattedDate", typeof formattedDate, formattedDate)

    return formattedDate
}