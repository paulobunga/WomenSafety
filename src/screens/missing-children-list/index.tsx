import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { firestore } from "config/firebase";
import { Card, Title, Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IChild } from "src/types";
import { formatSecondsToDate, callNumber } from "utils";

const { height, width } = Dimensions.get("window");

export function MissingChildrenList() {
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
        .collection("child")
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
          .collection("child")
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
          renderItem={ChildItem}
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

function ChildItem({ item }: { item: IChild }) {
  console.log("item ", item);
  return (
    <Card style={{ backgroundColor: "white", marginBottom: 10 }}>
      <Card.Cover source={{ uri: item.image }} />

      <Card.Content>
        <Title>
          {item.name} (Age: {item.age}
          {"yrs"})
        </Title>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Phone: </Text>
          <TouchableOpacity
            onPress={() => callNumber(item.contact)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text>{item.contact}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Address: </Text>
          <Text> {item.address} </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Posted on: </Text>
          <Text> {formatSecondsToDate(item.createdAt.seconds)} </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold"
  },
  container: {
    height: height,
    width: width,
    paddingBottom: 120
  }
});