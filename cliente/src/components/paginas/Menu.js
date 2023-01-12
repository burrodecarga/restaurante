import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Platillo from '../ui/Platillo'
import { FirebaseContext } from "../../firebase/index"

const Menu = () => {
  const [platillos, setPlatillos] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection("productos").onSnapshot(handleSnapshot)
    }
    obtenerPlatillos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSnapshot(snapshot) {
    const platillos = snapshot.docs.map(doc =>{
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setPlatillos(platillos)
  }

  return (
    <div className=''>
      <h1 className='text-3xl font-light mb-4'>Menu</h1>
      <Link
        to='/nuevo-platillo'
        className='font-bold uppercase bg-blue-800 mb-5 p-2 text-white hover:bg-blue-600'
      >
        Nuevo Platillo
      </Link>
     {platillos.map(platillo=><Platillo key={platillo.id} platillo={platillo}/>)}
    </div>
  )
}

export default Menu
