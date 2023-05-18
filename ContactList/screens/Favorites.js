import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';

import { fetchContacts } from '../utils/api';
import store from '../store';

const keyExtractor = ({ phone }) => phone;

const Favorites = (props) => {

  const appState = store.getState();
  const [contacts, setContacts] = useState(appState.contacts);
  const [loading, setLoading] = useState(appState.isFetchingContacts);
  const [error, setError] = useState(appState.error);

  const favorites = contacts.filter(contact => contact.favorite);

  useEffect(() => {

    const unsubscribe = store.onChange(() => {
      setContacts(store.getState().contacts);
      setLoading(store.getState().isFetchingContacts);
      setError(store.getState().error);
    });

    async function fetchData() {
      const contacts = await fetchContacts();
      store.setState({ contacts, isFetchingContacts: false });
    }
    fetchData();

    return (() => {
      unsubscribe()
    })

  }, []);

  const renderFavoriteThumbnail = ({ item }) => {
    const { navigation: { navigate } } = props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { id: item.id })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}

      {!loading &&
        !error && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={renderFavoriteThumbnail}
          />
        )}
    </View>
  )
}

export default Favorites;

/*
export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    const { contacts } = this.state;

    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }),
    );

    if (contacts.length === 0) {
      const fetchedContacts = await fetchContacts();

      store.setState({
        contacts: fetchedContacts,
        isFetchingContacts: false,
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderFavoriteThumbnail = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { id: item.id })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading &&
          !error && (
            <FlatList
              data={favorites}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={this.renderFavoriteThumbnail}
            />
          )}
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});
