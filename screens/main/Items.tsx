import {Button, Card, Input} from 'galio-framework';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import CreateNewItemModal from '../../components/CreateNewItemModal';
import MainHeader from '../../components/MainHeader';
import {colors} from '../../constants/colors';
import {ScreenProps} from '../../constants/types';
import {GlobalStyles} from '../../styles/global';

//@ts-ignore
const Items = ({navigation}: ScreenProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log('Navigation', navigation);
  }, [navigation]);
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Publications'} navigation={navigation} />
      <View style={GlobalStyles.container}>
        <CreateNewItemModal
          isOpen={isCreateOpen}
          handleClose={() => {
            setIsCreateOpen(false);
          }}
        />

        <Input
          style={GlobalStyles.inputStyle}
          left={true}
          icon="search"
          family="Feather"
          placeholder="Recherche"
        />
        <ScrollView style={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('details');
            }}>
            <Card
              flex
              borderless
              style={styles.card}
              title="Christopher Moon"
              caption="139 minutes ago"
              location="Los Angeles, CA"
              avatar="http://i.pravatar.cc/100?id=skater"
              imageStyle={styles.cardImageRadius}
              image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
            />
          </TouchableOpacity>
        </ScrollView>

        <Button
          onlyIcon
          size={'small'}
          icon="add-circle-outline"
          iconFamily="Ionicons"
          color={colors.main}
          iconSize={35}
          style={styles.fabButton}
          onPress={() => {
            setIsCreateOpen(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Items;

const styles = StyleSheet.create({
  card: {
    width: '100%',

    maxHeight: 450,
    padding: 5,
    marginVertical: 10,
  },
  cardImageRadius: {
    height: '78%',
    width: '100%',
    resizeMode: 'cover',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  fabButton: {
    height: 65,
    width: 65,
    position: 'absolute',
    bottom: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
});
