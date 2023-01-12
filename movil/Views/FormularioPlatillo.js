import React, { useContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Text,
  Col,
  Button,
  Footer,
  FooterTab
} from 'native-base'

const FormularioPlatillo = () => {
  const [cantidad, setCantidad] = useState(1)
  const [total, setTotal] = useState(0)

  const { platillo, guardarPedido } = useContext(PedidoContext)

  const { precio } = platillo

  const calcularTotal = () => {
    const totalPagar = precio * cantidad
    setTotal(totalPagar)
  }

  const navigation = useNavigation()

  useEffect(() => {
    calcularTotal()
  }, [cantidad])

  const confirmarOrden = () => {
    Alert.alert(
      'Desea confirmar Pedido ?',
      'Un pedido confirmado no se puede modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
          // crear pedido
            const pedido = {
              ...platillo,
              cantidad,
              total
            }

            console.log(pedido)
            guardarPedido(pedido)

            // redireccionar pedido
            navigation.navigate('ResumenPedido')
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1
      setCantidad(nuevaCantidad)
    }
  }

  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1
    setCantidad(nuevaCantidad)
  }

  return (
    <Container>
      <Content style={globalStyles.centrado}>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid style={globalStyles.grid}>
            <Col><Button
            style={globalStyles.gridBoton}
            onPress={() => decrementarUno()}
            ><Icon name="remove"/></Button></Col>
            <Col><Input style={globalStyles.gridInput}
            keyboardType="numeric"
            value={cantidad.toString()}
            onChangeText={cantidad => setCantidad(cantidad)}
            /></Col>
            <Col><Button style={globalStyles.gridBoton}
             onPress={() => incrementarUno()}
            ><Icon name="add"/></Button></Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Sub-Total: {total} $</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button
          style={globalStyles.boton}
          onPress={() => confirmarOrden()}
          >
            <Text style={globalStyles.botonTexto}>Agregar a Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default FormularioPlatillo
