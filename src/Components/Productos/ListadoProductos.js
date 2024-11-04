// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { request } from '../../axios_helper';
// import ModalAgreagarProveedor from './ModalAgreagarProveedor';
// import ModalEditarProveedor from './ModalEditarProveedor';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import 'moment/locale/es';
import $ from 'jquery'; 
import ModalAgregarProducto from './ModalAgregarProducto';
import ModalEditarProducto from './ModalEditarProducto';

export default function ListadoProductos(props) {


    //useSatate para listar productos
    const [productos, setProductos] =useState([]);
    const [producto, setProducto] = useState([]);

    //ruta imagenes productos
    const urlImgProducto  = "http://localhost:8080/productos"
    
       
    useEffect(() => {
        cargarProductos();
        // $("#example1").DataTable({
        //     "responsive": true, "lengthChange": false, "autoWidth": false,
        //     "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        // }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    },[]);

   

    

    const cargarProducto = async (id) => {
         //const resultado = await axios.get(`${urlBase}/${id}`);
        // setEmpleado(resultado.data);

        await request(
            "GET",
            `producto/${id}`,
        ).then((response) => {
            // console.log(response);
            setProducto(response.data);
            // console.log(producto);

        }).catch((error) => {
            console.log(error);
        })
    }

    const cargarProductos = async () => {
        await request(
            "GET",
            "/productos"
        ).then((response) =>{
            setProductos(response.data);
            console.log("************Productos*******************");
            console.log(response.data);
            
        }).catch((error) => {
            console.log(error);
        })
    }

    const editarProducto = async (id) =>{
        // await axios.delete(`${urlBase}/${id}`);
        // cargarEmpleados();
        cargarProducto(id);
      
    }

    const onDeleteProducto = async (id) => {
        await request(
            "DELETE",
            `producto/${id}`
        ).then((response) => {
            console.log(response);
            Swal.fire(
                'Eliminado!',
                'El prodcuto ha sido eliminado!.',
                'success'
            )
            cargarProductos();

        }).catch((error) => {
            console.log(error);
            Toast.fire({
                icon: 'error',
                title: 'Error al realizar la operacion.'
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

    const onClickDeleteProducto = (e,id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Estas Seguro de Eliminar el Producto?',
            text: "No sera posible revertir la acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                onDeleteProducto(id);              
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
                                    <i class="fas fa-solid fa-plus"></i> Agregar Producto
                                </button>
                            </div>

                        </div>
                        
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <table id="tblProductos" className="table table-bordered table-striped">
                        <thead>
                            <tr>                           
                            <th>IMG</th>
                            <th>Nombre</th>
                            <th>Proveedor</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {productos.map((producto, indice) => (
                            <tr key={indice}>
                                <td><img src={producto.nombreProducto != null && producto.imagenProducto ? urlImgProducto + '/' + producto.imagenProducto : urlImgProducto + '/no-image.jpg'} className="img-thumbnail"  style={{ width: '100px', height: '100px', 'object-fit': 'contain' }} alt={producto.nombreProducto} /></td>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.proveedor.nombreProveedor}</td>
                                <td>{producto.categoria.nombreCategoria}</td>
                                <td>$ {producto.precioProducto}</td>
                                <td>{producto.stockProducto}</td>
                                <td>{producto.statusProducto == 1 ? <span class="badge badge-pill badge-success">Activado</span> : <span class="badge badge-pill badge-danger">Desactivado</span>} </td>
                                
                              
                                <td>
                                    <button type="button" class="btn btn-inline-block btn-warning btn-sm mr-2" data-toggle="modal" data-target="#modal-edit-producto" onClick={()=>editarProducto(producto.idProducto)}><i class="fas far fa-edit"></i></button>
                                    <button type="button" class="btn btn-inline-block btn-danger btn-sm" onClick={(e) => onClickDeleteProducto(e,producto.idProducto)}><i class="fas fa-trash"></i></button>
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

        {/* Modal Agregar Nuevo producto */}
        <ModalAgregarProducto cargarProductos={cargarProductos}/>

        {/* Modal Editar producto */}
        <ModalEditarProducto producto={producto}  cargarProductos={cargarProductos}/>
        {/* <ModalEditarProveedor proveedor={proveedor} cargarProveedores={cargarProveedores}/> */}

    </div>
  )
}