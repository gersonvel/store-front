import React, { useState } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';



export default function ModalAgregarCategoria(props) {


    const initialCategoriaState = {
        nombreCategoria:"",
        descripcionCategoria:""
    }
    
    //useState para guardar la categoria
    const [categoria, setCategoria] = useState(initialCategoriaState);

    //inicializar varibles 
    const{nombreCategoria,descripcionCategoria} = categoria;

    const onInputChange = (e) => {
        //spread operator ...(expandir los eventos)
        setCategoria({...categoria,[e.target.name]: e.target.value});

    }


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(categoria);
        await request(
            "POST",
            "/categoria",
            categoria
        ).then((response) => {
            console.log(response);
            props.cargarCategorias();
            setCategoria(initialCategoriaState);
            Toast.fire({
                icon: 'success',
                title: 'Categoria creada correctamente.'
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
    <div className="modal fade" id="modal-add-categoria">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="modal-header">
                            <h4 className="modal-title">Registrar Categoria</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">                            
                            <div className="mb-3">
                                <label htmlFor="nombreCategoria" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombreCategoria" name="nombreCategoria" required={true} value={nombreCategoria} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcionCategoria" className="form-label">Descripción</label>
                                <input type="text" className="form-control" id="descripcionCategoria" name="descripcionCategoria" value={descripcionCategoria} onChange={(e) => onInputChange(e)}/>
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
