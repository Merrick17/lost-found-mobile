import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GlobalStyles} from '../../styles/global';
import MainHeader from '../../components/MainHeader';
import {ScreenProps} from '../../constants/types';
import {colors} from '../../constants/colors';
import {Block, Icon} from 'galio-framework';
import {useDispatch, useSelector} from 'react-redux';
import {getAllConversationsApi} from '../../redux/actions/messsages.actions';
import ConversationItem from '../../components/ConversationItem';
import {useIsFocused} from '@react-navigation/native';

const Messages = ({navigation}: ScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isFocused = useIsFocused();
  const {user, token} = useSelector(({auth}: any) => auth);
  const {conversationList} = useSelector(({messages}: any) => messages);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      
      //@ts-ignore
      dispatch(getAllConversationsApi(token, user._id));
    }
  }, [token, user, isFocused]);


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
          renderItem={({item}) => (
            <ConversationItem item={item} navigation={navigation} user={user} />
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
  avatarText: {color: '#FFF', fontWeight: '700'},
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
