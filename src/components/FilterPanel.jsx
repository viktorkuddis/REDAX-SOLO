import React, { useState } from 'react'
import { useContext } from 'react';
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


    /*
    skapar separata arrayer med beståndsdelar som en nyhet kan filtreras efter. inga dubletter i arrayeerna. 
    */

    // const mainSources = []
    // const subSources = [];
    // const coverages = []



    // FÖR ATT KUNNA FILTRERA:
    // SKAPA ETT REGISTER ÖVER KÄLLORNAS BESTÅNDSDELAR DESS RELATIONER TILL VARANDRA:

    const sourceRegister = [];

    masterNewsFeed.forEach(article => {
        // kollar om det finns instans i registret som är likadant som den datan som kommer från artikeln....
        if (!sourceRegister.some(item =>
            item.coverage === article.coverage &&
            item.sourceType === article.sourceType &&
            item.mainSource === article.mainSource &&
            item.subSource === article.subSource
        )) {
            // om likadan instans inte redan finns, lägg till
            sourceRegister.push({
                "coverage": article.coverage,
                "sourceType": article.sourceType,
                "mainSource": article.mainSource,
                "subSource": article.subSource
            });
        }
    });

    console.log("📖 sourceRegister", sourceRegister);

    // //--- --- --- --- ---
    // masterNewsFeed.forEach((article) => {
    //     if (!mainSources.includes(article.mainSource)) {
    //         mainSources.push(article.mainSource)
    //     }
    // })

    // //--- --- --- --- ---
    // masterNewsFeed.forEach((article) => {
    //     // Kontrollerar om subSources redan innehåller subSource från den nuvarande artikeln
    //     if (!subSources.some(item => item.subSource === article.subSource)) {
    //         // Om subSource inte redan finns i subSources, lägg till den tillsammans med coverage i subSources-arrayen
    //         subSources.push({ subSource: article.subSource, coverage: article.coverage });
    //     }
    // });
    // subSources.sort((a, b) => {
    //     // localCompare jämför strings
    //     return a.subSource.localeCompare(b.subSource);
    // });

    // //--- --- --- --- ---
    // masterNewsFeed.forEach((article) => {
    //     if (!coverages.includes(article.coverage)) {
    //         coverages.push(article.coverage)
    //     }
    // })
    // coverages.sort().reverse()

    //--- --- --- --- ---

    // console.log("mainSources", mainSources)
    // console.log("subSources", subSources)
    // console.log("coverages", coverages)

    function handleToggleQueryItem(queryKey, queryValueToToggle) {
        const valuesArray = querys[queryKey]; // Använder bracket notation för att komma åt egenskapen. inte dot här  eftersom jag hämtar egenskapen dynamiskt :) 

        // console.log("Före ändring:", valuesArray);

        if (!valuesArray.includes(queryValueToToggle)) {
            valuesArray.push(queryValueToToggle);
        } else {
            const toggleIndex = valuesArray.indexOf(queryValueToToggle);
            valuesArray.splice(toggleIndex, 1);
        }

        // console.log("Efter ändring:", valuesArray);

        setQuerys(prevState => ({
            ...prevState,
            [queryKey]: valuesArray
        }));
    }

    console.log("🧠 QUERYS  :", querys)
    // console.log(mainSources)
    // console.log(subSources)
    // console.log(coverages)
    // console.log(querys)
    return (<>

        <div className="card d-block">


            <h4>FILTRERA EFTER KÄLLA:</h4>

            <br />Täckning:   <div className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1'> Alla </div><br />



            {/* {coverages.map((coverage, index) => (
                <div key={index} className={querys.coverages.includes(coverage)
                    ? 'btn btn-primary btn-sm rounded-pill  me-1 my-1'
                    : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("coverages", coverage) }}>
                    {coverage}
                </div>
            ))} */}

            {/* <br />Plattform:  <div className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1'> Alla </div><br />

            {mainSources.map((mainSource, index) => (
                <div key={index} className={querys.mainSources.includes(mainSource)
                    ? 'btn btn-primary btn-sm rounded-pill me-1 my-1'
                    : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("mainSources", mainSource) }}>
                    {mainSource}
                </div>
            ))}



            <br />Avdelning/Sektion:  <div className='btn btn-outline-secondary btn-sm rounded-3  me-1 my-1'> Alla </div><br />
            {subSources.map((subS, index) => (
                <div key={index}
                    // className={querys.subSources.subSource.includes(subS.subSource)
                    //     ? 'btn btn-primary btn-sm rounded-pill  me-1 my-1'
                    //     : 'btn btn-outline-secondary btn-sm rounded-pill  me-1 my-1'}
                    onClick={() => { handleToggleQueryItem("subSources", subS) }}>
                    {subS.subSource}
                </div>
            ))}



            <br />typ: <br />
            Public Service, Kommersiell Nyhetsmedia, Viral/Klickvänligt, Nischmedia */}


            {/* 
            {
                coverages.map((c, covIndex) => (
                    <div key={covIndex}>
                        <b>{c}</b>
                        {subSources.map((s, subIndex) => {
                            if (c === s.coverage) {
                                return <div key={subIndex}>{s.subSource} {"(" + s.coverage + ")"}</div>;
                            }
                            return null;
                        })}
                    </div>
                ))
            } */}
        </div >


    </>


    )
}

export default FilterPanel