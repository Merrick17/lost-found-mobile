import { Button, Icon, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
//@ts-ignores
import { SliderBox } from 'react-native-image-slider-box';
import MainHeader from '../../components/MainHeader';
import { ScreenProps } from '../../constants/types';
import { GlobalStyles } from '../../styles/global';
import { colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/apiMethods';
import { Linking } from 'react-native';
import { createConversationApi } from '../../redux/actions/messsages.actions';
import { useNavigation } from '@react-navigation/native';
//@ts-ignore
const CardDetails = ({ navigation }: ScreenProps) => {
  const { selectedPost } = useSelector((state: any) => state.posts);
  const { user, token } = useSelector(({ auth }: any) => auth);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const handleCreateConversation = () => {
    //@ts-ignore
    dispatch(createConversationApi(token, [user._id, selectedPost.createdBy._id], user._id));
    //@ts-ignore
    nav.navigate('Messages', { screen: 'conversation' })
    //navigation.navigate('conversation')
  }
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Details'} navigation={navigation} />
      <View>
        <SliderBox
          sliderBoxHeight={300}
          images={
            selectedPost
              ? selectedPost.photos.map((elm: any) => `${BASE_URL}/${elm}`)
              : []
          }
        />
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.detailsHeader}>
          <Text bold size={24}>
            {selectedPost ? selectedPost.title : ''}
          </Text>
          <View style={styles.locationDetails}>
            <Icon name="location" family="EvilIcons" size={25} />
            <Text size={15}>{selectedPost && selectedPost.createdBy ? selectedPost.createdBy.address : ""}</Text>
          </View>
        </View>
        <Text p style={styles.descriptionStyle}>
          {selectedPost ? selectedPost.description : ''}
        </Text>
        <View style={styles.detailsFooter}>
          <Button icon="phone-call" iconFamily="Feather" color="success" onPress={() => {
            Linking.openURL(`tel:${selectedPost.createdBy.phoneNumber}`);
          }}>
            Appeler
          </Button>
          <Button
            icon="message-circle"
            iconFamily="Feather"
            color={colors.main} onPress={handleCreateConversation}>
            Messager
          </Button>
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
    gap: 10,
    position: 'absolute',
    bottom: 10,
  },
});
