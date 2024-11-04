// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { request } from '../../axios_helper';
import ModalAgreagarProveedor from './ModalAgreagarProveedor';
import ModalEditarProveedor from './ModalEditarProveedor';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import 'moment/locale/es';
import $ from 'jquery'; 

export default function ListadoProvedores(props) {


    //useSatate para listar proveedores
    const [proveedores, setProveedores] = useState ([]);
    const [proveedor, setProveedor] = useState([]);
    
       
    useEffect(() => {
        cargarProveedores();
        // $("#example1").DataTable({
        //     "responsive": true, "lengthChange": false, "autoWidth": false,
        //     "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        // }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    },[]);

    const cargarProveedores = async () => {
        // const resultado = await axios.get('http://localhost:8080/api/v1/store/proveedores');
        // console.log("Resultado cargar proveedores");
        // console.log(resultado.data);
        // setProveedores(resultado.data);
            await request(
                "GET",
                "/proveedores"
            ).then((response) => {
                console.log(response);
                setProveedores(response.data);
    
            }).catch((error) => {
                console.log(error);
            })
        
    }

    const cargarProveedor = async (id) => {
         //const resultado = await axios.get(`${urlBase}/${id}`);
        // setEmpleado(resultado.data);

        await request(
            "GET",
            `proveedor/${id}`,
        ).then((response) => {
            console.log(response);
            setProveedor(response.data);
            console.log(proveedor);

        }).catch((error) => {
            console.log(error);
        })
    }

    const editarProveedor = async (id) =>{
        // await axios.delete(`${urlBase}/${id}`);
        // cargarEmpleados();
        cargarProveedor(id);
      
    }

    const onDeleteProveedor = async (id) => {
        await request(
            "DELETE",
            `proveedor/${id}`
        ).then((response) => {
            console.log(response);
            Swal.fire(
                'Eliminado!',
                'El proveedor ha sido eliminado!.',
                'success'
            )
            cargarProveedores();

        }).catch((error) => {
            console.log(error);
            Toast.fire({
                icon: 'error',
                title: 'Proveedor creado correctamente.'
            })
        })
    }

    //Sweet alert configuration
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    const onClickDeleteProveedor = (e,id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Estas Seguro de Eliminar el Poveedor?',
            text: "No sera posible revertir la acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                onDeleteProveedor(id);              
            }
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
            {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">DataTables</li>
                </ol>
            </div> */}
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
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-default">
                                    <i class="fas fa-solid fa-plus"></i> Agregar Proveedor
                                </button>
                            </div>

                        </div>
                        
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Fecha de registro</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {proveedores.map((proveedor, indice) => (
                            <tr key={indice}>
                                <td>{proveedor.idProveedor}</td>
                                <td>{proveedor.nombreProveedor}</td>
                                <td>{proveedor.direccionProveedor}</td>
                                <td>{proveedor.telefonoProveedor}</td>
                                <td>{moment(new Date(proveedor.fechaRegistroProveedor)).format('LLL')}</td>
                                <td>
                                    <button type="button" class="btn btn-inline-block btn-warning btn-sm mr-2" data-toggle="modal" data-target="#modal-edit-proveedor" onClick={()=>editarProveedor(proveedor.idProveedor)}><i class="fas far fa-edit"></i></button>
                                    <button type="button" class="btn btn-inline-block btn-danger btn-sm" onClick={(e) => onClickDeleteProveedor(e,proveedor.idProveedor)}><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                            
                        </tbody>
                        </table>
                    </div>
                    {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
                {/* /.col */}
                </div>
                {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </section>

        {/* Modal Agregar Nuevo proveedor */}
        <ModalAgreagarProveedor cargarProveedores={cargarProveedores}/>

        {/* Modal Editar proveedor */}
        <ModalEditarProveedor proveedor={proveedor} cargarProveedores={cargarProveedores}/>

    </div>
  )
}
