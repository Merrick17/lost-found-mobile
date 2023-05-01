import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GlobalStyles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        width: screenWidth, height: screenHeight
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: screenWidth * 0.03,
        paddingVertical: screenHeight * 0.03,
        backgroundColor: colors.background
    },
    inputStyle: {
        borderColor: colors.background,
        backgroundColor: colors.input,
        zIndex: 1000, // set higher zIndex
    },
    mainBtnStyles: {
        width: "100%",
        borderRadius: 20,
        height: 50
    }
});

export { GlobalStyles }