import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Items from './main/Items';
import Messages from './main/Messages';
import MyItems from './main/MyItems';
import Profile from './main/Profile';
import DrawerContent from '../components/DrawerContent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CardDetails from './main/CardDetails';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryList} from '../redux/actions/category.actions';
import Conversations from './main/Conversations';
const Drawer = createDrawerNavigator();
const ItemStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const ItemsNavigator = () => {
  return (
    <ItemStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="itemsList">
      <ItemStack.Screen name="itemsList" component={Items} />
      <ItemStack.Screen name="details" component={CardDetails} />
    </ItemStack.Navigator>
  );
};
const MessagesNavigator = () => {
  return (
    <MessagesStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="messageList">
      <MessagesStack.Screen name="messageList" component={Messages} />
      <MessagesStack.Screen name="conversation" component={Conversations} />
    </MessagesStack.Navigator>
  );
};
const Main = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(({auth}: any) => auth);

  useEffect(() => {
    //@ts-ignore
    dispatch(getCategoryList(token));
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Items"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Items"
        options={{drawerLabel: 'Publications'}}
        component={ItemsNavigator}
      />
      <Drawer.Screen
        name="MyItems"
        options={{drawerLabel: 'Mes Publications'}}
        component={MyItems}
      />
      <Drawer.Screen
        name="Profile"
        options={{drawerLabel: 'Mon profil'}}
        component={Profile}
      />
      <Drawer.Screen
        name="Messages"
        options={{drawerLabel: 'Messagerie'}}
        component={MessagesNavigator}
      />
    </Drawer.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  forgotPass: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 10,
    width: '100%',
    marginVertical: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
});
