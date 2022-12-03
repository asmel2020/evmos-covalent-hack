import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    bottomModal: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    card: {
      width: '95%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      overflow: 'hidden',
    },
    icon: {
      width: 30,
      height: 30,
    },
    cardHeader: {
      borderBottomWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '100%',
      backgroundColor: 'white',
    },
    cardBody: {
      paddingHorizontal: 20,
      alignContent: 'center',
    },
  });