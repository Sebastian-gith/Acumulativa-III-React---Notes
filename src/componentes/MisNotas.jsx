import { NotaPersonal } from "./NotaPersonal"; /**
Aqui importo la funcion que sera la encargada de listar las notas
dependiendo de su estado de importante si el importante
es igual a true se mostraba la nota en color rojo y la 
nota no importante se imprimira con el color como medio amarillo */
import { useState, useRef } from "react"; /**
Aqui Use Ganchos para poder capturar o modificar un x elemento */
import { v4 as uuid } from "uuid"; /**
Aqui simplemente para ahorrarme el hecho de 
crear una llave primaria por ejemplo en versiones anteriores
de esta misma acumulativa yo use el titulo
como identificador primario con eso incluso
llego a funcionar todo, el borrar mas que nada
es una de las funciones principales de este
pequeño proyecto por lo cual para ahorrarme esos 
problemas mejor uso la biblioteca uuid donde para borrar
una nota filtro por id entonces por cada nota que yo ingrese 
se recibe una id la cual sera el identificador unico de cada nota 
lo cual facilita mucho mas el proyecto mas que nada podria estar
hablando mucho de este proyecto pero creo 
que la complejidad no era tan alta como pense. */

export function MisNotas() {
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();
    const [mensaje, setMensaje] = useState(""); 

    function AgregarNota() {
        console.log('Presionando boton agregar'); 
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value; 
        const importante = importanteRef.current.checked; 

        if (descripcion === "") {

            setMensaje("El campo descripción es obligatorio");
            setTimeout(() => {
                setMensaje('');
            }, 3000);

        } else {
            const nota = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importante: importante
            }
            const nuevaNota = [...notaPredeterminada, nota];
            cambiarNota(nuevaNota); 
            alert('Nota Agregada'); 
        }

        tituloRef.current.value = '';
        descripcionRef.current.value = '';
        importanteRef.current.checked = false;
    }

    function EliminarNota(id) {
        console.log("Presionando boton de eliminar");
        const nuevaNota_2 = notaPredeterminada.filter(i => i.id !== id) 
        cambiarNota(nuevaNota_2)
        alert("Nota Eliminada")
    }

    const [notaPredeterminada, cambiarNota] = useState([
        { id: uuid(), titulo: "Subir las notas" , descripcion: 'Antes de fin de semestre', importante: false },
        { id: uuid(), titulo: "Regar las plantas" , descripcion: 'Dia por medio', importante: true },
        { id: uuid(), titulo: "Renovar Tarjeta" , descripcion: 'Antes de fin de mes que se este por vencer', importante: false },
        { id: uuid(), titulo: "Cambiar Aceite Auto" , descripcion: 'Preguntar a mi viejo donde lo llevo', importante: false }
    ]);

    return (
        <div className='container'>
            <h1 className='title text-start mt-5'>Post It Simulator!</h1>
            <div className='d-flex align-items-center'>
                <input ref={tituloRef} type='text' className='form-control me-3 titulo' placeholder='Titulo'></input>
                <input ref={descripcionRef} type='text' className='form-control me-3 pdf' placeholder='Descripcion'></input>
                <div className='form-check'>
                    <input ref={importanteRef} className='form-check-input' type='checkbox' />
                    <label className='form-check-label white'> Importante! </label>
                </div>
                <button className='white gris' onClick={AgregarNota}>AGREGAR</button>
            </div>
            <span className="white centro"> {mensaje} </span>
            <div className="box">
                { 
                    notaPredeterminada.map(function (i) {
                    return <NotaPersonal key={i.id} nota={i} EliminarNota={EliminarNota}/>
                    })
                }
            </div>
        </div>
    );
}