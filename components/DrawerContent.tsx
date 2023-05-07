import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { Text, Button } from 'galio-framework';
import { useSelector } from 'react-redux';
const DrawerContent = (props: any) => {
    const { state } = props;
    const { routes, index } = state; //Not sure about the name of index property. Do check it out by logging the 'state' variable.
    const focusedRoute = routes[index];
    const { user } = useSelector(({ auth }: any) => auth)
    return (
        <DrawerContentScrollView {...props}>
            {/* Add your custom header */}
            <View style={styles.drawerHeader}>
                <View
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.main, margin: 10
                    }}>
                    <Text size={24} bold color="#FFF">
                        {user && user.firstName[0]} {user && user.lastName[0]}
                    </Text>
                </View>
                <View style={styles.headerButtons}>
                    <Text bold size={17}>
                        {user && user.firstName} {user && user.lastName}
                    </Text>
                    <Text size={15}>
                        {user && user.address}
                    </Text>

                </View>
            </View>
            {/* Add your drawer items */}
            <DrawerItem
                label="Publications"
                onPress={() => props.navigation.navigate('Items')}
                focused={focusedRoute['name'] === 'Items'}
            />
            <DrawerItem
                label="Mes Publications"
                onPress={() => props.navigation.navigate('MyItems')}
                focused={focusedRoute['name'] === 'MyItems'}
            />
            <DrawerItem
                label="Messages"
                onPress={() => props.navigation.navigate('Messages')}
                focused={focusedRoute['name'] === 'Messages'}
            />
            <DrawerItem
                label="Mon Profil"
                onPress={() => props.navigation.navigate('Profile')}
                focused={focusedRoute['name'] === 'Profile'}
            />
            <DrawerItem
                label="Deconnexion"
                onPress={() => props.navigation.navigate('Login')}
            // focused={focusedRoute['name'] === 'Messages'}
            />
        </DrawerContentScrollView>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    drawerHeader: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerButtons: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'flex-start', alignItems: 'flex-start',
    }
});
