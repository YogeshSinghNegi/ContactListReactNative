import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';

import ContactListItem from '../components/ContactListItem';

import { fetchContacts } from '../utils/api';
import getURLParams from '../utils/getURLParams';
import store from '../store';

const keyExtractor = ({ phone }) => phone;

const Contacts = (props) => {

  const appState = store.getState();
  const [contacts, setContacts] = useState(appState.contacts);
  const [loading, setLoading] = useState(appState.isFetchingContacts);
  const [error, setError] = useState(appState.error);

  const contactsSorted = contacts.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

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

    Linking.addEventListener('url', handleOpenUrl);

    async function openLinkingURL() {
      const url = await Linking.getInitialURL();
      handleOpenUrl({ url });
    }
    openLinkingURL();

    return (() => {
      Linking.removeEventListener('url', handleOpenUrl);
      unsubscribe()
    })
  },[]);

  const handleOpenUrl = (event) => {
    const { navigation: { navigate } } = props;
    const { url } = event;
    const params = getURLParams(url);

    if (params.name) {
      const queriedContact = store
        .getState()
        .contacts.find(
          contact =>
            contact.name.split(' ')[0].toLowerCase() ===
            params.name.toLowerCase(),
        );

      if (queriedContact) {
        navigate('Profile', { id: queriedContact.id });
      }
    }
  }

  const renderContact = ({ item }) => {
    const { navigation: { navigate } } = props;
    const { id, name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { id })}
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
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={renderContact}
          />
        )}
    </View>
  )
}

export default Contacts;

/*
export default class Contacts extends React.Component {
  static navigationOptions = () => ({
    title: 'Contacts',
  });

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }),
    );

    const contacts = await fetchContacts();

    store.setState({ contacts, isFetchingContacts: false });

    Linking.addEventListener('url', this.handleOpenUrl);

    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenUrl);
    this.unsubscribe();
  }

  handleOpenUrl(event) {
    const { navigation: { navigate } } = this.props;
    const { url } = event;
    const params = getURLParams(url);

    if (params.name) {
      const queriedContact = store
        .getState()
        .contacts.find(
          contact =>
            contact.name.split(' ')[0].toLowerCase() ===
            params.name.toLowerCase(),
        );

      if (queriedContact) {
        navigate('Profile', { id: queriedContact.id });
      }
    }
  }

  renderContact = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { id, name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { id })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;

    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={contactsSorted}
              keyExtractor={keyExtractor}
              renderItem={this.renderContact}
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
});
