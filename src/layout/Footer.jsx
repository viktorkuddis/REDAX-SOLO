import React from 'react'
import { Ellipsis } from 'react-bootstrap/esm/PageItem'

const Footer = () => {
    return (<>

        <footer>
            <small><small>

                <div className='card rounded-0 bg-body-secondary border-0' style={{ padding: "0.1rem", whiteSpace: "nowrap", overflow: "auto" }}>
                    &copy; {new Date().getFullYear()} Viktor Magnusson | Statusbar | ...  </div>

            </small></small>
        </footer>
    </>
    )
}

export default Footer