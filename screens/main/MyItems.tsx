import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'
import { Card, Input } from 'galio-framework'
import { GlobalStyles } from '../../styles/global'
import EditItemModal from '../../components/EditItemModal'
import MainHeader from '../../components/MainHeader'
import { ScreenProps } from '../../constants/types'

const MyItems = ({ navigation }: ScreenProps) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Mes Publications'} navigation={navigation} />
      <View style={GlobalStyles.container}>
        <Input style={GlobalStyles.inputStyle} left={true} icon='search' family='Feather' placeholder='Recherche' />
        <EditItemModal isOpen={isEditOpen} handleClose={() => setIsEditOpen(false)} />
        <ScrollView style={styles.scrollContainer}>
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
        </ScrollView>
      </View>
    </SafeAreaView>

  )
}

export default MyItems


const styles = StyleSheet.create({
  card: {
    width: '100%',

    maxHeight: 450,
    padding: 5,
    marginVertical: 10
  },
  cardImageRadius: {
    height: '78%',
    width: '100%',
    resizeMode: 'cover'
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
