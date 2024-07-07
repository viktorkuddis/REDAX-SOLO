import React from 'react'

const Footer = () => {
    return (<>

        <footer>
            <small><small>

                <div className='card rounded-0 bg-body-secondary  border-0 px-2' style={{ padding: "0.1rem" }}>
                    &copy; {new Date().getFullYear()} Viktor Magnusson</div>

            </small></small>
        </footer>
    </>
    )
}

export default Footer