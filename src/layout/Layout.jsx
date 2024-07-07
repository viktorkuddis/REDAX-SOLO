import React from 'react'

import Footer from './Footer';

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header>
                H E A D E R
            </header>
            <hr />
            här kommer lite innehåll:

            <Outlet />
            <hr />

            <Footer />
        </>

    )
}

export default Layout