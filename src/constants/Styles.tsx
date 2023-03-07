import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 10
  },
  plantNameAndLoc: {
    flex: 1,
    alignSelf: 'center',
    paddingStart: 10
  },
  plantHeadingNameText: {
    fontSize: 15
  },
  plantHeadingLocText: {
    fontSize: 10
  },
  plantWaterIcon: {
    alignItems: 'baseline',
    alignSelf: 'center',
    padding: 10
  },
  plantImageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    padding: 5
  },
  plantImage: {
    width: 150,
    height: 150,
    borderWidth: 3
  },
  plantThumbnail: {
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden'
  },
  singleLineInput: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  multilineInput: {
    height: 100,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  dropdown: {
    width: 250,
    alignSelf: 'center'
  },
  dropdownContainer: {
    width: 250,
    alignSelf: 'center'
  },
  budew: {
    width: 210,
    height: 250,
  }
});
