import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';

const Options = (props) => {
  
  return (
    <View style={styles.container}>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      <DetailListItem title="Sign Out" />
    </View>
  );
}

export default Options;

/*
export default class Options extends React.Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Options',
    headerLeft: (
      <Icon
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <DetailListItem title="Update Profile" />
        <DetailListItem title="Change Language" />
        <DetailListItem title="Sign Out" />
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
