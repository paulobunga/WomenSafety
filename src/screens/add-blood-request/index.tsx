import React, { useEffect, useState } from "react";
import { AppBar } from "components";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Picker } from "react-native";
import { useForm } from "react-hook-form";
import { bloodService } from "packages";
import { useMutation } from "react-query";

export function AddBloodRequest({ navigation }) {
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      address: null,
      contact: null
    }
  });

  const [type, setType] = useState("O+");

  const [mutate, { status }] = useMutation(bloodService.onSubmitBloodRequest, {
    onSuccess: () => {},
    onError: () => {}
  });

  useEffect(() => {
    if (status === "success") {
      navigation.navigate("BloodDonationListing");
    }
  }, [status]);

  const onSubmit = ({ address, contact }) => {
    mutate({ address, contact, type });
  };

  useEffect(() => {
    register("address", { required: true });
    register("contact", { required: true });
  }, [register]);

  return (
    <>
      <AppBar title="Add blood request" isModal navigation={navigation} />
      <View style={styles.container}>
        <View style={{ width: "80%" }}>
          <TextInput
            style={styles.input}
            label="Address"
            multiline
            error={errors.address ? true : false}
            onChangeText={text => setValue("address", text)}
          />
          <TextInput
            style={styles.input}
            label="Contact"
            keyboardType="phone-pad"
            error={errors.contact ? true : false}
            onChangeText={text => setValue("contact", text)}
          />
          <Picker
            style={styles.input}
            selectedValue={type}
            onValueChange={itemValue => {
              setType(itemValue);
            }}
          >
            <Picker.Item label="O (+)" value="O+" />
            <Picker.Item label="O (-)" value="O-" />
            <Picker.Item label="A (-)" value="A-" />
            <Picker.Item label="AB (+)" value="AB+" />
            <Picker.Item label="AB (-)" value="AB-" />
            <Picker.Item label="B (+)" value="B+" />
            <Picker.Item label="B (-)" value="B-" />
          </Picker>
          <Button
            mode="contained"
            disabled={status === "loading"}
            loading={status === "loading"}
            onPress={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center"
  },
  input: {
    marginBottom: 20
  }
});
