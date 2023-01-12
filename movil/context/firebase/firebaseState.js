/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react'
import firebase from '../../firebase/index'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

import { OBTENER_PRODUCTOS_EXITO } from '../../types/index'

import _ from 'lodash'

const FirebaseState = props => {
  console.log(firebase, 'XXXXXX')
  const initialState = { menu: [] }

  // useReduce con dispacht para ejecutar funciones para

  const [state, dispatch] = useReducer(FirebaseReducer, initialState)

  // obtener los Productos

  const obtenerProductos = () => {
    console.log('Desde Firbase Estate')

    // obtener productos de firebaseContext
    firebase.db
      .collection('productos')
      .where('existencia', '==', true)
      .onSnapshot(manejarSnapshot)

    function manejarSnapshot (datos) {
      let platillos = datos.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      console.log('NNNNN',platillos,'MMMM')
      platillos = _.sortBy(platillos,'categoria')

      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos
      })
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos
      }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseState
