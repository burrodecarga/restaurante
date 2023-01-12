import React,{useState,useContext} from 'react'
import {FirebaseContext} from '../../firebase'

export default function Orden({orden}) {

  const [tiempoDeEntrega, setTiempoDeEntrega] = useState(0)
  const {firebase} = useContext(FirebaseContext)

  const definirTiempo = id=>{
   try {
     firebase.db.collection('ordenes').doc(id).update({tiempoEntrega:tiempoDeEntrega})
   } catch (error) {
     console.log(error)
     
   }
  }

  const completarOrden = id=>{
    try {
      firebase.db.collection('ordenes').doc(id).update({completado:true})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-500 text-lg font-bold">{orden.id}</h1>
        {
          orden.orden.map(platillos=>(
            <p className="text-gray-600">{platillos.cantidad} {platillos.nombre}</p>
          ))
        }
        <p className="text-gray-700 font-bold">Total a pagar: $ {orden.total}</p>

        {orden.tiempoEntrega === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm text-bold mb-2">
            tiempo de entrega
            </label>
            <input type="text" 
            type="number" 
            className="shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
            min="0"
            placeholder="20"
            value={tiempoDeEntrega}
            onChange={e=>setTiempoDeEntrega(parseInt(e.target.value))}
            />
            <button
            onClick={()=>definirTiempo(orden.id)}
            type="submit"
            className="bg-gray-700 hover:bg-gray-900 w-full text-white mt-3 uppercase font-bold"
            >definir tiempo</button>
          </div>
        )}
        {
          !orden.completado && orden.tiempoEntrega>0 && (<button
          type="button"
          className="bg-blue-700 text-white w-full hover:bg-blue-900 mt-5 p-2 uppercase font-bold"
          onClick={ () => completarOrden( orden.id )}
          >
            Marcar como Lista
          </button>)
        }
      </div>
    </div>
  )
}


