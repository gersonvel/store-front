import React, { useEffect, useState } from 'react'
import { request } from '../../axios_helper';
import ModalAgregarCategoria from './ModalAgregarCategoria';
import ModalEditarCategoria from './ModalEditarCategoria';

export default function ListadoCategorias(props) {

    //useSatate para listar proveedores
    const [categorias, setCategorias] = useState ([]);
    const [categoria, setCategoria] = useState([]);

    useEffect(() => {
        cargarCategorias();
       
    },[]);

    const cargarCategorias = async () => {
            await request(
                "GET",
                "/categorias"
            ).then((response) => {
                console.log(response);
                setCategorias(response.data);
    
            }).catch((error) => {
                console.log(error);
            })
        
    }

    const cargarCategoria = async (id) => {
        //const resultado = await axios.get(`${urlBase}/${id}`);
       // setEmpleado(resultado.data);

       await request(
           "GET",
           `categoria/${id}`,
       ).then((response) => {
           console.log(response);
           setCategoria(response.data);
           console.log(categoria);

       }).catch((error) => {
           console.log(error);
       })
   }

    const editarCategoria = async (id) =>{
        // await axios.delete(`${urlBase}/${id}`);
        // cargarEmpleados();
        cargarCategoria(id);
      
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
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add-categoria">
                                        <i class="fas fa-solid fa-plus"></i> Agregar Categoria
                                    </button>
                                </div>

                            </div>
                            
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example1" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th> 
                                    <th></th>                           
                                </tr>
                            </thead>
                            <tbody>
                                
                            {categorias.map((categoria, indice) => (
                                <tr key={indice}>
                                    <td>{categoria.nombreCategoria}</td>
                                    <td>{categoria.descripcionCategoria}</td>
                                    <td>
                                        <button type="button" class="btn btn-inline-block btn-warning btn-sm mr-2" data-toggle="modal"data-target="#modal-edit-categoria" onClick={()=>editarCategoria(categoria.idCategoria)} ><i class="fas far fa-edit"></i></button>
                                        {/* <button type="button" class="btn btn-inline-block btn-danger btn-sm"><i class="fas fa-trash"></i></button> */}
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

            <ModalAgregarCategoria cargarCategorias={cargarCategorias} />

            <ModalEditarCategoria categoria={categoria} cargarCategorias={cargarCategorias} />
        </div>
    )
}
