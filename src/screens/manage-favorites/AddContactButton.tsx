import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface IProps {
    onPress: () => null;
}
const AddContactButton = ({ onPress }) => (
    <FAB style={styles.fab} icon="plus" onPress={onPress} />
);

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0
    }
});

export default AddContactButton;
