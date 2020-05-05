import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { useTranslatedText, AppBar } from "components";
import { colors } from "config/colors";

const { height, width } = Dimensions.get("window");

function EmergencyItems({ img, title, contactNo }, props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: props.transparent
                ? "transparent"
                : "rgba(0,0,0,0.5)",
            },
          ]}
        >
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { fontSize: 20 }]}>
              Helpline Number
            </Text>
            <Text style={[styles.modalText, { fontSize: 17 }]}>
              {title} : {contactNo}
            </Text>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: colors["red"] }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Card style={[styles.card, { flexDirection: "row" }]}>
        <Card.Content>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <Card.Cover source={img} style={styles.cardCoverContainer} />
            <Title style={styles.label}>{title}</Title>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}

export function EmergencyScreen({ navigation }) {
  console.log("navigation", navigation);
  const emergencyContacts = useTranslatedText("emergencyContacts");
  const ambulance = useTranslatedText("ambulance");
  const police = useTranslatedText("police");
  const alert = useTranslatedText("alert");
  const violence = useTranslatedText("violence");
  const kidnapping = useTranslatedText("kidnapping");
  const fireFighter = useTranslatedText("fireFighter");

  const data = [
    {
      contactNo: "102/108",
      img: require("./asssets/ambulance.png"),
      title: ambulance,
    },
    {
      contactNo: "100",
      img: require("./asssets/policeman.png"),
      title: police,
    },
    {
      contactNo: "112",
      img: require("./asssets/alert.png"),
      title: alert,
    },
    {
      contactNo: "1091/1291",
      img: require("./asssets/violence.png"),
      title: violence,
    },
    {
      contactNo: "181",
      img: require("./asssets/kidnapping.png"),
      title: kidnapping,
    },
    {
      contactNo: "101",
      img: require("./asssets/fireman.png"),
      title: fireFighter,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title={emergencyContacts} navigation={navigation} />
      <Text style={[styles.label, { marginVertical: 30, fontSize: 15 }]}>
        Here You Will See The Latest News Of the Application
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <EmergencyItems
            img={item.img}
            title={item.title}
            contactNo={item.contactNo}
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        //style={{marginTop: 50}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingBottom: 60,
    backgroundColor: colors["background"],
  },
  label: {
    fontWeight: "bold",
    color: colors["red"],
    textAlign: "center",
    paddingTop: 10
  },
  cardCoverContainer: {
    height: 68,
    width: 60,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    margin: 15,
    marginBottom: 20,
    elevation: 10,
    width: Dimensions.get("window").width / 2.4,
    height: 135,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 30,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: colors["red"],
  },
  openButton: {
    //backgroundColor: "#F194FF",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    elevation: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
