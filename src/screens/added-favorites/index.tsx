import { AppBar } from "components";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { List } from "react-native-paper";
import { firestore } from "config/firebase";
import { AddFloatingButton } from "components";
import { useUserStore } from "packages";
let unsubscribeFromContacts;

export function AddedFavoritesScreen({ navigation }) {
  const { uid } = useUserStore(state => state.user);
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const _renderItem = ({ item, index }) => {
    const title = `Emergency Contact : ${index + 1}`;
    return (
      <List.Item
        title={title}
        description={item}
        left={props => <List.Icon {...props} icon="phone" />}
      />
    );
  };
  useEffect(() => {
    async function fetchContacts() {
      try {
        unsubscribeFromContacts = await firestore
          .doc(`users/${uid}`)
          .onSnapshot(snapshot => {
            const favorites = snapshot.data().favorites;
            setFetchedContacts(favorites);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (uid) fetchContacts();

    return () => {
      if (unsubscribeFromContacts) {
        return unsubscribeFromContacts();
      }
    };
  }, [uid]);

  return (
    <>
      <AppBar navigation={navigation} title="Your Favorites" />
      <View>
        <FlatList
          data={fetchedContacts}
          renderItem={_renderItem}
          keyExtractor={item => item}
        />
      </View>
      <AddFloatingButton
        onPress={() =>
          navigation.navigate("ManageFavorites", {
            contacts: fetchedContacts
          })
        }
      />
    </>
  );
}
