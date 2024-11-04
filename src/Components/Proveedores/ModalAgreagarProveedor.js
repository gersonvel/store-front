import React, { useState } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';
import $ from 'jquery'; 




export default function ModalAgreagarProveedor(props) {


    const initialProveedorState = {
        nombreProveedor:"",
        direccionProveedor:"",
        telefonoProveedor:""
    }
    
    //useState para guardar el proveedor
    const [proveedor, setProveedor] = useState(initialProveedorState);

    //inicializar varibles 
    const{nombreProveedor,direccionProveedor,telefonoProveedor} = proveedor;

    const onInputChange = (e) => {
        //spread operator ...(expandir los eventos)
        setProveedor({...proveedor,[e.target.name]: e.target.value});

    }


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(proveedor);
        await request(
            "POST",
            "/proveedor",
            proveedor
        ).then((response) => {
            console.log(response);
            props.cargarProveedores();
            setProveedor(initialProveedorState);
            //Proveedor Creado
            Toast.fire({
                icon: 'success',
                title: 'Proveedor creado correctamente.'
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
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="modal-header">
                            <h4 className="modal-title">Registrar Proveedor</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">                            
                            <div className="mb-3">
                                <label htmlFor="nombreProveedor" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombreProveedor" name="nombreProveedor" required={true} value={nombreProveedor} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="direccionProveedor" className="form-label">Dirección</label>
                                <input type="text" className="form-control" id="direccionProveedor" name="direccionProveedor" value={direccionProveedor} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefonoProveedor" className="form-label">Teléfono</label>
                                <input type="number" step="any" className="form-control" id="telefonoProveedor" name="telefonoProveedor" value={telefonoProveedor} onChange={(e) => onInputChange(e)}/>
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
