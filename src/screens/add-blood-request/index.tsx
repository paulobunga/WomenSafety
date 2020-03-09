import React, { useEffect, useState } from "react";
import { AppBar, useTranslatedText } from "components";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Picker } from "react-native";
import { useForm } from "react-hook-form";
import {
  bloodService,
  useUserStore,
  refetchMyBloodRequestsQuery
} from "packages";
import { useMutation } from "react-query";

export function AddBloodRequest({ navigation }) {
  let { uid } = useUserStore(state => state.user);
  const bloodRequestForm = useTranslatedText("bloodRequestForm");
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");

  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      address: null,
      contact: null
    }
  });

  const [type, setType] = useState("O+");

  const [mutate, { status }] = useMutation(bloodService.onSubmitBloodRequest, {
    onSuccess: () => {
      navigation.navigate("BloodDonationListing");
      refetchMyBloodRequestsQuery();
    },
    onError: () => {}
  });

  const onSubmit = (formValues: any) => {
    mutate({ ...formValues, type, userId: uid });
  };

  useEffect(() => {
    register("address", { required: true });
    register("contact", { required: true });
  }, [register]);

  return (
    <>
      <AppBar title={bloodRequestForm} isModal navigation={navigation} />
      <View style={styles.container}>
        <View style={{ width: "80%" }}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={address}
            multiline
            error={errors.address ? true : false}
            onChangeText={text => setValue("address", text)}
          />
          <TextInput
            style={styles.input}
            label={phone}
            mode="outlined"
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
    backgroundColor: "white",
    marginBottom: 20
  }
});
