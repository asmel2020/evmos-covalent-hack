import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    paddingVertical:20,
    paddingHorizontal:20,

    borderBottomWidth:1,
    borderBottomColor:'#61dafb',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius:30
  },
  containerBalance: {
    paddingLeft:15,
    alignSelf:"center"
  },
  balanceCrypto: {
    fontWeight:'600',
    fontSize: 25,
    marginLeft:10,
  },
  balanceFiat: {
    fontWeight:'bold',
    fontSize: 15,
    marginLeft:10,
  },
});
