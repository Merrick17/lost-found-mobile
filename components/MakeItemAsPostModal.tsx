import {Picker} from '@react-native-picker/picker';
import {Button, Input, Text} from 'galio-framework';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View, Switch, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../constants/colors';
import {ModalProps} from '../constants/types';
import {createPostApi, createPostFromItem} from '../redux/actions/post.actions';
import {GlobalStyles} from '../styles/global';
const MakeItemAsPostModal = ({isOpen, handleClose}: ModalProps) => {
  const {editList} = useSelector((state: any) => state.category);
  const {token} = useSelector(({auth}: any) => auth);
  const {selectedPost} = useSelector(({userItems}: any) => userItems);

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLost, setIsLost] = useState(true);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (selectedPost) {
      if (selectedCategory == '-1' || selectedSubCategory == '-1') {
        Alert.alert(
          'Erreur',
          'vous devez choisir une catégorie et une sous-catégorie',
          [{text: 'Ok', onPress: () => {}}],
        );
      } else {
        dispatch(
          //@ts-ignore
          createPostFromItem(
            {
              category: selectedCategory,
              subCategory: selectedSubCategory,
              itemId: selectedPost._id,
            },
            token,
          ),
        );
      }

      handleClose();
    }
  };
  useEffect(() => {
    console.log('Selected Post', selectedPost);
    if (selectedPost) {
      setTitle(selectedPost.name);
      setDescription(selectedPost.description);
    }
  }, [selectedPost]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Convertir vers une publication</Text>

            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Titre"
              label="Titre"
              value={title}
              onChangeText={txt => setTitle(txt)}
            />
            <Input
              style={GlobalStyles.inputStyle}
              placeholder="Description"
              label="Description"
              value={description}
              onChangeText={txt => setDescription(txt)}
            />
            <View style={styles.categoryInput}>
              <Picker
                style={{width: '100%', height: 30}}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCategory(itemValue);
                  const subList = editList.find(
                    (elm: any) => elm._id == itemValue,
                  ).subCategories;
                  setSubCategoryList(subList);
                }}>
                <Picker.Item label="Catégorie" value={'-1'} />
                {editList &&
                  editList.map((categ: any) => (
                    <Picker.Item
                      label={categ.name}
                      value={categ._id}
                      key={categ._id}
                    />
                  ))}
              </Picker>
            </View>
            <View style={styles.categoryInput}>
              <Picker
                style={{width: '100%', height: 30}}
                selectedValue={selectedSubCategory}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSubCategory(itemValue);
                }}>
                <Picker.Item label="Sous Catégorie" value={'-1'} />
                {subCategoryList &&
                  subCategoryList.map((categ: any) => (
                    <Picker.Item
                      label={categ.name}
                      value={categ._id}
                      key={categ._id}
                    />
                  ))}
              </Picker>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 17, fontWeight: 500}}>
                Element Perdu ? :{' '}
              </Text>
              <Switch
                trackColor={{false: '#767577', true: colors.main}}
                thumbColor={isLost ? colors.hover : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => setIsLost(value)}
                value={isLost}
              />
            </View>

            <View style={styles.modalBottom}>
              <Button size={'small'} onPress={() => handleClose()}>
                Annuler
              </Button>
              <Button
                color={colors.main}
                size={'small'}
                onPress={() => handleConfirm()}>
                Confirmer
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MakeItemAsPostModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 22,
    height: 500,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'flex-start',
    height: 600,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalBottom: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: '500',
  },
  actionSheetList: {
    display: 'flex',
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    padding: 20,
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionSheetItem: {
    fontWeight: '700',
    fontSize: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 22,
    fontWeight: '600',
  },
  categoryInput: {
    width: '100%',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    marginTop: 20,
  },
});
