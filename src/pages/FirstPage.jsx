import React from 'react'
import { Link } from 'react-router-dom'

const FirstPage = () => {
    return (<>
        <div> <small>FirstPage</small></div>
        <br />
        <div className='text-center'>
            <p>
                Förstasidan är inte byggd ännu 😅
            </p>




            <Link to="/feed">
                <div className='btn btn-outline-primary m-2'>
                    Till nyhetsflödet istället!
                </div>
            </Link>

        </div>






    </>

    )
}

export default FirstPage