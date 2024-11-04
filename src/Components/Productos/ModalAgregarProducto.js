import React, { useEffect, useState } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';
import $ from 'jquery'; 

export default function ModalAgregarProducto(props) {


    const initialProductoState = {
        nombreProducto:"",
        statusProducto: 0,
        idProveedor: "",
        idCategoria: ""
    }
    
    //useState para guardar el proveedor
    const [producto, setProducto] = useState(initialProductoState);
    const [proveedores, setProveedores] = useState ([]);
    const [imagenProducto, setImagenProducto] = useState(null);
    const [categorias, setCategorias] =useState([]);
    

    //inicializar varibles 
    const{nombreProducto,statusProducto,idProveedor, imgenProducto, idCategoria, precioProducto, stockProducto} = producto;

    useEffect(() => {
        cargarProveedores();
        cargarCategorias();
    },[])

    

    const onInputChange = (e) => {
        //spread operator ...(expandir los eventos)
        setProducto({...producto,[e.target.name]: e.target.value});

    }

    const onCheckChange = (e) => {
        //spread operator ...(expandir los eventos)
        const status = e.target.checked === true ? 1 : 0;
        setProducto({...producto,statusProducto: status});
    }


    //Get Proveedores
    const cargarProveedores = async () => {
            await request(
                "GET",
                "/proveedores"
            ).then((response) => {
                setProveedores(response.data);
            }).catch((error) => {
                console.log(error);
            })
        
    }

    const cargarCategorias = async () => {
        await request(
            "GET",
            "/categorias"
        ).then((response) => {
            setCategorias(response.data);
        }).catch((error) => {
            console.log(error);
        })
    
    }

    const selectImagen = (e) => {
        console.log(e.target.files);
        setImagenProducto(e.target.files[0]);
        

    }
    

    const onSubmit = async (e) => {
        
        e.preventDefault();
        console.log(producto);
        // console.log(imagenProducto);
        const formData = new FormData();
        formData.append('producto', JSON.stringify(producto));
        formData.append('imagenProducto', imagenProducto);

     
        console.log(producto.idProveedor)
        await request(
            "POST",
            `producto/${producto.idProveedor}/${producto.idCategoria}`,
            formData
        ).then((response) => {
            console.log(response);
            props.cargarProductos();
            setProducto(initialProductoState);
            //Proveedor Creado
            Toast.fire({
                icon: 'success',
                title: 'Producto creado correctamente.'
            })
            document.querySelector('.close-modal').click();

        }).catch((error) => {
            console.log(error);
        })
    }

    //Sweet alert configuration
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    
    
  return (
    <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                        <div className="modal-header">
                            <h4 className="modal-title">Registrar Producto</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">                            
                            <div className="mb-3">
                                <label htmlFor="nombreProducto" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombreProducto" name="nombreProducto" required={true} value={nombreProducto} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            
                            <div class="form-group">
                                <label>Proveedor</label>
                                <select class="form-control" style={{width: '100%'}} id="idProveedor" name="idProveedor" required={true} value={idProveedor} onChange={(e)=>onInputChange(e)}>
                                <option>Selecciona un Proveedor</option>
                                {proveedores.map((proveedor, indice) => (
                                    <option key={indice} value={proveedor.idProveedor}>{proveedor.nombreProveedor}</option>
                                ))}
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Categoria </label>
                                <select class="form-control" style={{width: '100%'}} id="idCategoria" name="idCategoria" required={true} value={idCategoria} onChange={(e)=>onInputChange(e)}>
                                <option>Selecciona una Categoria</option>
                                {categorias.map((categoria, indice) => (
                                    <option key={indice} value={categoria.idCategoria}>{categoria.nombreCategoria}</option>
                                ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="precioProducto" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="precioProducto" name="precioProducto" step="0.01" min="0.01" required={true} value={precioProducto} onChange={(e)=>onInputChange(e)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="stockProducto" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stockProducto" name="stockProducto" required={true} value={stockProducto} onChange={(e)=>onInputChange(e)}/>
                            </div>

                            <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                <input type="checkbox" class="custom-control-input" id="statusProducto" name="statusProducto"  onChange={(e)=>onCheckChange(e)}/>
                                <label class="custom-control-label" htmlFor="statusProducto">{producto.statusProducto === 1 ? 'Habilitado' : 'Deshabilitado'}</label>
                            </div>

                            <div class="form-group mt-3">
                                <div className="">
                                    <input type="file" className="" id="imagenProducto" name="imagenProducto" onChange={(e) => selectImagen(e)} />
                                    <label className="" htmlFor="imagenProducto"></label>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default close-modal" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
