import { AppBar, useTranslatedText } from "components";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import ContactListItem from "./ContactListItem";
import { firestore } from "config/firebase";
import { default as firestoreImpl } from "@react-native-firebase/firestore";
import { useUserStore } from "packages";
import { colors } from "config/colors";
import { Searchbar } from "react-native-paper";

export function ManageFavorites({ navigation, route }) {
  const favoriteContacts = route.params.contacts;
  const addFavoritesText = useTranslatedText("addFavorites");

  const { phoneNumber } = useUserStore(state => state.user);
  const [retrievedContacts, setRetrievedContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selectedContacts);
      if (!selectedContacts.has(id)) {
        newSelected.set(id, true);
      } else {
        newSelected.delete(id);
      }
      setSelectedContacts(newSelected);
    },
    [selectedContacts]
  );
  const addContacts = async () => {
    const filteredContacts = Array.from(selectedContacts.keys());
    const extensionAddedContacts = filteredContacts.map(
      contact => `+91${contact}`
    );
    try {
      await firestore.doc(`users/${phoneNumber}`).update({
        favorites: firestoreImpl.FieldValue.arrayUnion(
          ...extensionAddedContacts
        )
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation.goBack();
    }
  };

  const SearchFilterFunction = ({item}) => {
    console.log('item', item)
      const contactData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = item.toUpperCase();

      console.log (contactData.indexOf(textData) > -1);
    }

  const _renderItem = ({ item }) => {
    const receivedItemPhoneNumber = `+91${item.number}`;
    if (favoriteContacts.includes(receivedItemPhoneNumber)) return null;
    return (
      <ContactListItem
        name={item.name}
        contactNumber={item.number}
        selected={selectedContacts.has(item.number)}
        onSelect={onSelect}
        id={item.number}
      />
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          const filteredData = data
            .filter(contact => contact.phoneNumbers)
            .map(contact => {
              const key = contact.id;
              const name = contact.name;
              const number = contact.phoneNumbers[0].number.replace(/\D/g, "");
              const countryCodeRemovedNumber = number.substring(
                number.length - 10
              );

              return {
                number: countryCodeRemovedNumber,
                key,
                name
              };
            });
          setRetrievedContacts(filteredData);
        }
      }
    })();
  }, []);
  const isSelectingContacts = Array.from(selectedContacts.values()).includes(
    true
  );
  return (
    <>
      <AppBar
        navigation={navigation}
        title={addFavoritesText}
        isModal
        onSelectingContacts={addContacts}
        isSelectingContacts={isSelectingContacts}
      />
      <View>
      <Searchbar
        placeholder="Search"
        onChangeText={item => SearchFilterFunction({item})}
        value={item => item.name}
        style={{backgroundColor: colors.background}}
      />
        <FlatList
          data={retrievedContacts}
          renderItem={_renderItem}
          keyExtractor={item => item.key}
          extraData={selectedContacts}
          style={{backgroundColor: colors.background}}
        />
      </View>
    </>
  );
}
