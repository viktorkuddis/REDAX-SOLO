import React, { useContext } from 'react'

import GlobalContext from '../../context/GlobalContext'


const CardSizeBtn = () => {

    // hämtar context
    const { cardSize, setCardSize } = useContext(GlobalContext)

    // sätter storleken som korten ska ha.
    function handleCardSize() {
        if (cardSize == "normal") {
            setCardSize("small");
            localStorage.setItem("cardSize", JSON.stringify("small"))
        }
        else {
            setCardSize("normal");
            localStorage.setItem("cardSize", JSON.stringify("normal"))
        }

    }

    return (<>

        <button className='btn btn-primary'
            onClick={handleCardSize}>
            <i className="bi bi-circle-half"></i>
            nu är korten {cardSize}
        </button>

        {/* Testtext: */}
        {/* Darkmode på?: {isDarkMode ? "Ja" : "Nej"} */}
    </>
    )
}

export default CardSizeBtn