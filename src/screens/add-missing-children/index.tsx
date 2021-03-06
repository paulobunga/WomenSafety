import React, { useEffect, useState } from "react";
import { AppBar, ErrorText, useTranslatedText } from "components";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { useForm } from "react-hook-form";
import { useUserStore, childService } from "packages";
import { useMutation } from "react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export function AddMissingChildren({ navigation }) {
  let { phoneNumber } = useUserStore(state => state.user);
  const [image, setImage] = useState(null);
  const { register, handleSubmit, setValue, errors } = useForm();
  const childInfoForm = useTranslatedText("childInfoForm");
  const name = useTranslatedText("name");
  const age = useTranslatedText("age");
  const address = useTranslatedText("address");
  const phone = useTranslatedText("phone");

  const [mutate, { status }] = useMutation(
    childService.onSubmitMissingChildren,
    {
      onSuccess: () => {
        navigation.navigate("ChildListing");
      },
      onError: () => {}
    }
  );

  const pickImage = () => {
    ImagePicker.showImagePicker({ noData: true }, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log("response ", response);
        setImage(response.path);
        setValue("image", response.path);
      }
    });
  };

  const onSubmit = (formValues: any) => {
    mutate({ ...formValues, user_id: phoneNumber });
  };

  useEffect(() => {
    register("name", { required: true });
    register("age", { required: true });
    register("image", { required: true });
    register("contact", { required: true });
    register("address", { required: true });
  }, [register]);

  return (
    <>
      <AppBar title={childInfoForm} isModal navigation={navigation} />

      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{ width: "80%" }}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label={name}
              multiline
              error={errors.name ? true : false}
              onChangeText={text => setValue("name", text)}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label={age}
              keyboardType="phone-pad"
              error={errors.age ? true : false}
              onChangeText={text => setValue("age", text)}
            />
            <TextInput
              mode="outlined"
              style={styles.input}
              label={phone}
              keyboardType="phone-pad"
              error={errors.age ? true : false}
              onChangeText={text => setValue("contact", text)}
            />

            <TextInput
              mode="outlined"
              style={styles.input}
              label={address}
              multiline
              error={errors.address ? true : false}
              onChangeText={text => setValue("address", text)}
            />

            <TouchableOpacity onPress={pickImage} style={{ marginBottom: 10 }}>
              <MaterialCommunityIcons name="camera-image" size={25} />
              {errors.image && (
                <ErrorText message="Select an image"></ErrorText>
              )}
            </TouchableOpacity>

            {image ? (
              <Image
                source={{ uri: "file://" + image }}
                style={{ height: 100, width: 100, marginBottom: 10 }}
              />
            ) : null}

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
      </KeyboardAwareScrollView>
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
    marginBottom: 20,
    backgroundColor: "white"
  }
});
