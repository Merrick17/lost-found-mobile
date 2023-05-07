import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { Block, Icon } from 'galio-framework'
import { useDispatch } from 'react-redux'
import { SET_SELECTED_CONVERSATION } from '../redux/actions/actionTypes'

const ConversationItem = ({ item, navigation, user }: { item: any, navigation: any, user: any }) => {
    const [reverseUser, setReverseUser] = useState<any>(null);
    const [lastMessage, setLastMessage] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && item) {

            const newUser = item.participants.find((itm: any) => itm._id !== user._id);
            
            const message = `${item.messages[0].content}...`
            setReverseUser(newUser);
            setLastMessage(message);
        }
    }, [item])
    return (
        <Block width={350} row space="between" style={styles.discussion}>
            <View style={styles.avatarLogo}><Text style={styles.avatarText}>{reverseUser && `${reverseUser.firstName[0].toUpperCase()}${reverseUser.lastName[0].toUpperCase()}`}</Text></View>
            <View>
                <Text style={styles.title}>{reverseUser && `${reverseUser.firstName} ${reverseUser.lastName}`}</Text>
                <Text style={styles.lastMessage}>{`${lastMessage}`}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                dispatch({
                    type: SET_SELECTED_CONVERSATION,
                    payload: item
                })
                navigation.navigate('conversation');

            }}>
                <Icon name="chevron-right" family="Feather" size={35} />
            </TouchableOpacity>
        </Block>
    )
}

export default ConversationItem

const styles = StyleSheet.create({
    avatarLogo: {
        width: 50,
        height: 50,
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: 5,
    },
    discussion: {
        marginVertical: 8,
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: '#ccc',

        width: 360,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 16,
    },
    avatarText: { color: "#FFF", fontWeight: '700' },
    unreadCount: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#ff0000',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
    },
});
