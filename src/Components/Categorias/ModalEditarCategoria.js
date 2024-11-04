import React, {  useState, useEffect  } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';




export default function ModalEditarCategoria(props) {
    
    //useState para guardar el proveedor
    const [categoriaEdit, setCategoriaEdit] = useState([]);

    useEffect(() => {
        setCategoriaEdit(props.categoria);
    },[props.categoria]);

    //inicializar varibles 
    const{idCategoria,nombreCategoria,descripcionCategoria} = categoriaEdit;

    const onInputChange = (e) => {
        //spread operator ...(expandir los eventos)
        setCategoriaEdit({...categoriaEdit,[e.target.name]: e.target.value});
        console.log(categoriaEdit);

    }


    const onSubmit = async (e,id) => {
        e.preventDefault();
       
        await request(
            "PUT",
            `categoria/${id}`,
            categoriaEdit
        ).then((response) => {
            console.log(response);
            props.cargarCategorias();
            setCategoriaEdit([]);
            //Proveedor Editado
            Toast.fire({
                icon: 'success',
                title: 'Categoria editada correctamente.'
            })
            document.querySelector('.close-modal-edit').click();

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
    <div className="modal fade" id="modal-edit-categoria">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => onSubmit(e,idCategoria)}>
                        <div className="modal-header">
                            <h4 className="modal-title">Editar Categoria</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">                            
                            <div className="mb-3">
                                <label htmlFor="nombreCategoria" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombreCategoria" name="nombreCategoria" required={true} value={nombreCategoria || ''} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcionCategoria" className="form-label">Dirección</label>
                                <input type="text" className="form-control" id="descripcionCategoria" name="descripcionCategoria" value={descripcionCategoria || ''} onChange={(e) => onInputChange(e)}/>
                            </div>
                            
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default close-modal-edit" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
