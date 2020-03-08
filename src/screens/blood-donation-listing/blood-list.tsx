import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Linking,
  Alert
} from "react-native";
import { firestore } from "config/firebase";
import { Card, Paragraph, Text, Subheading } from "react-native-paper";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

const { height, width } = Dimensions.get("window");

export function BloodList() {
  let lastVisible = useRef(null);
  const isFocused = useIsFocused();

  const [state, setState] = useState({
    documentData: [],
    limit: 4,
    loading: false,
    refreshing: false
  });

  useEffect(() => {
    if (isFocused) {
      retrieveData();
    }
  }, [isFocused]);

  const retrieveData = async () => {
    try {
      setState({
        ...state,
        loading: true
      });
      console.log("Retrieving Data");
      let initialQuery = await firestore
        .collection("blood")
        .orderBy("createdAt", "desc")
        .limit(state.limit);
      let documentSnapshots = await initialQuery.get();
      lastVisible.current =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      let documentData = documentSnapshots.docs.map(document =>
        document.data()
      );
      setState({
        ...state,
        documentData: documentData,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveMore = async () => {
    console.log("Retrieving more");

    try {
      if (lastVisible.current) {
        setState({
          ...state,
          refreshing: true
        });

        let additionalQuery = await firestore
          .collection("blood")
          .orderBy("createdAt", "desc")
          .startAfter(lastVisible.current)
          .limit(state.limit);

        let documentSnapshots = await additionalQuery.get();
        lastVisible.current =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        let documentData = documentSnapshots.docs.map(document =>
          document.data()
        );

        setState({
          ...state,
          documentData: [...state.documentData, ...documentData],
          refreshing: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFooter = () => {
    try {
      // Check If Loading
      if (state.refreshing) {
        return <ActivityIndicator />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderList = () => {
    if (state.documentData.length > 0) {
      return (
        <FlatList
          data={state.documentData}
          onRefresh={retrieveData}
          renderItem={({ item }: any) => (
            <Card style={{ backgroundColor: "white", marginBottom: 10 }}>
              <Card.Title
                title={item.type}
                subtitle={format(
                  new Date(item.createdAt?.seconds * 1000),
                  "yyyy-MM-dd HH:mm"
                )}
              />
              <Card.Content>
                <TouchableOpacity
                  onPress={() => callNumber(item.contact)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <MaterialCommunityIcons name="phone" size={20} />
                  <Text style={{ marginLeft: 10 }}>{item.contact}</Text>
                </TouchableOpacity>
                <Paragraph>{item.address}</Paragraph>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={renderFooter}
          onEndReached={retrieveMore}
          onEndReachedThreshold={0.3}
          refreshing={state.loading}
        />
      );
    } else if (state.loading) {
      return <ActivityIndicator />;
    }
    return null;
  };

  return <SafeAreaView style={styles.container}>{renderList()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingBottom: 120
  }
});
