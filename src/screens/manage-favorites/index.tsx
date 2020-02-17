import { AppBar } from "components";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import ContactListItem from "./ContactListItem";
import AddContactButton from "./AddContactButton";

export function ManageFavorites({ navigation }) {
    const [retrievedContacts, setRetrievedContacts] = useState([]);

    const _renderItem = ({ item }) => {
        return <ContactListItem name={item.name} contactNumber={item.number} />;
    };

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers]
                });

                if (data.length > 0) {
                    const filteredData = data.map(contact => {
                        const key = contact.id;
                        const name = contact.name;
                        const number = contact.phoneNumbers[0].number.replace(
                            /\D/g,
                            ""
                        );
                        const countryCodeRemovedNumber = number.substring(
                            number.length - 10
                        );
                        return { number: countryCodeRemovedNumber, key, name };
                    });
                    setRetrievedContacts(filteredData);
                }
            }
        })();
    }, []);
    return (
        <>
            <AppBar navigation={navigation} title="Manage Favorites" />
            <View>
                <FlatList data={retrievedContacts} renderItem={_renderItem} />
            </View>
            <AddContactButton />
        </>
    );
}
