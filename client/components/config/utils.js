import { showMessage } from "react-native-flash-message";
import { Dimensions } from 'react-native';

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const showErrorMessage = () => {
  showMessage({
    message: 'Ocurrió un error',
    description: 'Inténtalo más tarde',
    type: 'danger',
    icon: 'auto'
  });
}

/**
 * Scaling unit helper function
 */
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen tablet device
const guidelineBaseWidth = 768;
const guidelineBaseHeight = 1024;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {removeAccents, showErrorMessage, scale, verticalScale, moderateScale};