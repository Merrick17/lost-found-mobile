import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import 'react-native-gesture-handler';
import Login from './screens/Login';
import Main from './screens/Main';
import Register from './screens/Register';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <SheetProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Main' component={Main} />
          </Stack.Navigator>

        </NavigationContainer>
      </SheetProvider>

    </Provider>


  )
}

export default App

