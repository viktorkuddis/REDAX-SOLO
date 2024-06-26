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


    const { allSrNews, querys, setQuerys } = useContext(GlobalContext)
    // console.log(allSrNews)

    const mainSources = []
    allSrNews.forEach((article) => {
        if (!mainSources.includes(article.mainSource)) {
            mainSources.push(article.mainSource)
        }
    })

    const subSources = [];
    allSrNews.forEach((article) => {
        // Kontrollerar om subSources redan innehåller subSource från den nuvarande artikeln
        if (!subSources.some(item => item.subSource === article.subSource)) {
            // Om subSource inte redan finns i subSources, lägg till den tillsammans med coverage i subSources-arrayen
            subSources.push({ subSource: article.subSource, coverage: article.coverage });
        }
    });
    subSources.sort((a, b) => {
        // localCompare jämför strings
        return a.subSource.localeCompare(b.subSource);
    });

    const coverages = []
    allSrNews.forEach((article) => {
        if (!coverages.includes(article.coverage)) {
            coverages.push(article.coverage)
        }
    })
    coverages.sort().reverse()


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

    // console.log(mainSources)
    // console.log(subSources)
    // console.log(coverages)
    // console.log(querys)
    return (<>

        <div className="card d-block">


            FILTRERA EFTER KÄLLA:
            <br />
            {mainSources.map((mainSource, index) => (
                <div key={index} className={querys.mainSources.includes(mainSource) ? 'btn btn-primary btn-sm rounded-pill' : 'btn btn-outline-secondary btn-sm rounded-pill'} onClick={() => { handleToggleQueryItem("mainSources", mainSource) }}>{mainSource}</div>
            ))}


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