import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Share
} from "react-native";
import { firestore } from "config/firebase";
import { Card, Text, Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { callNumber, formatSecondsToDate } from "utils";
import { useTranslatedText } from "components";

const shareMessage = (item: any) => {
  const shareOptions = {
    title: `Blood is required (${item.type})`,
    message: `Contact person - ${item.contact}`,
    subject: `Blood Required`
  };

  Share.share(shareOptions);
};

const { height, width } = Dimensions.get("window");

export function BloodList() {
  let lastVisible = useRef(null);
  const isFocused = useIsFocused();

  const [state, setState] = useState({
    documentData: [],
    limit: 8,
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
    if (state.refreshing) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  };

  const renderList = () => {
    if (state.documentData.length > 0) {
      return (
        <FlatList
          data={state.documentData}
          onRefresh={retrieveData}
          renderItem={({ item }: any) => <BloodListItem item={item} />}
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
  },
  label: {
    fontWeight: "bold"
  }
});

const BloodListItem = ({ item }: any) => {
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");
  const postedOn = useTranslatedText("postedOn");

  return (
    <Card style={{ backgroundColor: "white", marginBottom: 10 }}>
      <Card.Title title={item.type} />
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>{phone}: </Text>
          <TouchableOpacity
            onPress={() => callNumber(item.contact)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text>{item.contact}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>{address}: </Text>
          <Text>{item.address}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>{postedOn}: </Text>
          <Text>{formatSecondsToDate(item.createdAt.seconds)} </Text>
        </View>
      </Card.Content>
      {/* <Card.Actions>
        <Button
          onPress={() => {
            shareMessage(item);
          }}
        >
          Share
        </Button>
      </Card.Actions> */}
    </Card>
  );
};
