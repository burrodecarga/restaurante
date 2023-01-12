import React, { useContext, useEffect, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import PedidoContext from '../context/pedidos/pedidosContext'
import {useNavigation} from '@react-navigation/native'


import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body
} from 'native-base'
import globalStyles from '../styles/global'

const Menu = () => {

  const { menu, obtenerProductos } = useContext(FirebaseContext)
  const {seleccionarPlatillo} = useContext(PedidoContext)

  //para redireccionar

  const navigation = useNavigation()

  useEffect(() => {
    obtenerProductos()
  }, [])

  const mostrarHeading = (categoria, i) => {
    const categoriaAnterior = menu[i - 1]
    if (i > 0) {
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </Separator>
        )
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      )
    }
  }

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <Text style={styles.titulo}>Listado de Productos</Text>
        <List>
          {menu.map((platillo, i) => {
            const { imagen, nombre, descripcion, categoria, precio, id } = platillo

            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                onPress={()=>{
                  //Eliminar existencia del platillo
                  //const {existencia, ...platillo2} = platillo
                  seleccionarPlatillo(platillo)
                  navigation.navigate('DetallePlatillo')
                }}
                >
                  <Thumbnail large square source={{ uri: imagen }} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note numberOfLines={3}>
                      {descripcion}
                    </Text>
                    <Text>Precio :{precio} $</Text>
                  </Body>
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000'
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold'
  },
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold'
  }

})

export default Menu
