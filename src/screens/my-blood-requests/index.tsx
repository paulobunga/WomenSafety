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
import { useMyBloodRequests, bloodService } from "packages";
import { useMutation } from "react-query";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "config/colors";

const shareMessage = (item: any) => {
  const shareOptions = {
    title: `Blood is required (${item.type})`,
    message: `Contact person - ${item.contact}`,
    subject: `Blood Required`
  };

  Share.share(shareOptions);
};

const { height, width } = Dimensions.get("window");
let queryRefetch;
export function MyBloodRequests() {
  const isFocused = useIsFocused();
  const { status, data, loadMore, refetch } = useMyBloodRequests();
  queryRefetch = refetch;

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderFooter = () => {
    if (status === "loadingMore") {
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
          renderItem={({ item }: any) => <BloodListItem item={item} />}
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
    fontWeight: "bold"
  },
  text: {
    color: colors["red"],
    flexDirection: "row"
  }
});

const BloodListItem = ({ item }: any) => {
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");
  const postedOn = useTranslatedText("postedOn");
  const markAsFound = useTranslatedText("Mark as found");

  return (
    <Card style={{ backgroundColor: "white", margin: 15, marginBottom: 5, elevation:10 }}>
     <Card.Content>
      <Title style={styles.text}>
          {item.type}
      </Title>
        <View style={styles.text}>
          <Text style={[styles.label,styles.text]}>{phone}: </Text>
          <TouchableOpacity
            onPress={() => callNumber(item.contact)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text>{item.contact}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.text}>
          <Text style={[styles.label,styles.text]}>{address}: </Text>
          <Text>{item.address}</Text>
        </View>
        <View style={styles.text}>
          <Text style={[styles.label,styles.text]}>{postedOn}: </Text>
          <Text>{formatSecondsToDate(item.created_at.seconds)} </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <MarkAsfound item={item} />
      </Card.Actions>
    </Card>
  );
};

function MarkAsfound({ item }: any) {
  const markAsFound = useTranslatedText("markAsFound");
  const [mutate, { status }] = useMutation(bloodService.onRemoveBloodRequest, {
    onSuccess: () => {
      if (queryRefetch) {
        queryRefetch();
      }
    },
    onError: () => {}
  });

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
      {markAsFound}
    </Button>
  );
}
