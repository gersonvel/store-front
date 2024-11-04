import React, { useEffect, useState } from 'react'
import { request } from '../../axios_helper';
import moment from 'moment';
import ModalAgregarCompra from './ModalAgregarCompra';

export default function ListadoCompras(props) {

    const [compras, setCompras] =useState([]);

    useEffect(() => {
        cargarCompras();
    },[]);

    const cargarCompras = async () => {
        await request(
            "GET",
            "/compras"
        ).then((response) =>{
            setCompras(response.data);
            console.log("************Compras*******************");
            console.log(response.data);
            
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{props.title}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" >
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <h3 className="card-title">Listado de {props.title}</h3>
                                        </div>
                                        <div className='col-md-6 d-flex justify-content-end' >
                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add-compra">
                                                <i class="fas fa-solid fa-plus"></i> Agregar Compra
                                            </button>
                                        </div>

                                    </div>

                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th># compra</th>
                                                <th>Fecha</th>
                                                <th>Proveedor</th>
                                                <th>Monto</th>
                                                <th>Detalles</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {compras.map((compra, indice) => (
                                            <tr key={indice}>
                                               
                                                <td>{compra.idCompra}</td>
                                                <td>{moment(new Date(compra.fechaCompra)).format('LLL')}</td>
                                                <td>{compra.proveedor.nombreProveedor}</td>
                                                <td>$ {compra.montoCompra}</td>
                                            
                                                <td>
                                                    <button type="button" class="btn btn-inline-block btn-warning btn-sm mr-2" data-toggle="modal" data-target="#modal-add-compra" ><i class="fas far fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ModalAgregarCompra cargarCompras = {cargarCompras}/>
        </div>
    )
}
