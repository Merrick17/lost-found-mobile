import React, { useEffect, useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
//@ts-ignores
import {
    Pusher,
    PusherEvent
} from '@pusher/pusher-websocket-react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../../components/MainHeader';
import SendMessage from '../../components/SendMessage';
import { colors } from '../../constants/colors';
import { ScreenProps } from '../../constants/types';
import {
    createMessageApi,
    setSelectedConversation
} from '../../redux/actions/messsages.actions';
import { GlobalStyles } from '../../styles/global';
const pusher = Pusher.getInstance();
//@ts-ignore
const Conversations = ({ navigation, route }: ScreenProps) => {
    const { selectedConversation } = useSelector((state: any) => state.messages);
    const [reverseUser, setReverseUser] = useState<any>(null);
    const { user, token } = useSelector(({ auth }: any) => auth);
    const [messageList, setMessagesList] = useState([]);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && selectedConversation) {
            //console.log("Conversation", conversation);
            const newUser = selectedConversation.participants.find(
                (itm: any) => itm._id !== user._id,
            );
            console.log('NEW USER', newUser);
            setReverseUser(newUser);
            setMessagesList(
                selectedConversation.messages
            );
        }
    }, [selectedConversation, reverseUser]);
    const initPusher = async () => {
        if (selectedConversation) {
            console.log("Selected Conversation",selectedConversation);
            await pusher.init({
                apiKey: '4ad2f673d2e939651348',
                cluster: 'eu',
            });

            await pusher.connect();
            await pusher.subscribe({
                channelName: selectedConversation._id,
                onEvent: (event: PusherEvent) => {
                    console.log(`Event received: ${event.data.message}`);
                    //@ts-ignore
                    //dispatch(updateCoversationApi(token, selectedConversation._id));
                    dispatch(setSelectedConversation(event.data['message']))
                },
            });
        }
    };
    useMemo(() => {
        initPusher();
    }, [selectedConversation]);

    const handleSendMessage = () => {
        if (user && selectedConversation) {
            //console.log("Selected CONV",selectedConversation); 
            //@ts-ignore
            dispatch(
                //@ts-ignore
                createMessageApi(token, selectedConversation._id, {
                    sender: user._id,
                    content: message,
                }),
            );
        }
    };
    const RenderMessage = ({ item }: { item: any }) => {
        return (
            <View
                style={
                    user && item.sender == user._id
                        ? styles.reverseMessageContainer
                        : styles.messageContainer
                }>
                <View
                    style={
                        user && item.sender == user._id ? styles.userMessage : styles.otherMessage
                    }>
                    <Text
                        style={
                            user && item.sender == user._id
                                ? styles.userMessageText
                                : styles.otherMessageText
                        }>
                        {item.content}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={GlobalStyles.mainContainerStyle}>
            <MainHeader title={'Message'} navigation={navigation} />
            <View style={GlobalStyles.container}>
                {reverseUser && (
                    <ScrollView style={{ width: '100%', height: 650 }}>
                        {messageList.map((item: any) => (
                            <RenderMessage item={item} key={item._id} />
                        ))}
                    </ScrollView>
                )}
                {/* {reverseUser && (
                <FlatList style={{ maxHeight: 670 }}
                    data={messageList}
                    renderItem={renderMessage}
                    keyExtractor={item => item._id}
                />
            )} */}
            </View>
            <SendMessage
                onSend={handleSendMessage}
                message={message}
                setMessage={setMessage}
            />
        </SafeAreaView>
    );
};

export default Conversations;

const styles = StyleSheet.create({
    detailsHeader: {
        width: '100%',
        height: 50,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 10,
        paddingBottom: 5,
        borderColor: '#ccc',
        // backgroundColor: 'red',
    },
    locationDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    bottomCard: {
        backgroundColor: colors.background,
        flex: 1,
        position: 'relative',
    },
    descriptionStyle: {
        padding: 10,
        textAlign: 'justify',
        fontSize: 15,
    },
    detailsFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
        position: 'absolute',
        bottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    reverseMessageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    otherMessageContainer: {
        justifyContent: 'flex-start',
    },
    userMessage: {
        backgroundColor: colors.main,
        borderRadius: 5,
        padding: 10,
        maxWidth: '80%',
    },
    otherMessage: {
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        padding: 10,
        maxWidth: '80%',
    },
    userMessageText: {
        fontSize: 16,
        textAlign: 'right',
        color: '#fff',
    },
    otherMessageText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'left',
    },
});
