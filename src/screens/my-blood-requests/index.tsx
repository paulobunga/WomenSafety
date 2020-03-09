import React from "react";
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
import { Card, Text, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { callNumber, formatSecondsToDate } from "utils";
import { useTranslatedText } from "components";
import {
  useMyBloodRequests,
  bloodService,
  refetchMyBloodRequestsQuery
} from "packages";
import { useMutation } from "react-query";

const shareMessage = (item: any) => {
  const shareOptions = {
    title: `Blood is required (${item.type})`,
    message: `Contact person - ${item.contact}`,
    subject: `Blood Required`
  };

  Share.share(shareOptions);
};

const { height, width } = Dimensions.get("window");

export function MyBloodRequests() {
  const {
    status,
    data,
    isFetchingMore,
    loadMore,
    refetch
  } = useMyBloodRequests();

  const renderFooter = () => {
    if (isFetchingMore) {
      return <ActivityIndicator />;
    } else {
      return null;
    }
  };

  const renderList = () => {
    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          onRefresh={refetch}
          renderItem={({ item }: any) => <BloodListItem item={item} />}
          keyExtractor={(item: any) => item.id}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={status === "loading"}
        />
      );
    } else if (status === "loading") {
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
      <Card.Actions>
        <MarkAsDone item={item} />
      </Card.Actions>
    </Card>
  );
};

function MarkAsDone({ item }: any) {
  const [mutate, { status }] = useMutation(bloodService.onRemoveBloodRequest, {
    onSuccess: () => {
      refetchMyBloodRequestsQuery();
    },
    onError: () => {}
  });

  const showAlert = () => {
    Alert.alert(
      "Are you sure?",
      "Marking as done will remove this request from listing",
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
      Mark as done
    </Button>
  );
}
