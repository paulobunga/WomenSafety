import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Share,
  Alert
} from "react-native";
import { Card, Text, Button, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { callNumber, formatSecondsToDate } from "utils";
import {
  useTranslatedText,
  Loading,
  SomethingWentWrong,
  CenteredText
} from "components";
import { childService, useMyMissingChildRequests } from "packages";
import { useMutation } from "react-query";
import { IChild } from "src/types";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "config/colors";

let queryRefetch;
const shareMessage = (item: any) => {
  const shareOptions = {
    title: `Blood is required (${item.type})`,
    message: `Contact person - ${item.contact}`,
    subject: `Blood Required`
  };

  Share.share(shareOptions);
};

const { height, width } = Dimensions.get("window");

export function MyMissingChildrenRequests() {
  const {
    status,
    data,
    isFetchingMore,
    loadMore,
    refetch
  } = useMyMissingChildRequests();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  queryRefetch = refetch;

  const renderFooter = () => {
    if (isFetchingMore) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  };

  const renderList = () => {
    if (data.length === 0) {
      if (status === "error") {
        return <SomethingWentWrong onRetry={refetch} />;
      }

      if (status === "loading") {
        return <Loading />;
      }

      if (status === "success") {
        return <CenteredText>No data found</CenteredText>;
      }
    } else {
      return (
        <FlatList
          data={data}
          onRefresh={refetch}
          renderItem={({ item }: any) => <ChildItem item={item} />}
          keyExtractor={(item: any) => item.id}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={status === "loading"}
        />
      );
    }

    return null;
  };

  return <SafeAreaView style={styles.container}>{renderList()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingBottom: 120,
    backgroundColor: colors["background"]
  },
  label: {
    fontWeight: "bold",
    color: colors["red"]
  },
  cardCoverContainer: {
    marginLeft: 8,
    height: 90,
    width: 90,
    borderRadius: 50
  }
});

function ChildItem({ item }: { item: IChild }) {
  const age = useTranslatedText("age");
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");
  const postedOn = useTranslatedText("postedOn");

  return (
    <Card style={{ backgroundColor: "white",  margin: 15, marginBottom: 5, elevation: 10 }}>
      <Card.Content
        style={{
          flexDirection: "row"
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Card.Cover
            source={{ uri: item.image }}
            style={styles.cardCoverContainer}
          />
          <Title
            style={{
              fontWeight: "bold",
              color: colors["red"]
            }}
          >
            {item.name}
          </Title>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>{age}: </Text>
            <Text>
              {" "}
              {item.age}
              {" yrs"}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 30,
            paddingTop: 20,
            justifyContent: "space-around",
            alignItems: "flex-start"
          }}
        >
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
            <Text> {item.address} </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 50
            }}
          >
            <Text numberOfLines={2} style={styles.label}>
              {postedOn}:{" "}
            </Text>
            <Text numberOfLines={2} ellipsizeMode={"tail"}>
              {" "}
              {formatSecondsToDate(item.created_at.seconds)}{" "}
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <MarkAsfound item={item} />
      </Card.Actions>
    </Card>
  );
}

function MarkAsfound({ item }: any) {
  const [mutate, { status }] = useMutation(
    childService.onRemoveChildMissingRequest,
    {
      onSuccess: () => {
        if (queryRefetch) {
          queryRefetch();
        }
      },
      onError: () => {}
    }
  );

  const showAlert = () => {
    Alert.alert(
      "Are you sure?",
      "Marking as found will remove this request from listing",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirm", onPress: () => mutate({ id: item.id }) }
      ]
    );
  };

  return (
    <Button icon="check" onPress={showAlert}>
      Mark as found
    </Button>
  );
}
