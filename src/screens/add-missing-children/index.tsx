import React, { useEffect, useState } from "react";
import { AppBar, ErrorText, useTranslatedText } from "components";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { useForm } from "react-hook-form";
import { useUserStore, childService } from "packages";
import { useMutation } from "react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { colors } from "config/colors";

const { height, width } = Dimensions.get("window");
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
          <View style={{ width: "80%", marginTop: 20,}}>
            <TextInput
              mode="flat"
              style={styles.input}
              label={name}
              multiline
              error={errors.name ? true : false}
              onChangeText={text => setValue("name", text)}
            />
            <TextInput
              style={styles.input}
              mode="flat"
              label={age}
              keyboardType="phone-pad"
              error={errors.age ? true : false}
              onChangeText={text => setValue("age", text)}
            />
            <TextInput
              mode="flat"
              style={styles.input}
              label={phone}
              keyboardType="phone-pad"
              error={errors.age ? true : false}
              onChangeText={text => setValue("contact", text)}
            />

            <TextInput
              mode="flat"
              style={styles.input}
              label={address}
              multiline
              error={errors.address ? true : false}
              onChangeText={text => setValue("address", text)}
            />

            <TouchableOpacity onPress={pickImage} style={[styles.touchableOpacity,{paddingLeft:35}]}>
              <MaterialCommunityIcons name="camera-image" size={25} />
              { !errors.image ? ( <Text style={[styles.imgText,{paddingLeft: 10}]}>Upload Image</Text>) :
                (<ErrorText  message="Select an image"></ErrorText>
              )}
            </TouchableOpacity>

            {image ? (
              <Image
                source={{ uri: "file://" + image }}
                style={{ height: 100, width: 100, marginBottom: 10 }}
              />
            ) : null}

            <Button
              style={[styles.touchableOpacity, styles.text]}
              mode="contained"
              disabled={status === "loading"}
              loading={status === "loading"}
              onPress={handleSubmit(onSubmit)}
              uppercase={false}
            >
              <Text style={styles.imgText}>Submit</Text>
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
    alignItems: "center",
    height: height,
    width: width,
    backgroundColor: colors["background"]
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 7,
  },
  touchableOpacity: {
    marginTop: 10,
    marginBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems:'center',
    borderRadius: 50,
    height: 50,
    width: 200, 
    backgroundColor: "white",
    elevation: 10, 
    marginHorizontal: 40
  },
  text: {
    justifyContent: 'center',
  },
  imgText: {
    color: colors["red"], 
    fontSize: 17,
    fontWeight: 'bold',
  }
});
