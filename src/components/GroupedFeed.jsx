import React from 'react'

import Accordion from 'react-bootstrap/Accordion';

import NewsCard from './NewsCard';


const GroupedFeed = ({ groupedNewsArray }) => {

    /* --- --- --- --- --- --- --- --- --- --- */
    // i denna skickar vi array med grupperade nyheter.
    // arrayen ska bestå av objekt med label samt en array med artikelobjekt.
    // EXEMPEL:
    /*  [{
            label: 'Senaste timmen',
            articles: [ {}, {}, {}] 
        }]
    */
    /* --- --- --- --- --- --- --- --- --- --- */


    return (<>
        {/* de aktiva här är de positioner i arrayen som alltid kommer vara öppna när man startar. */}

        <Accordion flush defaultActiveKey={[0, 1, 2]} alwaysOpen>

            {/* om det finns en array med grupperade nyheter definerad så kommer den försöka visas. annars inte. */}
            {groupedNewsArray &&
                groupedNewsArray.map((group, index) => {
                    return (
                        <Accordion.Item key={group.label} eventKey={index} >

                            <Accordion.Header>
                                <p className='m-0 m-0'><b>{group.label}</b> <small>({group.articles.length})</small></p>
                            </Accordion.Header>

                            <Accordion.Body className='p-0'>
                                {/* dekorativ lije */}
                                <div style={{ height: "0.25rem", width: "100%" }} className='bg-secondary-subtle'></div>

                                {group.articles.map((a) => (
                                    <div key={a.id}>
                                        <NewsCard key={a.id} article={a} />

                                        {/* dekorativ lije */}
                                        <div style={{ height: "0.25rem", width: "100%" }} className='bg-secondary-subtle'></div>
                                    </div>))}
                                {/* dekorativ lije */}
                                <div style={{ height: "0.25rem", width: "100%" }} className='bg-secondary-subtle'></div>

                            </Accordion.Body>
                        </Accordion.Item>)

                }
                )
            }


        </Accordion >
    </>
    )
}

export default GroupedFeed

/*
<Accordion defaultActiveKey={['0']} alwaysOpen>
<Accordion.Item eventKey="0">
    <Accordion.Header>Accordion Item #1</Accordion.Header>
    <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="1">
    <Accordion.Header>Accordion Item #2</Accordion.Header>
    <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
</Accordion.Item>
</Accordion>

*/