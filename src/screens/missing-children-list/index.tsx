import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Share
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
import { useMissingChildrenRequests } from "packages";
import { IChild } from "src/types";
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

export function MissingChildrenList() {
  const isFocused = useIsFocused();

  const {
    status,
    data,
    isFetchingMore,
    loadMore,
    refetch
  } = useMissingChildrenRequests();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

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
        <View style={{backgroundColor: colors["background"]}}>
        return <CenteredText>No data found</CenteredText>;
        </View>
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

  if (status === "error" && data.length === 0) {
    return (
      <View>
        <Text>Something went wrong!</Text>
        <Button onPress={refetch}>Retry</Button>
      </View>
    );
  }

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
    borderRadius: 50,
  },
});

function ChildItem({ item }: { item: IChild }) {
  console.log("item child", item);
  const age = useTranslatedText("age");
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");
  const postedOn = useTranslatedText("postedOn");

  return (
    <Card style={{ backgroundColor: "white", margin: 15, elevation: 10 }}>
      <Card.Content>
        <View>
      <Card.Cover source={{ uri: item.image }} style={styles.cardCoverContainer} />
        <Title style={{fontWeight: "bold", color: colors["red"], paddingLeft: 25}}>
          {item.name}
        </Title>
        <View style={{ flexDirection: "row",paddingLeft: 20 }}>
        <Text style={styles.label}>{age}: </Text>
          <Text> {item.age}{" yrs"} </Text>
          </View>
          <View style={{flexDirection:'column',position: 'absolute',paddingLeft:120, paddingVertical: 30}}>
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
        <View style={{ flexDirection: "row", alignItems:'center', paddingBottom: 50 }}>
          <Text numberOfLines={2} style={styles.label}>{postedOn}: </Text>
          <Text numberOfLines={2} ellipsizeMode={'tail'}> {formatSecondsToDate(item.created_at.seconds)} </Text>
        </View>
        </View>
        </View>
      </Card.Content>
    </Card>
  );
}
