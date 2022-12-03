import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    modalContent: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    head:{
      width: '100%',
      borderBottomWidth: 1,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:"#dededc"
    },
    headContent:{
      height: 10,
      width: 100,
      borderRadius: 35,
      backgroundColor: '#dededc',
    }
  });