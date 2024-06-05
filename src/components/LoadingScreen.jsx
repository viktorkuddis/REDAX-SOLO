import React from 'react'

const LoadingScreen = () => {
    return (
        <div className="card" style={{ position: "absolute", zIndex: "999", width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', gap: "2rem", textAlign: "center" }}>

            <h1 style={{ marginTop: "auto" }}>REDAX SOLO</h1>
            <div className="spinner-border" role="status" />
            <span className="visually-hidden">Loading...</span>
            <p style={{ marginTop: "auto" }} className='mb-5'>By Viktor Magnusson</p>



        </div >
    );
}

export default LoadingScreen