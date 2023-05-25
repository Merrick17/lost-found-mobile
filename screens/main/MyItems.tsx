import {Card, Input} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EditItemModal from '../../components/EditItemModal';
import MainHeader from '../../components/MainHeader';
import {ScreenProps} from '../../constants/types';
import {SET_SELECTED_POST} from '../../redux/actions/actionTypes';
import {
  deletePostApi,
  getAllPostsByUser,
} from '../../redux/actions/post.actions';
import {GlobalStyles} from '../../styles/global';
import AwesomeAlert from 'react-native-awesome-alerts';
import {stringMd5} from 'react-native-quick-md5';
import {useIsFocused} from '@react-navigation/native';
const MyItems = ({navigation}: ScreenProps) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const {editList, selectedPost} = useSelector((state: any) => state.posts);
  const {token} = useSelector(({auth}: any) => auth);
  const [itemsIndex, setItemsIndex] = useState(1);
  useEffect(() => {
    if (isFocused) {
      //@ts-ignore
      dispatch(getAllPostsByUser(token));
    }
  }, [token, isFocused]);
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Mes Publications'} navigation={navigation} />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={selectedPost ? selectedPost.title : ''}
        message={selectedPost ? selectedPost.description : ''}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Modifier"
        confirmText="Supprimer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
          setIsEditOpen(true);
        }}
        onConfirmPressed={() => {
          if (selectedPost) {
            Alert.alert(
              'Confirmation',
              'Est ce que vous etes sure de supprimer cette annonce',
              [
                {
                  text: 'Non',
                  onPress: () => {
                    console.log('Annuler');
                  },
                  style: 'cancel',
                },
                {
                  text: 'Oui',
                  onPress: () => {
                    //@ts-ignore
                    dispatch(deletePostApi(token, selectedPost._id));
                  },
                },
              ],
            );
          }
          setShowAlert(false);
        }}
      />
      <View style={GlobalStyles.container}>
        <Input
          style={GlobalStyles.inputStyle}
          left={true}
          icon="search"
          family="Feather"
          placeholder="Recherche"
        />
        <EditItemModal
          isOpen={isEditOpen}
          handleClose={() => setIsEditOpen(false)}
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
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate('details');
                dispatch({
                  type: SET_SELECTED_POST,
                  payload: item,
                });
                setShowAlert(true);
              }}>
              <Card
                flex
                borderless
                style={styles.card}
                title={item.title}
                caption={`${item.createdBy.firstName} ${item.createdBy.lastName}`}
                location={item.createdBy.address}
                avatar={`https://www.gravatar.com/avatar/${stringMd5(
                  item.createdBy.email,
                )}&d=identicon`}
                imageStyle={styles.cardImageRadius}
                image={`${item.photos[0]}`}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyItems;

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
});
