import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderTopRightRadius: 20,
    resizeMode: 'stretch',
    height: 250,
  },
  card: {
    marginHorizontal: 5,
    height: 300,
    borderRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 4,
  },
  textFootCard:{
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
  }
});
