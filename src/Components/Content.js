import { Route, Routes } from "react-router-dom";
import React from 'react'
import ListadoProvedores from "./Proveedores/ListadoProveedores";
import Aside from "./Aside";
import Prueba from "./Proveedores/Prueba";
import ListadoProductos from "./Productos/ListadoProductos";
import ListadoCategorias from "./Categorias/ListadoCategorias";
import ListadoCompras from "./Compras/ListadoCompras";

export default function Content() {
  return (
    <div className="content-wrapper">
        <Routes>
            <Route exact path='/' element={<Prueba/>} />
            <Route exact path='/provedores' element={<ListadoProvedores title="Proveedores"/>} />
            <Route exact path='/productos' element={<ListadoProductos title="Productos"/>} />
            <Route exact path='/agregar' element={<ListadoProvedores />} />
            <Route exact path='/categorias' element={<ListadoCategorias  title="Categorias"/>}  />
            <Route exact path='/compras' element={<ListadoCompras  title="Compras"/>}  />
        </Routes>
    </div>
  )
}
