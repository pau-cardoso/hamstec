import { showMessage } from "react-native-flash-message";

export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const showErrorMessage = () => {
  showMessage({
    message: 'Ocurrió un error',
    description: 'Inténtalo más tarde',
    type: 'danger',
    icon: 'auto'
  });
}