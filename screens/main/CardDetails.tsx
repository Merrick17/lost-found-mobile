import {Button, Icon, Text} from 'galio-framework';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
//@ts-ignores
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import {colors} from '../../constants/colors';
import {ScreenProps} from '../../constants/types';
import {createConversationApi} from '../../redux/actions/messsages.actions';
import {GlobalStyles} from '../../styles/global';
import {markPostAsFound} from '../../redux/actions/post.actions';
import moment from 'moment';
//@ts-ignore
const CardDetails = ({navigation}: ScreenProps) => {
  const {selectedPost} = useSelector((state: any) => state.posts);
  const {user, token} = useSelector(({auth}: any) => auth);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const handleCreateConversation = () => {
    //@ts-ignore
    dispatch(
      createConversationApi(
        token,
        {participants: [user._id, selectedPost.createdBy._id]},
        user._id,
      ),
    );
    //@ts-ignore
    nav.navigate('Messages', {screen: 'conversation'});
    //navigation.navigate('conversation')
  };
  const handleSendAlert = () => {
    //@ts-ignore
    dispatch(markPostAsFound(selectedPost._id, token));
  };
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Details'} navigation={navigation} />
      <View>
        <SliderBox
          sliderBoxHeight={300}
          images={
            selectedPost ? selectedPost.photos.map((elm: any) => `${elm}`) : []
          }
        />
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.detailsHeader}>
          <Text bold size={24}>
            {selectedPost ? selectedPost.title : ''}
          </Text>
          <View style={styles.locationDetails}>
            <Icon name="back-in-time" family="Entypo" size={25} />
            <Text size={15}>
              {selectedPost && selectedPost.createdAt
                ? moment(selectedPost.createdAt).format('DD/MM/YYYY hh:mm:ss')
                : ''}
            </Text>
          </View>
        </View>
        <Text p style={styles.descriptionStyle}>
          {selectedPost ? selectedPost.description : ''}
        </Text>
        <View style={styles.detailsFooter}>
          <Button
            size={'small'}
            onlyIcon
            icon="bells"
            iconFamily="AntDesign"
            onPress={handleSendAlert}
          />
          <Button
            icon="phone-call"
            iconFamily="Feather"
            size={'small'}
            onlyIcon
            color="success"
            onPress={() => {
              Linking.openURL(`tel:${selectedPost.createdBy.phoneNumber}`);
            }}
          />

          <Button
            size={'small'}
            icon="message-circle"
            iconFamily="Feather"
            onlyIcon
            color={colors.main}
            onPress={handleCreateConversation}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardDetails;

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
    gap: 5,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
});
