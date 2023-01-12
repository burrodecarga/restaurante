import React, {useContext, useRef} from "react"
import { FirebaseContext } from '../../firebase/index'

const Platillo = ({ platillo }) => {
  // existencia ref para acceder al valor
  const existenciaRef  = useRef(platillo.existencia)

  // contrex de firebase para actualizar datos 

  const {firebase} = useContext(FirebaseContext)

  const {id,imagen,nombre,existencia,categoria,precio,descripcion} = platillo

  const disponibilidad = ()=>{
    const existencia = (existenciaRef.current.value==='true')
    try {
    firebase.db.collection('productos').doc(id).update({existencia: existencia}) 
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='w-full px-3 mb-4 my-4'>
      <div className='p-5 shadow-md bg-white'>
        <div className='lg:flex'>
          <div className='lg:w-5/12 xl:w-3/12'>
            <img src={imagen} alt={nombre} />
            <div className='sm:flex sm:mx-2'>
              <label className='block mt-5 sm:w-2/4'><span className='block text-gray-800 mb-2'>Existencia</span> 
              <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-sm'
              value={existencia}
              ref={existenciaRef}
              onChange={()=>disponibilidad()}>
                <option value="true">Disponible</option>
                <option value="false">No disponible</option>
              </select></label>
            </div>
            </div>
          <div className='lg:w-7/12 xl:w-9/12 pl-4'>
            <p className='font-bold text-2xl text-yellow-500 mb-4'>{nombre}</p>
            <p className='text-gray-700 mb-4'>categoria:{' '}
            <span className='text-gray-600 mb-4 font-bold'>{categoria.toUpperCase()}</span></p>
            <p className='text-gray-700 mb-4'>descripcion:{' '}
            <span className='text-gray-600 mb-4 font-bold'>{descripcion}</span></p>
            <p className='text-gray-700 mb-4'>precio:{' '}
            <span className='text-gray-600 mb-4 font-bold'>{precio} $</span></p>
            </div>          
        </div>
      </div>
    </div>
  )
}

export default Platillo
