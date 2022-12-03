import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    width: '100%',
    height: 70,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor:"#d6cfcf"
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  balanceContainer: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
