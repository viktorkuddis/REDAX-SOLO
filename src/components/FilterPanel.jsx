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
import FilterButtonBySource from './FilterButtonBySource';

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
    // useEffect(() => {
    //     if (subSources.length) {
    //         console.log("mainSources", mainSources)
    //         console.log("subSources", subSources)
    //         console.log("sourceTypes", sourceTypes)
    //         console.log("coverages", coverages)
    //         console.log("-----------------------------------");
    //         console.log("📖 sourceRegister", sourceRegister);
    //         console.log("-----------------------------------");
    //     }


    // }, [sourceRegister])

    function handleToggleQueryItem(queryKey, queryValueToToggle) {

        console.log("FUNKTOIN KÖRR")
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
        // const queryKeyValues = querys[queryKey];
        // values array innehåller här det som den keyn i query jag vill komma åt.
        // console.log(queryKeyValues);

        //Sätter keyn till en tom array om den har värden redan.
        // if (queryKeyValues.length) {
        //     setQuerys(prevState => ({
        //         ...prevState,
        //         [queryKey]: []
        //     }));
        // } else {
        //annars blir den de värden som skickas in...
        setQuerys(prevState => ({
            ...prevState,
            [queryKey]: [...queryValueToToggle]
        }));
        // }
        console.log("🧠 QUERYS  :", querys);
    }

    function handleToggleNONE(queryKey, queryValueToToggle) {
        // const queryKeyValues = querys[queryKey];
        // values array innehåller här det som den keyn i query jag vill komma åt.
        // console.log(queryKeyValues);

        //Sätter keyn till en tom array om den har värden redan.
        // if (queryKeyValues.length) {
        setQuerys(prevState => ({
            ...prevState,
            [queryKey]: []
        }));
        // } else {
        //     //annars blir den de värden som skickas in...
        //     setQuerys(prevState => ({
        //         ...prevState,
        //         [queryKey]: [...queryValueToToggle]
        //     }));
        // }
        console.log("🧠 QUERYS  :", querys);
    }


    const [coveragesToRender, setCoveragesToRender] = useState([]);
    const [sourceTypesToRender, setSourceTypesToRender] = useState([]);
    const [mainSourcesToRender, setMainSourcesToRender] = useState([]);
    const [subSourcesToRender, setSubSourcesToRender] = useState([]);

    // Definerar arrayer med de knappar som dynamisk ska renderas för användaren baserat på filtrering användaren gör:
    useEffect(() => {


        const tempCoveragesToRender = [];
        const tempSourceTypesToRender = [];
        const tempMainSourcesToRender = [];
        const tempSubSourcesToRender = [];

        // *** LOGIKFÖRKLARING *** //

        // Går igenom alla värden i den aktuella Query-keyn.
        // Kollar om någon rad i registret motsvarande key som matchar den aktuella query-värdet.
        // Kollar så att även andra delar av resisteritemet finns i queryn.
        // Om match och den inte redan finns i motsvarande temporär array så skickas den in där.


        // *** LOGIKFÖRKLARING *** //
        // Går igenom alla värden i den aktuella Query-keyn.
        // Kollar om något item i registret har motsvarande key som matchar den aktuella query-värdet.
        // Kollar även så att registeritemets övriga keys bär värden som finns representerade i queryns motsvarande keys. (gäller endast de keys som är överordnade den aktuella keyn enligt filterflödet som är uppbuggt)
        // Om en matchning hittas, och matchningen inte redan finns i den tillfälliga arrayen för rendering,
        // läggs den till. 




        querys.coverages.forEach((queryItem) => {
            sourceRegister.some((registerItem) => {
                if (
                    registerItem.coverage == queryItem
                ) {
                    if (!tempSourceTypesToRender.includes(registerItem.sourceType)) tempSourceTypesToRender.push(registerItem.sourceType)
                }
            })
        })


        querys.sourceTypes.forEach((queryItem) => {
            sourceRegister.some((registerItem) => {
                if (
                    registerItem.sourceType == queryItem
                    && querys.coverages.includes(registerItem.coverage)
                ) {
                    if (!tempMainSourcesToRender.includes(registerItem.mainSource)) tempMainSourcesToRender.push(registerItem.mainSource)
                }
            })
        })


        querys.mainSources.forEach((queryItem) => {
            sourceRegister.some((registerItem) => {
                if (
                    registerItem.mainSource == queryItem
                    && querys.sourceTypes.includes(registerItem.sourceType)
                    && querys.coverages.includes(registerItem.coverage)
                ) {
                    if (!tempSubSourcesToRender.includes(registerItem.subSource)) tempSubSourcesToRender.push(registerItem.subSource)
                }
            })
        })



        // Uppdaterar state med de nya arrayerna
        setSourceTypesToRender(tempSourceTypesToRender);
        setMainSourcesToRender(tempMainSourcesToRender);
        setSubSourcesToRender(tempSubSourcesToRender);

        // console.log("coveragesToRender:", coveragesToRender)
        // console.log("sourceTypesToRender", sourceTypesToRender)
        // console.log("mainSourcesToRender", mainSourcesToRender)
        // console.log("subSourcesToRender", subSourcesToRender)

    }, [querys])


    return (<>

        <div className="d-block">




            <h4>FILTRERA EFTER KÄLLA:</h4>

            Täckning:
            <span>
                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleALL("coverages", coverages) }}
                >
                    Markera
                </div>

                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleNONE("coverages", coverages) }}
                >
                    Avmarkera
                </div>
            </span>
            <br />


            {coveragesToRender.length
                ? coveragesToRender.map((item, index) => item && (
                    <FilterButtonBySource
                        key={(item)}
                        markedAsDefault
                        queryKey={"coverages"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />
                ))
                : coverages.map((item) => item && (
                    <FilterButtonBySource
                        key={item}
                        markedAsDefault
                        queryKey={"coverages"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />


                ))
            }


            <br />



            <br />Typ:
            <span>
                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleALL("sourceTypes", sourceTypes) }}
                >
                    Markera
                </div>

                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleNONE("sourceTypes", sourceTypes) }}
                >
                    Avmarkera
                </div>
            </span>
            <br />


            {sourceTypesToRender.length
                ? sourceTypesToRender.map((item, index) => item && (
                    <FilterButtonBySource
                        key={(item)}
                        markedAsDefault
                        queryKey={"sourceTypes"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />
                ))
                : sourceTypes.map((item) => item && (
                    <FilterButtonBySource
                        markedAsDefault
                        key={item}
                        queryKey={"sourceTypes"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />


                ))
            }

            <br />

            <br />Plattform:
            <span>
                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleALL("mainSources", mainSources) }}
                >
                    Markera
                </div>

                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleNONE("mainSources", mainSources) }}
                >
                    Avmarkera
                </div>
            </span>
            <br />


            {mainSourcesToRender.length
                ? mainSourcesToRender.map((item, index) => item && (
                    <FilterButtonBySource
                        key={(item)}
                        markedAsDefault
                        queryKey={"mainSources"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />
                ))
                : mainSources.map((item) => item && (
                    <FilterButtonBySource
                        key={item}
                        markedAsDefault
                        queryKey={"mainSources"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />


                ))
            }



            <br />
            <br />Avdelning/Sektion:
            <span>
                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleALL("subSources", subSources) }}
                >
                    Markera
                </div>

                <div
                    className='btn btn-outline-secondary btn-sm rounded-3  ms-1 my-1'
                    onClick={() => { handleToggleNONE("subSources", subSources) }}
                >
                    Avmarkera
                </div>
            </span>
            <br />



            {subSourcesToRender.length
                ? subSourcesToRender.map((item, index) => item && (
                    <FilterButtonBySource
                        key={(item)}
                        markedAsDefault
                        queryKey={"subSources"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />
                ))
                : subSources.map((item) => item && (
                    <FilterButtonBySource
                        key={item}
                        markedAsDefault
                        queryKey={"subSources"}
                        queryKeyItem={item}
                        handleToggleQueryItem={handleToggleQueryItem}
                    />


                ))
            }



        </div >
        also TODO:
        <br />typ: <br />
        Public Service, Kommersiell Nyhetsmedia, Viral / Klickvänligt, Nischmedia




    </>


    )
}

export default FilterPanel