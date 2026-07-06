import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Feature from "../components/Feature";
import FinalSection from "../components/FinalSection";


function HomePage(){
    return (
        <>
        <Navbar />
        <Hero />
        <Feature />
        <HowItWorks />
        <FinalSection />
        </>
    )
}
export default HomePage;