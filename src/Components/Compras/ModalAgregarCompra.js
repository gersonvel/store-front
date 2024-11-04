import React, { useState, useEffect } from 'react'
import { request } from '../../axios_helper';
import Swal from 'sweetalert2';

const useStyles = ((theme) => ({
    total: {
        color: 'green',
        fontSize: '23px',
        
    },
}));




export default function ModalAgregarCompra(props) {

 
    const estilos = useStyles();
    const LOCAL_STORAGE_KEY = 'detallesCompra.productos';

    const initialCompraState = {
        idProveedor: "",
        montoCompra: "",
        detalleCompra: {}
    }

    const initialDetallecompra = {
        cantidad: "",
        precio_unitario: "",
        total: "",
        id_compra: "",
        id_producto: "",
        id_proveedor: ""
    }

    //useState para guardar el proveedor
    // const [producto, setProducto] = useState(initialProductoState);
    const [productos, setProductos] =useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [imagenProducto, setImagenProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [isDisabledProve, setIsDisabledProve] = useState(false);

    const [compra, setCompra] = useState(initialCompraState);
    //este sera un array de objetos
    const [detalleCompra, setDetalleCompra] = useState([initialDetallecompra]);

    const [productosFiltrados, setProductosFiltrados] = useState();

    // //useState para guardar el proveedor
    // const [proveedor, setProveedor] = useState(initialProveedorState);

    // //inicializar varibles Compra
    const { idProveedor, monto } = compra;

    //inicializar varibles  detalle compra
    const { cantidad, precio_unitario, id_proveedor,total } = detalleCompra;
    

    //const [proveedorSelect, setProveedorSelect] = useState();

    useEffect(() => {
        cargarProveedores();
    }, [])

    useEffect(() => {
        const storedDetalleCompra = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedDetalleCompra) setDetalleCompra(storedDetalleCompra)
    }, [])

    

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(detalleCompra))
    }, [detalleCompra])

    useEffect(() => {
        const savedProveedor = localStorage.getItem('id_proveedor');
        if (savedProveedor) {
            setCompra({ ...compra, idProveedor: savedProveedor});
            setIsDisabledProve(true);
            cargarProductosPorProveedor(savedProveedor);
        }
    },[])


    useEffect(() => {
        setCompra(prevCompra => ({ ...prevCompra, montoCompra: calcularTotal(), detalles: detalleCompra }));
    }, [detalleCompra]);

    

    const handleAddItems = () => {

        //Ejmeplos para hacer filter pero no lo utilice mejor solo bloquee los porductos

        // Obtener un array con los IDs de los productos en detalleProductos
        const idsDetalleProductos = detalleCompra.map((detalle) => parseInt(detalle.id_producto));

        console.log(idsDetalleProductos)

        // Filtrar productos para excluir aquellos cuyos ID están en detalleProductos
        const filtradoProductos = productos.filter(
            (producto) => !idsDetalleProductos.includes(producto.idProducto)
        );

       // console.log(filtradoProductos)
        //console.log("productos filtrados ", filtradoProductos);

        //setProductosFiltrados(productos);

        //console.log(productosFiltrados.length)

        if(filtradoProductos.length > 0 && productos.length > detalleCompra.length){
            const newDetalleCompraItem = {
                ...initialDetallecompra,
                id_proveedor: compra.idProveedor
            };
        
            // Agregamos el nuevo elemento al estado detalleCompra
            setDetalleCompra([...detalleCompra, newDetalleCompraItem]);
    
        }

     
        console.log("detalle compra ", detalleCompra)
     
        console.log("productos" , productos)


       
    };

    const handleInputChange = (index, field, value) => {
        let total;//se crea la variable para contener el total
        const newDetallecompra = [...detalleCompra]; // se crea el nuevo json a setear
        newDetallecompra[index][field] = value; // index es el indice el objeto en el array, field es el nombre del campo, y value el valor del contenido     
        
        console.log("aqui")
        console.log(field)

        //validacion para saber por que se va a multiolicar
        if(field == 'cantidad'){
            
            total = value * detalleCompra[index].precio_unitario;    
            
        }else if(field == 'precio_unitario'){

            total = value * detalleCompra[index].cantidad;           
        }

        if(field !== 'id_producto')  newDetallecompra[index].total = total;
        //se agrega el valor del total
        
        //se setea al esdtado
        setDetalleCompra(newDetallecompra);
       
    };

    const calcularTotal = () => {
        const sumaTotal = detalleCompra.reduce((acc, item) => acc + item.total, 0);        
        return isNaN(sumaTotal) ? 0 : sumaTotal;
      };

    const handleDeleteItems = (index) => {
        const newDetallecompra = [...detalleCompra];
        newDetallecompra.splice(index, 1);
        setDetalleCompra(newDetallecompra);
    };

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

    //get productos
    const cargarProductosPorProveedor = async (idProv) => {
        await request(
            "GET",
            `/producto/proveedor/${idProv}`
        ).then((response) =>{
            setProductos(response.data);  

            if(response.data){
               
                setIsDisabledProve(true);
                   
            }
            
            console.log(response.data)
            
        }).catch((error) => {
            console.log(error);
            setProductos([]);
            /*Toast.fire({
                icon: 'info',
                title: 'No hay prodcutos del proveedor seleccionado.'
            })*/

                
        })
    }


    const onInputChange = (e) => {
        //spread operator ...(expandir los eventos)

        console.log(e.target.value)
       // if(e.target.value || e.target.value !== ""){

        setCompra({ ...compra, [e.target.name]: e.target.value });

        //console.log(idProveedor)
        actualizarIdProveedorEnDetallecompra(e.target.value);
        cargarProductosPorProveedor(e.target.value);
        
        //setProveedorSelect(e.target.value);
        localStorage.setItem('id_proveedor', e.target.value);
        

       // }
        
 

        
    }


    const actualizarIdProveedorEnDetallecompra = (newIdProveedor) => {
        const updatedDetalleCompra = detalleCompra.map(detalle => ({
            ...detalle,
            id_proveedor: newIdProveedor
        }));
        // Actualiza el estado de detalleCompra con los valores actualizados
        setDetalleCompra(updatedDetalleCompra);
    }


    const habilitarSelectProveedor = () => {

        Swal.fire({
            title: "Estas seguro?",
            text: "Si cambias el proveedor se eliminaran los productos que has seleccionado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
          }).then((result) => {
            if (result.isConfirmed) {

                setIsDisabledProve(false)
                setDetalleCompra([])
              /*Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });*/
            }
          });

       
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //console.log(detalleCompra)
        //console.log(idProveedor)
        //console.log(compra)

        Swal.fire({
            title: "Compra.",
            text: "Se va a realizar la compra y ya no se podra modificar esta compra, estas seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
          }).then((result) => {
            if (result.isConfirmed) {

                reaslizarCompra();
             
            }
          });
      
         
    }

    const reaslizarCompra = async (e) => {

        await request(
            "POST",
            "/compra",
            compra
        ).then((response) => {
           console.log("Response compra ", response);
            console.log(response);             
            //setCompra(initialCompraState);
            //Proveedor Creado
            setIsDisabledProve(false)
            setDetalleCompra([])
            props.cargarCompras();
            setCompra(initialCompraState);
            localStorage.removeItem('id_proveedor');
            
            Toast.fire({
                icon: 'success',
                title: 'Compra  creado correctamente.'
            })
            document.querySelector('.close-modal').click();

        }).catch((error) => {
            console.log(error);

            Toast.fire({
                icon: 'error',
                title: 'Hubo un error al realizare la compra, contacte a servicio tecnico.'
            })
        })

    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    return (
        <div className="modal fade" id="modal-add-compra">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="modal-header">
                            <h4 className="modal-title">Registrar Compra</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <div class="form-group">
                                <label>Proveedor</label>
                                <select class="form-control" style={{ width: '100%' }} id="idProveedor" name="idProveedor" required={true} value={idProveedor} onChange={(e) => onInputChange(e)} disabled={isDisabledProve}>
                                    <option key="proveedor" value="">Selecciona un Proveedor</option>
                                    {proveedores.map((proveedor, indice) => (
                                        <option key={indice} value={proveedor.idProveedor}>{proveedor.nombreProveedor}</option>
                                    ))}
                                </select>
                                <br/>
                                {isDisabledProve && <button type="button" class="btn btn-primary" onClick={habilitarSelectProveedor} >Cambiar proveedor</button> }
                                

                            </div>

                            {
                            isDisabledProve &&
                            <div className='mb-3 row'>
                                <div className='col-md-3 col-sm-12'>
                                    <button type="button" class="btn bg-gradient-success" onClick={handleAddItems} style={{ borderRadius: '50%' }}><i class="fas fa-plus-circle"></i></button>
                                </div>
                            </div>
                            }

                            {detalleCompra.map((item, index) => (
                                <div key={index}>
                                    <div className='row'>

                                    <div className="mb-3 col-sm-5">
                                        <label htmlFor="id_producto" className="form-label">Producto</label>
                                        <select className="form-control" id="id_producto" name="id_producto" required={true} value={item.id_producto} onChange={(e) => handleInputChange(index, 'id_producto', e.target.value)}>
                                            <option>Selecciona un Producto</option>
                                       

                                            {/*productos
                                            
                                           /*.filter((producto) => 
                                                !detalleCompra.some((item) => parseInt(item.id_producto) === producto.idProducto)
                                            )
                                            .map((producto, indice) => (
                                                
                                                <option key={indice} value={ producto.idProducto}>{producto.nombreProducto}</option>
                                            ))*/}

                                            {productos.map((producto, indice) => {
                                                const isSelected = detalleCompra.some((item) => parseInt(item.id_producto) === producto.idProducto)
                                                return (
                                                    <option key={indice} value={producto.idProducto} disabled={isSelected}>
                                                        {producto.nombreProducto} 
                                                    </option>
                                                );
                                            })}



                                            
                                        </select>
                                        </div>

                                      {/*  <div className="mb-3 col-sm-3">
                                            <label htmlFor="id_producto" className="form-label">Producto</label>
                                            <input type="number" className="form-control" id="id_producto" name="id_producto" min="1" required={true} value={item.id_producto} onChange={(e) => handleInputChange(index, 'id_producto', e.target.value)} />
                                        </div>*/}
                                        
                                        <div className="mb-3 col-sm-2">
                                            <label htmlFor={`cantidad_${index}`} className="form-label">Cantidad</label>
                                            <input type="number" className="form-control" id={`cantidad_${index}`} name="cantidad" min="1" required={true} value={item.cantidad} onChange={(e) => handleInputChange(index, 'cantidad', e.target.value)} />
                                        </div>

                                        <div className="mb-3 col-sm-2">
                                            <label htmlFor={`precio_unitario${index}`} className="form-label">Precio</label>
                                            <input type="number" className="form-control" id={`precio_unitario${index}`} name="precio_unitario" step="0.01" min="1" required={true} value={item.precio_unitario} onChange={(e) => handleInputChange(index, 'precio_unitario', e.target.value)} />
                                        </div>

                                        <div className="mb-3 col-sm-2">
                                            <label htmlFor={`total_${index}`} className="form-label">Total</label>
                                            <input type="number" className="form-control"  id={`total_${index}`} name="total" step="0.01" min="1" required={true} value={item.total} onChange={(e) => handleInputChange(index, 'total', e.target.value)} readOnly/>
                                        </div>

                                        <div className="mb-3 col-sm-1">
                                            <button className='btn btn-sm btn-danger' style={{ marginTop: '40px' }} onClick={() => handleDeleteItems(index)}><i class="fas fa-trash-alt"></i></button>
                                        </div>


                                    </div>

                                </div>
                            ))}

                            <div className='row d-flex justify-content-end pl-4 pr-4'>
                                <div className=''>
                                    <span style={estilos.total}>Total : $ {calcularTotal()} </span>
                                </div>
                            </div>

                            

                            {/*<pre>{JSON.stringify(detalleCompra, null, 2)}</pre>*/}

                            {/* <div className="mb-3">
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
                            </div> */}

                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default close-modal" data-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
