import React from 'react'
import { BrowserRouter, Routes, Link } from "react-router-dom";

export default function Aside() {
  return (   
    <div> 
      {/* <BrowserRouter> */}
       
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Alexander Pierce</a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
                  with font-awesome or any other icon font library */}
             
              
              
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Charts
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="pages/charts/chartjs.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>ChartJS</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/charts/flot.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Flot</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/charts/inline.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Inline</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/charts/uplot.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>uPlot</p>
                    </a>
                  </li>
                </ul>
              </li>
             
              <li className="nav-header">EXAMPLES</li>
              
              <li className="nav-item">
                {/* <a href="/provedores" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Gallery
                  </p>
                </a> */}
                <Link className="nav-link"  to="/provedores">
                <i className="nav-icon far fa-image" />
                <p>
                  Proveedores
                </p>
                </Link>
              </li>

              <li className="nav-item">
                {/* <a href="/provedores" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Gallery
                  </p>
                </a> */}
                <Link className="nav-link"  to="/categorias">
                <i className="nav-icon far fa-image" />
                <p>
                  Categorias
                </p>
                </Link>
              </li>

              <li className="nav-item">
                {/* <a href="/provedores" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Gallery
                  </p>
                </a> */}
                <Link className="nav-link"  to="/productos">
                <i className="nav-icon far fa-image" />
                <p>
                  Productos
                </p>
                </Link>
              </li>

              <li className="nav-item">
                {/* <a href="/provedores" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Gallery
                  </p>
                </a> */}
                <Link className="nav-link"  to="/compras">
                <i className="nav-icon far fa-image" />
                <p>
                  Compras
                </p>
                </Link>
              </li>
              
              
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
       
      {/* </BrowserRouter> */}
    </div>
 
  )
}
