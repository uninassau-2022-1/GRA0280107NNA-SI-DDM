import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#22252A',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    padding: 10,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '700',
    color: '#202020',
  },
  voteNumberContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3B3F41',
  },
  voteDigit: {
    fontSize: 20,
    color: '#202020',
  },
  voteInfoText: {
    alignSelf: 'center',
    fontWeight: '500',
    color: '#000',
  },
  candidateInfoText: {
    fontWeight: '500',
    color: '#797779',
  },
  candidateInfoContainer: {
    flexDirection: 'row',
  },
  showParties: {
    alignSelf: 'flex-end',
    fontWeight: '700',
    color: 'green',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 10,
    marginLeft: 5,
    borderRadius: 4,
  },
  numericKeysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numericKey: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    margin: 6,
    borderRadius: 6,
    backgroundColor: '#3B3F41',
  },
  keyNumber: {
    fontWeight: '700',
    color: 'white',
  },
  optionKeysContainer: {
    flexDirection: 'row',
  },
  optionKey: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    marginRight: 6,
    borderRadius: 4,
  },
  keyText: {
    fontWeight: '700',
  }
});

export default styles;
