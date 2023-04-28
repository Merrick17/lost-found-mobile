import {Button, Icon, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import MainHeader from '../../components/MainHeader';
import {ScreenProps} from '../../constants/types';
import {GlobalStyles} from '../../styles/global';
import {colors} from '../../constants/colors';
//@ts-ignore
const CardDetails = ({navigation}: ScreenProps) => {
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Details'} navigation={navigation} />
      <View>
        <SliderBox
          sliderBoxHeight={300}
          images={[
            'https://source.unsplash.com/1024x768/?nature',
            'https://source.unsplash.com/1024x768/?water',
            'https://source.unsplash.com/1024x768/?girl',
            'https://source.unsplash.com/1024x768/?tree',
          ]}
        />
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.detailsHeader}>
          <Text bold size={24}>
            Title
          </Text>
          <View style={styles.locationDetails}>
            <Icon name="location" family="EvilIcons" size={25} />
            <Text size={15}>Sousse</Text>
          </View>
        </View>
        <Text p style={styles.descriptionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          mattis accumsan augue ac pulvinar. Donec sollicitudin nec turpis sit
          amet iaculis. Ut ut eros velit. Ut pretium egestas arcu, sed
          vestibulum arcu posuere ac. In eget accumsan arcu. Quisque turpis
          enim, volutpat id lacus vitae, consequat blandit odio. Ut pretium
          magna sed dui euismod, et placerat ante aliquam. Mauris nisi sem,
          ultrices ut justo vitae, aliquam iaculis neque. Phasellus condimentum
          accumsan diam nec cursus.
        </Text>
        <View style={styles.detailsFooter}>
          <Button icon="phone-call" iconFamily="Feather" color="success">
            Appeler
          </Button>
          <Button icon='message-circle' iconFamily="Feather" color={colors.main}>Messager</Button>
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
