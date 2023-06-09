import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ContactThumbnail from '../components/ContactThumbnail';

import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';
import store from '../store';

const User = (props) => {

  const appState = store.getState();
  const [user, setUser] = useState(appState.user);
  const [loading, setLoading] = useState(appState.isFetchingUser);
  const [error, setError] = useState(appState.error);

  useEffect(() => {

    const unsubscribe = store.onChange(() => {
      setUser(store.getState().user);
      setLoading(store.getState().isFetchingUser);
      setError(store.getState().error);
    });

    async function fetchData() {
      const user = await fetchUserContact();
      store.setState({ user, isFetchingUser: false });
    }
    fetchData();

    return (() => {
      unsubscribe()
    })

  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}

      {!loading && (
        <ContactThumbnail
          avatar={avatar}
          name={name}
          phone={phone}
        />
      )}
    </View>
  );
}

export default User;

/*
export default class User extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Me',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerRight: (
      <Icon
        name="settings"
        size={24}
        style={{ color: 'white', marginRight: 10 }}
        onPress={() => navigate('Options')}
      />
    ),
  });

  state = {
    user: store.getState().user,
    loading: store.getState().isFetchingUser,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
      }),
    );

    const user = await fetchUserContact();

    store.setState({ user, isFetchingUser: false });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { user, loading, error } = this.state;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && (
          <ContactThumbnail
            avatar={avatar}
            name={name}
            phone={phone}
          />
        )}
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});
