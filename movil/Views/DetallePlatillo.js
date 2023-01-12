import React, { useContext } from 'react'
import { Image } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  Card,
  CardItem,
  H1
} from 'native-base'

const DetallePlatillo = () => {
  const { platillo } = useContext(PedidoContext)
  const { imagen, descripcion, precio, nombre } = platillo

  // console.log('Desde Detalle Pedido ')

  const navigation = useNavigation()

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image source={{ uri: imagen }} style={globalStyles.imagen}/>
             <Text style={{ marginTop: 20 }} >{descripcion}</Text>
             <Text style={globalStyles.cantidad}>precio: {precio} $</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button
          style={globalStyles.boton}
          onPress={() => navigation.navigate('FormularioPlatillo')}
          >
            <Text style={globalStyles.botonTexto}>Ordenar Producto</Text>
          </Button>

        </FooterTab>
      </Footer>
    </Container>
  )
}

export default DetallePlatillo
