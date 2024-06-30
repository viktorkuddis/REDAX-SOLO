import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';

const FilterPanel = () => {

    const { masterNewsFeed, querys, setQuerys } = useContext(GlobalContext)
    // console.log(masterNewsFeed)

    // Skapar separata arrayer för varje unik beståndsdel:
    const [mainSources, setMainSources] = useState([]);
    const [sourceTypes, setSourceTypes] = useState([]);
    const [subSources, setSubSources] = useState([]);
    const [coverages, setCoverages] = useState([]);


    // FÖR ATT KUNNA FILTRERA:
    // SKAPA ETT REGISTER ÖVER KÄLLORNAS BESTÅNDSDELAR  och DESS RELATIONER TILL VARANDRA:
    const [sourceRegister, setSourceRegister] = useState([]);

    useEffect(() => {
        const tempMainSources = [];
        const tempSubSources = [];
        const tempSourceTypes = [];
        const tempCoverages = [];
        const tempSourceRegister = [];

        masterNewsFeed.forEach(article => {

            /*** BYGGER REGISTER ***/

            // kollar om det finns instans i registret som är likadant som den datan som kommer från artikeln....
            if (!tempSourceRegister.some(item =>
                item.subSource === article.subSource &&
                item.mainSource === article.mainSource &&
                item.sourceType === article.sourceType &&
                item.coverage === article.coverage
            )) {
                // om likadan instans inte redan finns, lägg till
                tempSourceRegister.push({
                    "mainSource": article.mainSource,
                    "subSource": article.subSource,
                    "sourceType": article.sourceType,
                    "coverage": article.coverage
                });
            }


            /*** BYGGER SEPARATA ARRAYER ***/
            // Lägger till mainSource om den inte redan finns i mainSources[]
            if (!tempMainSources.includes(article.mainSource)) {
                tempMainSources.push(article.mainSource);
            }

            // Lägger till subSource om den inte redan finns i subSources[]
            if (!tempSubSources.includes(article.subSource)) {
                tempSubSources.push(article.subSource);
            }

            // Lägger till sourceType om den inte redan finns i sourceTypes[]
            if (!tempSourceTypes.includes(article.sourceType)) {
                tempSourceTypes.push(article.sourceType);
            }

            // Lägger till coverage om den inte redan finns i coverages[]
            if (!tempCoverages.includes(article.coverage)) {
                tempCoverages.push(article.coverage);
            }

        });

        tempSubSources.sort();
        tempCoverages.sort().reverse(); // för att få nationellt att komma innan lokalt


        // Uppdatera state med de temporära arrayerna
        setMainSources(tempMainSources);
        setSubSources(tempSubSources);
        setSourceTypes(tempSourceTypes)
        setCoverages(tempCoverages);
        setSourceRegister(tempSourceRegister);

    }, [masterNewsFeed]);

    // endast Konsol Loggar:
    useEffect(() => {
        if (subSources.length) {
            console.log("mainSources", mainSources)
            console.log("subSources", subSources)
            console.log("sourceTypes", sourceTypes)
            console.log("coverages", coverages)
            console.log("-----------------------------------");
            console.log("📖 sourceRegister", sourceRegister);
            console.log("-----------------------------------");
        }


    }, [sourceRegister])

    function handleToggleQueryItem(queryKey, queryValueToToggle) {
        const queryKeyValues = querys[queryKey]; // Använder bracket notation för att komma åt egenskapen. inte dot här  eftersom jag hämtar egenskapen dynamiskt :) 

        // console.log("Före ändring:", queryKeyValues);

        if (!queryKeyValues.includes(queryValueToToggle)) {
            queryKeyValues.push(queryValueToToggle);
        } else {
            //tar bort den ur arrayen
            const toggleIndex = queryKeyValues.indexOf(queryValueToToggle);
            queryKeyValues.splice(toggleIndex, 1);
        }

        // console.log("Efter ändring:", queryKeyValues);

        setQuerys(prevState => ({
            ...prevState,
            [queryKey]: queryKeyValues
        }));
        console.log("🧠 QUERYS  :", querys)
    }



    function handleToggleALL(queryKey, queryValueToToggle) {
        const queryKeyValues = querys[queryKey];
        // values array innehåller här det som den keyn i query jag vill komma åt.
        // console.log(queryKeyValues);

        //Sätter keyn till en tom array om den har värden redan.
        if (queryKeyValues.length) {
            setQuerys(prevState => ({
                ...prevState,
                [queryKey]: []
            }));
        } else {
            //annars blir den de värden som skickas in...
            setQuerys(prevState => ({
                ...prevState,
                [queryKey]: [...queryValueToToggle]
            }));
        }
        console.log("🧠 QUERYS  :", querys);
    }





    return (<>

        <div className="card d-block">

            <h4>FILTRERA EFTER KÄLLA:</h4>

            <br />Täckning:
            <div
                className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1 mx-2'
                onClick={() => { handleToggleALL("sourceTypes", sourceTypes) }}
            >
                Alla / Inga
            </div>
            <br />
            {coverages.map((coverage, index) => coverage && (
                <div key={index} className={querys.coverages.includes(coverage)
                    ? 'btn btn-primary btn-sm rounded-pill  me-1 my-1'
                    : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("coverages", coverage) }}>
                    {coverage}
                </div>

            ))}

            <br />Typ:
            <div
                className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1 mx-2'
                onClick={() => { handleToggleALL("sourceTypes", sourceTypes) }}
            >
                Alla / Inga
            </div>
            <br />
            {sourceTypes.map((sourceType, index) => sourceType && (
                <div key={index} className={querys.sourceTypes.includes(sourceType)
                    ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
                    : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("sourceTypes", sourceType) }}>
                    {sourceType}
                </div>
            ))}

            <br />Plattform:
            <div
                className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1 mx-2'
                onClick={() => { handleToggleALL("mainSources", mainSources) }}
            >
                Alla / Inga
            </div>
            <br />
            {mainSources.map((mainSource, index) => mainSource && (
                <div key={index} className={querys.mainSources.includes(mainSource)
                    ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
                    : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("mainSources", mainSource) }}>
                    {mainSource}
                </div>
            ))}

            <br />Avdelning/Sektion:
            <div
                className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1 mx-2'
                onClick={() => { handleToggleALL("subSources", subSources) }}
            >
                Alla / Inga
            </div>
            <br />
            {subSources.map((subSource, index) => subSource && (
                <div key={index}
                    className={querys.subSources.includes(subSource)
                        ? 'btn btn-primary btn-sm rounded-pill  me-1 my-1'
                        : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("subSources", subSource) }}>
                    {subSource}
                </div>
            ))}

        </div >
        also TODO:
        <br />typ: <br />
        Public Service, Kommersiell Nyhetsmedia, Viral / Klickvänligt, Nischmedia
    </>


    )
}

export default FilterPanel