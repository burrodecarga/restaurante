import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import NuevaOrden from './Views/NuevaOrden'
import Menu from './Views/Menu'
import DetallePlatillo from './Views/DetallePlatillo'
import FormularioPlatillo from './Views/FormularioPlatillo'
import ProgresoPedido from './Views/ProgresoPedido'
import ResumenPedido from './Views/ResumenPedido'

// importar state del context

import FirebaseState from './context/firebase/firebaseState'
import PedidoState from './context/pedidos/pedidosState'

import BotonResumen from './components/ui/BotonResumen'

const Stack = createStackNavigator()

const App = () => {
  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...'])

  // Ignore all log notifications:
  //LogBox.ignoreAllLogs()

  LogBox.ignoreLogs(['Remote debugger'])

  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}>
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden'
                }}
              />

              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Menu',
                  headerRight:props=><BotonResumen/>
                }}
              />

              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: 'Detalle Platillo'
                }}
              />

              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: 'Formulario de Platillo'
                }}
              />

              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Progreso Pedido'
                }}
              />

              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen Pedido'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  )
}

const styles = StyleSheet.create({
  page: {
    fontSize: 20
  }
})

export default App
