import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalStyles } from '../../styles/global';
import MainHeader from '../../components/MainHeader';
import { ScreenProps } from '../../constants/types';
import { colors } from '../../constants/colors';
import { Block, Icon } from 'galio-framework';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversationsApi } from '../../redux/actions/messsages.actions';
import ConversationItem from '../../components/ConversationItem';

const Messages = ({ navigation }: ScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user, token } = useSelector(({ auth }: any) => auth);
  const { conversationList } = useSelector(({ messages }: any) => messages)
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getAllConversationsApi(token, user._id))
  }, [token, user])

  const discussions = [
    {
      id: 1,
      title: 'Test Discussion 1',
      lastMessage: 'This is the last message in Test Discussion 1.',
      unreadCount: 0,
    },
    {
      id: 2,
      title: 'Test Discussion 2',
      lastMessage: 'This is the last message in Test Discussion 2.',
      unreadCount: 1,
    },
    {
      id: 3,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 4,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 5,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 6,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 7,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 8,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 9,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
    {
      id: 10,
      title: 'Test Discussion 3',
      lastMessage: 'This is the last message in Test Discussion 3.',
      unreadCount: 2,
    },
  ];
  const handleSelectDiscussion = (index: any) => {
    setSelectedIndex(index);
  };
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Messagerie'} navigation={navigation} />
      <View style={GlobalStyles.container}>
        <FlatList
          data={conversationList}
          keyExtractor={discussion => discussion._id}
          renderItem={({ item }) => (
           <ConversationItem item={item} navigation={navigation} user={user}/>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Messages;

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
