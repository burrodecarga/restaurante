/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    marginHorizontal: '2.5%',
    flex: 1
  },
  boton: {
    backgroundColor: '#FFDA00',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30
  },
  imagen: {
    height: 150,
    width: '100%'
  },
  cantidad: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  grid: {
    textAlign: 'center',
    marginHorizontal: '2.5%'
  },
  gridBoton: {
    justifyContent: 'center',
    height: 80
  },
  gridInput: {
    fontSize: 20,
    textAlign: 'center',
  },
  centrado: {
    marginHorizontal: '2.5%',
    textAlign: 'center',
  },
  botonPrimaryText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#f7d954',
  },

  botonSuccess: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#355807',
  },
  botonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },

})

export default globalStyles
