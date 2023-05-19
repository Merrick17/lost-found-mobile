import { Button, Card, Input, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewItemModal from '../../components/CreateNewItemModal';
import MainHeader from '../../components/MainHeader';
import { colors } from '../../constants/colors';
import { ScreenProps } from '../../constants/types';
import { SET_SELECTED_POST } from '../../redux/actions/actionTypes';
import { getAllPostsApi } from '../../redux/actions/post.actions';
import { GlobalStyles } from '../../styles/global';
import { stringMd5 } from 'react-native-quick-md5';
//@ts-ignore
const Items = ({ navigation }: ScreenProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { editList } = useSelector((state: any) => state.posts);
  const { token } = useSelector(({ auth }: any) => auth);
  const [itemsIndex, setItemsIndex] = useState(1);
  useEffect(() => {
    //@ts-ignore
    dispatch(getAllPostsApi(token));
  }, [token]);

  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Publications'} navigation={navigation} />
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: colors.hover,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={itemsIndex == 1 ? styles.lostItemSelected : styles.lostItem}
          onPress={() => {
            setItemsIndex(1);
          }}>
          <Text style={styles.lostItemText}>Perdu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={itemsIndex == 2 ? styles.lostItemSelected : styles.lostItem}
          onPress={() => {
            setItemsIndex(2);
          }}>
          <Text style={styles.lostItemText}>Trouvé</Text>
        </TouchableOpacity>
      </View>
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

        <FlatList
          style={styles.scrollContainer}
          data={editList.filter((elm: any) => {
            if (itemsIndex == 1 && elm.isLost) {
              return elm;
            } else if (itemsIndex == 2 && !elm.isLost) {
              return elm;
            }
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('details');
                dispatch({
                  type: SET_SELECTED_POST,
                  payload: item,
                });
              }}>
              <Card
                flex
                borderless
                style={styles.card}
                title={item.title}
                caption={`${item.createdBy.firstName} ${item.createdBy.lastName}`}
                location={item.createdBy.address}
                avatar={`https://www.gravatar.com/avatar/${stringMd5(item.createdBy.email)}&d=identicon`}
                imageStyle={styles.cardImageRadius}
                image={`${item.photos[0]}`}
              />
            </TouchableOpacity>
          )}
        />

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
  lostItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: colors.main,
    height: '100%',
  },
  lostItemSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: colors.hover,
  },
  lostItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});
