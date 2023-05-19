import { Button, Input, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { ModalProps } from '../constants/types';
import { updatePostApi } from '../redux/actions/post.actions';
import { GlobalStyles } from '../styles/global';
const EditItemModal = ({isOpen, handleClose}: ModalProps) => {
  const {token} = useSelector(({auth}: any) => auth);
  const {selectedPost} = useSelector((state: any) => state.posts);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleConfirm = () => {
    if (selectedPost) {
      //@ts-ignore
      dispatch(updatePostApi(token, selectedPost._id, {title, description}));
      handleClose();
    }
  };
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
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
            <Text style={styles.modalText}>Modifier une publication</Text>

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

export default EditItemModal;

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
