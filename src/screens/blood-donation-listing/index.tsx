import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { Card, Text, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { callNumber, formatSecondsToDate } from "utils";
import {
  useTranslatedText,
  Loading,
  SomethingWentWrong,
  CenteredText,
} from "components";
import { useBloodRequests } from "packages";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "config/colors";

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
          <Text style={styles.text}>{address}: </Text>
          <Text>{item.address}</Text>
        </View>
        <View style={styles.text}>
          <Text style={[styles.label,styles.text]}>{postedOn}: </Text>
          <Text>{formatSecondsToDate(item.created_at.seconds)} </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
