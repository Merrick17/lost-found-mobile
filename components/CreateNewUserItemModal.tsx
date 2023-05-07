import { Button, Input, Text } from 'galio-framework';
import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { ModalProps } from '../constants/types';
import { createItemApi } from '../redux/actions/item.actions';
import { GlobalStyles } from '../styles/global';
const CreateNewUserItemModal = ({ isOpen, handleClose }: ModalProps) => {

  const { token } = useSelector(({ auth }: any) => auth);
  const [libraryImageList, setImageLibraryList] = useState<any[]>([]);
  const [cameraImageList, setCameraImageList] = useState<any[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleConfirm = () => {
    const mappedImages = [
      ...cameraImageList.map(img => ({
        uri: img.uri,
        type: img.type,
        name: img.fileName,
      })),
      ...libraryImageList.map(img => ({
        uri: img.uri,
        type: img.type,
        name: img.fileName,
      })),
    ];
    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', description);

    mappedImages.forEach(img => {
      formData.append('photos', img);
    });
    //@ts-ignore
    dispatch(createItemApi(token, formData));
    handleClose();
  };

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
            <Text style={styles.modalText}>Ajouter nouveau element de valeurs</Text>
            <View style={styles.imageContainer}>
              <Button
                onlyIcon
                color={colors.main}
                icon="camera"
                iconFamily="Entypo"
                onPress={async () => {
                  const options: any = {
                    saveToPhotos: true,
                  };
                  const result = await launchCamera(options);
                  //@ts-ignore
                  setCameraImageList(result.assets);
                  
                }}
              />
              <Button
                onlyIcon
                color={colors.main}
                icon="attachment"
                iconFamily="Entypo"
                onPress={async () => {
                  const options: any = {
                    saveToPhotos: true,
                  };
                  const result = await launchImageLibrary(options);
                  //@ts-ignore
                  setImageLibraryList(result.assets);
                
                }}
              />
            </View>
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

export default CreateNewUserItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 22,
    height: 300,
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
    height: 400,
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
