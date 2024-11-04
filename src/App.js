import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Header from './Components/Header'
import Aside from './Components/Aside'
// import Content from './Components/ContentPrueba'
import Content from './Components/Content'
import Footer from './Components/Footer'

export default function App() {
  return (
    <div>
     {/* Hice esto para que funcinaran los Link del aside, y en el content estan los router */}
      <BrowserRouter>
        <Header />
        <Aside />            
        <Content />
        <Footer />
      </BrowserRouter>
      
      
    
    </div>
  )
}
