import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'

import globalStyles from '../styles/global'

import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  Footer,
  FooterTab,
  H1
} from 'native-base'

const ResumenPedido = () => {
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext)
  const navigation = useNavigation()

  const calcularTotal = () => {
    let nuevoTotal = 0
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0
    )
    console.log('Nuevo total:' + nuevoTotal)
    mostrarResumen(nuevoTotal)
  }

  useEffect(() => {
    calcularTotal()
  }, [pedido])

  const ordenarPedido = () => {
    Alert.alert(
      'Desea confirmar ordenar el Pedido ?',
      'Un pedido confirmado no se puede modificar',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear objeto de pedido
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now()
            }
            console.log(pedidoObj)
            // Grabar en Firebase pedido
            try {
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
               pedidoRealizado(pedido.id)
              console.log(pedido)
            } catch (error) {
              console.log(error)
            }
            // Pedido realizado el
           
            // redireccionar pedido
            navigation.navigate('ProgresoPedido')
          }
        },
        {
          text: 'Revisar Orden',
          style: 'cancel'
        }
      ]
    )
  }

  const confirmarEliminar = id => {
    Alert.alert(
      'Desea eliminar este artículo ?',
      'Un pedido eliminado no se puede modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // eliminar del pedidosContext
            eliminarProducto(id)
            // calcular
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen de Pedido</H1>
        {pedido.map((platillo, i) => {
          const { cantidad, nombre, imagen, id, precio } = platillo
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{ uri: imagen }} />
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>cantidad: {cantidad}</Text>
                  <Text>precio: {precio} $</Text>
                  <Button full danger onPress={() => confirmarEliminar(id)}>
                    <Text>Eliminar</Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          )
        })}
        <Text style={globalStyles.cantidad}>Total a pagar:{total} $</Text>
        <Button
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate('Menu')}>
          <Text style={globalStyles.botonPrimaryText}>Seguir Pidiendo</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.botonSuccess}
            onPress={() => ordenarPedido()}>
            <Text style={globalStyles.botonPrimaryText}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default ResumenPedido
