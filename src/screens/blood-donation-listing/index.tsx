import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { Card, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { callNumber, formatSecondsToDate } from "utils";
import {
  useTranslatedText,
  Loading,
  SomethingWentWrong,
  CenteredText
} from "components";
import { useBloodRequests } from "packages";
import { useIsFocused } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export function BloodList() {
  const isFocused = useIsFocused();

  const { status, data, loadMore, refetch } = useBloodRequests();

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
          <Text>{formatSecondsToDate(item.created_at.seconds)} </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
