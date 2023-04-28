import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { Icon } from 'galio-framework';
import { HeaderProps } from '../constants/types';

const MainHeader = ({ title, navigation }: HeaderProps) => {
    const handleOpenDrawer = () => {
        navigation.openDrawer();
    }
    const handleLogout = () => {
        navigation.replace('Login')
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleOpenDrawer}>
                <Icon name="menu" color="#FFF" size={30} family="Entypo" />
            </TouchableOpacity>

            <Text style={styles.titleStyle}>{title}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Icon name="exit-to-app" color="#FFF" size={30} family="MaterialIcons" />
            </TouchableOpacity>
        </View>
    );
};

export default MainHeader;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.main,
        flexDirection: 'row', padding: 10
    },
    titleStyle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
    },
});
