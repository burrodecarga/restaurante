import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/Orden';

const Ordenes = () => {

  
  // context con las operaciones de firebaseContext

  const {firebase} =useContext(FirebaseContext)
  const [ordenes, setOrdenes] = useState([])

  useEffect(() =>{
    const obtenerOrdenes =()=>{
      const ordenes = firebase.db.collection('ordenes')
           .where('completado','==',false).onSnapshot(manejarSnapshot)
    }
    obtenerOrdenes()
  },[])


  function manejarSnapshot(snaptshot){
    const ordenes = snaptshot.docs.map(doc=>{
      return{
        id:doc.id,
        ...doc.data()
      }

     
    }) 
    setOrdenes(ordenes)
  }
  return (
    <>
    {
      ordenes.map(orden=>(<Orden key={orden.id} orden={orden}/>))
    }
    </>
  )
}
 
export default Ordenes;