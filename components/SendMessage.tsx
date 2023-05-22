import { Button, Input } from 'galio-framework';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
const SendMessage = ({
    onSend,
    message,
    setMessage,
}: {
    onSend: any;
    message: string;
    setMessage: any;
}) => {
    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                placeholder="Type your message here..."
                value={message}
                onChangeText={setMessage}
            />
            <Button
                title="Send"
                color={colors.main}
                onlyIcon
                icon="send"
                iconFamily="Feather"
                onPress={handleSend}
                round={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: colors.background,
        flex: 1,
        maxHeight: 80,
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        width: Dimensions.get('screen').width * 0.75,
    },
});

export default SendMessage;
