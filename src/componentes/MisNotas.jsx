import { NotaPersonal } from "./NotaPersonal";
import { useState, useRef } from "react"; //useState y useRef: Hooks de React para manejar el estado y referencias.
import { v4 as uuid } from "uuid";

//Definición del Componente MyPlaylist: UNA FUNCION GRANDE QUE TIENE TODOS LOS CRUD
// Agregar , Listar , Actulizar , Borrar
export function MisNotas() {
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();
    const [mensaje, setMensaje] = useState(""); //useSatate = Valor Inicial

    function AgregarNota() {
        console.log('Presionando boton agregar'); //Captura de la funcion
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value; 
        const importante = importanteRef.current.checked; //Al ser un checked siempre devolvera solo TRUE o FALSE = (BOOLEANOS)

        if (descripcion === "") {

            setMensaje("El campo descripción es obligatorio");
            setTimeout(() => {
                setMensaje('');
            }, 2000);

        } else {
            const nota = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importante: importante
            }
            const nuevaNota = [...notaPredeterminada, nota]; //Hace una copia de defaultPlaylist
            // La Lista Original y le agrega EL DOCUMENTO = song
            cambiarNota(nuevaNota); //Y Se lo agrega a la lista Original
            alert('Nota Agregada'); //Mensaje de alerta de Se agrego cancion
        }

        tituloRef.current.value = '';
        descripcionRef.current.value = '';
        importanteRef.current.checked = false;
    }

    function EliminarNota(id) {
        console.log("Presionando boton de eliminar");
        const nuevaNota_2 = notaPredeterminada.filter(i => i.id !== id) //Estrictamente contrario
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
                { // Abrimos llaves para iniciar logica de programacion
                    // IMPORTANTE PORQUE HACE QUE LAS COSAS SE MUESTREN POR PANTALLA
                    notaPredeterminada.map(function (i) {
                        return <NotaPersonal key={i.id} nota={i} EliminarNota={EliminarNota}/>
                    })
                }
            </div>
        </div>
    );
}