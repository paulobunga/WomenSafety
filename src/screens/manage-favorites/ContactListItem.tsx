import * as React from "react";
import { Checkbox, Colors } from "react-native-paper";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { colors } from "config/colors";

interface IProps {
    name: string;
    id: string;
    contactNumber: string;
    selected: boolean;
    onSelect: (id: string) => null;
}
const ContactListItem = ({ name, contactNumber, selected, onSelect, id }) => (
    <TouchableOpacity
        onPress={() => {
            onSelect(id);
        }}
        style={{
            backgroundColor: selected
                ? colors["cool-grey-200"]
                : colors["cool-grey-050"]
        }}
    >
        <List.Item
            title={name}
            description={contactNumber}
            left={props => <List.Icon {...props} icon="phone" />}
            right={props => (
                <Checkbox status={selected ? "checked" : "unchecked"} />
            )}
        />
    </TouchableOpacity>
);

export default ContactListItem;
