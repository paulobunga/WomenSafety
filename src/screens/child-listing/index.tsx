import React from "react";
import { AddFloatingButton } from "components";
import { MissingChildrenList } from "../missing-children-list";
import { View } from 'react-native';
import { colors } from "config/colors";

export function ChildListing({ navigation }) {
  return (
    <>
    <View style={{backgroundColor: colors["background"]}}>
      <MissingChildrenList />
    </View>
    </>
  );
}
