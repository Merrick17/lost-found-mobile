import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import 'react-native-gesture-handler';
import Login from './screens/Login';
import Main from './screens/Main';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
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


  )
}

export default App

