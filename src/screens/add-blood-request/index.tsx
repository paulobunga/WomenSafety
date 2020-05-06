import React, { useEffect, useState } from "react";
import { AppBar, useTranslatedText } from "components";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Picker,Text } from "react-native";
import { useForm } from "react-hook-form";
import { bloodService, useUserStore } from "packages";
import { useMutation } from "react-query";
import { colors } from "config/colors";

export function AddBloodRequest({ navigation }) {
  let { phoneNumber } = useUserStore(state => state.user);
  const bloodRequestForm = useTranslatedText("bloodRequestForm");
  const phone = useTranslatedText("phone");
  const address = useTranslatedText("address");
  const submit = useTranslatedText("submit");

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
    },
    onError: () => {}
  });

  const onSubmit = (formValues: any) => {
    mutate({ ...formValues, type, user_id: phoneNumber });
  };

  useEffect(() => {
    register("address", { required: true });
    register("contact", { required: true });
  }, [register]);

  return (
    <>
      <AppBar title={bloodRequestForm} isModal navigation={navigation} />
      <View style={styles.container}>
        <View style={{ width: "80%",marginTop: 20,  }}>
          <TextInput
            style={styles.input}
            mode="flat"
            label={address}
            multiline
            error={errors.address ? true : false}
            onChangeText={text => setValue("address", text)}
          />
          <TextInput
            style={styles.input}
            label={phone}
            mode="flat"
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
            <Picker.Item label="A (+)" value="A+" />
            <Picker.Item label="A (-)" value="A-" />
            <Picker.Item label="AB (+)" value="AB+" />
            <Picker.Item label="AB (-)" value="AB-" />
            <Picker.Item label="B (+)" value="B+" />
            <Picker.Item label="B (-)" value="B-" />
          </Picker>
          <Button
            style={styles.touchableOpacity}
            mode="contained"
            disabled={status === "loading"}
            loading={status === "loading"}
            onPress={handleSubmit(onSubmit)}
            uppercase={false}
          >
            <Text style={styles.imgText}>{submit}</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors["background"],
  },
  input: {
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 10,
    borderRadius: 7,
  },
  touchableOpacity: {
    marginTop: 10,
    marginBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 50,
    height: 50,
    width: 200, 
    backgroundColor: "white",
    elevation: 10, 
    marginHorizontal: 40
  },
  imgText: {
    color: colors["red"], 
    fontSize: 17
  }
});
