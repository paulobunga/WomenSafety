import * as React from "react";
import { List } from "react-native-paper";

interface IProps {
    name: string;
    contactNumber: string;
}
const ContactListItem = ({ name, contactNumber }) => (
    <List.Item
        title={name}
        description={contactNumber}
        left={props => <List.Icon {...props} icon="phone" />}
    />
);

export default ContactListItem;
