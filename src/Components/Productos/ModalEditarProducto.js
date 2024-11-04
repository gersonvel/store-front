import React, {  useState, useEffect  } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';

export default function ModalEditarProducto(props) {
    
    //useState para guardar el proveedor
    const [productoEdit, setProductoEdit] = useState([]);
    const [proveedores, setProveedores] = useState ([]);
    const [categorias, setCategorias] =useState([]);

    useEffect(() => {
        setProductoEdit(props.producto);
        cargarProveedores();
        cargarCategorias();
        // console.log(productoEdit.proveedor.idProveedor);
    },[props.producto]);




    //inicializar varibles 
    const{idProducto,nombreProducto,statusProducto, idProveedor,idCategoria} = productoEdit;

    // const onInputChange = (e) => {
    //     //spread operator ...(expandir los eventos)
    //     setProductoEdit({...productoEdit,[e.target.name]: e.target.value});
    //     console.log(productoEdit);

    // }

    const onInputChange = (e) => {
        const { name, value } = e.target;
    
        // Si estás actualizando el idProveedor, puedes hacer algo como esto:
        if (name === 'idProveedor') {
            setProductoEdit(prevProductoEdit => ({
                ...prevProductoEdit,
                proveedor: {
                    ...prevProductoEdit.proveedor,
                    idProveedor: value
                }
            }));
        }else if(name === 'idCategoria') {
            setProductoEdit(prevProductoEdit => ({
                ...prevProductoEdit,
                categoria: {
                    ...prevProductoEdit.categoria,
                    idCategoria: value
                }
            }));
        }
        else {
            setProductoEdit(prevProductoEdit => ({
                ...prevProductoEdit,
                [name]: value
            }));
        }

        console.log(productoEdit);
    };


    const onCheckChange = (e) => {
        //spread operator ...(expandir los eventos)
        const status = e.target.checked === true ? 1 : 0;
        setProductoEdit({...productoEdit,statusProducto: status});
    }


    const onSubmit = async (e,id) => {
        e.preventDefault();
       
        await request(
            "PUT",
            `producto/${id}`,
            productoEdit
        ).then((response) => {
            console.log(response);
            props.cargarProductos();
            setProductoEdit([]);
            //Proveedor Editado
            Toast.fire({
                icon: 'success',
                title: 'Producto editado correctamente.'
            })
            document.querySelector('.close-modal-edit').click();

        }).catch((error) => {
            console.log(error);
        })
    }
    
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
   

    //Sweet alert configuration
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    
  return (
    <div className="modal fade" id="modal-edit-producto">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => onSubmit(e,idProducto)}>
                        <div className="modal-header">
                            <h4 className="modal-title">Editar Producto</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">                            
                            <div className="mb-3">
                                <label htmlFor="nombreProducto" className="form-label">Nombre </label>
                                <input type="text" className="form-control" id="nombreProducto" name="nombreProducto" required={true} value={nombreProducto || ''} onChange={(e)=>onInputChange(e)}/>
                            </div>

                            <div class="form-group">
                                <label>Proveedor </label>
                                <select class="form-control" style={{width: '100%'}} id="idProveedor" name="idProveedor" required={true} value={idProveedor} onChange={(e)=>onInputChange(e)}>
                                <option>Selecciona un Proveedor</option>
                                {proveedores.map((proveedor, indice) => (
                                    <option key={indice} value={proveedor.idProveedor} selected={productoEdit?.proveedor?.idProveedor === proveedor.idProveedor}>{proveedor.nombreProveedor}</option>
                                ))}
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Categoria </label>
                                <select class="form-control" style={{width: '100%'}} id="idCategoria" name="idCategoria" required={true} value={idCategoria} onChange={(e)=>onInputChange(e)}>
                                <option>Selecciona un Proveedor</option>
                                {categorias.map((categoria, indice) => (
                                    <option key={indice} value={categoria.idCategoria} selected={productoEdit?.categoria?.idCategoria === categoria.idCategoria}>{categoria.nombreCategoria}</option>
                                ))}
                                </select>
                            </div>
                            

                            <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                <input type="checkbox" class="custom-control-input" id="statusProductoEdit" name="statusProducto" checked={statusProducto == 1 }  onChange={(e)=>onCheckChange(e)}/>
                                <label class="custom-control-label" htmlFor="statusProductoEdit">{statusProducto == 1 ? 'Habilitado' : 'Deshabilitado'}</label>
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
