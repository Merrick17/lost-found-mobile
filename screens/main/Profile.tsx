import {Button, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CreateNewUserItemModal from '../../components/CreateNewUserItemModal';
import ItemCard from '../../components/ItemCard';
import MainHeader from '../../components/MainHeader';
import {colors} from '../../constants/colors';
import {GlobalStyles} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {getAllItemsApi} from '../../redux/actions/item.actions';
import {FlatList} from 'react-native-gesture-handler';
import UpdateUserModal from '../../components/UpdateUserModal';
import MakeItemAsPostModal from '../../components/MakeItemAsPostModal';
import {SET_SELECTED_ITEM} from '../../redux/actions/actionTypes';

const Profile = ({navigation}: {navigation: any}) => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const {token, user} = useSelector(({auth}: any) => auth);
  const {editList} = useSelector((state: any) => state.userItems);
  const dispatch = useDispatch();
  useEffect(() => {
    ///@ts-ignore
    dispatch(getAllItemsApi(token));
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.mainContainerStyle}>
      <MainHeader title={'Profil'} navigation={navigation} />
      <CreateNewUserItemModal
        isOpen={isCreateOpen}
        handleClose={() => setIsCreateOpen(false)}
      />
      <MakeItemAsPostModal
        isOpen={isPostModalOpen}
        handleClose={() => setIsPostModalOpen(false)}
      />
      <UpdateUserModal
        isOpen={isUpdateOpen}
        handleClose={() => setIsUpdateOpen(false)}
      />
      <View style={GlobalStyles.container}>
        <View style={styles.userprofile}>
          <View style={styles.profileItem}>
            <Text>Nom & Prénom : </Text>
            <Text>{user && `${user.firstName} ${user.lastName}`} </Text>
          </View>
          <View style={styles.profileItem}>
            <Text>Adresse : </Text>
            <Text>{user && user.address}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text>Email : </Text>
            <Text>{user && user.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text>Téléphone : </Text>
            <Text>{user && user.phoneNumber}</Text>
          </View>
          <View style={styles.profileFooter}>
            <Button
              color={colors.main}
              shadowless
              size={'small'}
              onPress={() => setIsUpdateOpen(true)}>
              Modifier
            </Button>
          </View>
        </View>
        <Text style={styles.titleStyle}>Mes Articles</Text>
        <FlatList
          data={editList}
          renderItem={({item, index}) => (
            <ItemCard
              title={item.name}
              description={item.description}
              id={item._id}
              createdAt={''}
              photos={[]}
              ind={index + 1}
              onSendClick={() => {
                setIsPostModalOpen(true); 
                dispatch({type: SET_SELECTED_ITEM, payload: item});
              
              }}
            />
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

export default Profile;

const styles = StyleSheet.create({
  userprofile: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    backgroundColor: colors.input,
    elevation: 1,
    justifyContent: 'space-evenly',
    gap: 10,
    padding: 10,
  },
  profileItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileFooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleStyle: {
    fontSize: 24,
    alignSelf: 'flex-start',
    marginVertical: 10,
    fontWeight: 600,
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
