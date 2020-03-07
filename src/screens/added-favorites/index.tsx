import { AppBar } from "components";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { List } from "react-native-paper";
import * as Contacts from "expo-contacts";
import { firestore } from "config/firebase";
import { useUserStore } from "packages";
import AddContactButton from "../manage-favorites/AddContactButton";

export function AddedFavorites({ navigation }) {
    const { uid } = useUserStore(state => state.user);
    const unsubscribeFromContacts = useRef(null);
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
                unsubscribeFromContacts.current = await firestore
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
        return unsubscribeFromContacts.current;
    }, [uid]);

    return (
        <>
            <AppBar navigation={navigation} title="Added Favorites" />
            <View>
                <FlatList
                    data={fetchedContacts}
                    renderItem={_renderItem}
                    keyExtractor={item => item}
                />
            </View>
            <AddContactButton
                onPress={() =>
                    navigation.navigate("ManageFavorites", {
                        contacts: fetchedContacts
                    })
                }
            />
        </>
    );
}
