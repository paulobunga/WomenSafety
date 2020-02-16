import React, { Component, useReducer, useState, useEffect } from "react";
import styles from "./style";
import {
  Keyboard,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { Button, Text, Headline, ActivityIndicator } from "react-native-paper";
import { firebaseAuth } from "config/firebase";
import { useForm } from "react-hook-form";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ErrorText } from "components";
let confirmation;

export function LoginScreen() {
  const [showOTPScreen, setShowOTPScreen] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Headline style={styles.logoText}>WomenSafety</Headline>
            {showOTPScreen ? (
              <OTP onCancel={() => setShowOTPScreen(false)} />
            ) : (
              <PhoneNumber onSubmit={() => setShowOTPScreen(true)} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const PhoneNumber = ({ onSubmit }: { onSubmit: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, setValue, errors } = useForm();

  useEffect(() => {
    register("phoneNumber", { required: true, pattern: /^[0-9]{10}$/ });
  }, [register]);

  const onPhoneSubmit = async ({ phoneNumber }) => {
    setLoading(true);
    try {
      confirmation = await firebaseAuth.signInWithPhoneNumber(
        "+91 " + phoneNumber
      );
      onSubmit();
    } catch (e) {
      console.log("Error ", e);
      setError("Invalid number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "25%" }}>
          <TextInput
            defaultValue={"+91"}
            editable={false}
            style={styles.countryCodeInput}
          />
        </View>
        <View style={{ width: "75%" }}>
          <TextInput
            placeholder="Enter Mobile number"
            keyboardType="phone-pad"
            style={styles.loginFormTextInput}
            onChangeText={text => setValue("phoneNumber", text)}
          />
          <Text>
            {errors.phoneNumber ? (
              <ErrorText message={"Please enter a valid phone number"} />
            ) : null}
          </Text>
        </View>
      </View>
      <Button disabled={loading} onPress={handleSubmit(onPhoneSubmit)}>
        Submit
      </Button>
      {loading ? <ActivityIndicator /> : null}
      {error ? <ErrorText message={error} /> : null}
    </>
  );
};

const OTP = ({ onCancel }: { onCancel: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onOTPSubmit = async otp => {
    setLoading(true);
    try {
      await confirmation.confirm(otp);
    } catch (e) {
      setError("Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", width: "100%" }}
    >
      <OTPInputView
        style={{ width: "80%", height: 200, color: "black" }}
        pinCount={6}
        autoFocusOnLoad
        placeholderTextColor={"#000"}
        codeInputFieldStyle={otpStyles.underlineStyleBase}
        codeInputHighlightStyle={otpStyles.underlineStyleHighLighted}
        onCodeFilled={code => {
          onOTPSubmit(code);
        }}
      />
      <Button disabled={loading} onPress={onCancel}>
        Cancel
      </Button>
      {loading ? <ActivityIndicator /> : null}
      {error ? <ErrorText message={error} /> : null}
    </View>
  );
};

const otpStyles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6"
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6"
  }
});

// const initialState: State = {
//   showOTPScreen: false,
//   verifyingOTP: false,
//   success: false
// };

// const types = {
//   SHOW_OTP_SCREEN: "SHOW_OTP_SCREEN",
//   VERIFYING_OTP: "VERIFYING_OTP",
//   SUCCESS: "SUCCESS",
//   CANCEL: "CANCEL"
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case types.SHOW_OTP_SCREEN:
//       return { ...state, showOTPScreen: true };
//     case types.VERIFYING_OTP:
//       return { ...state, showOTPScreen: false, verifyingOTP: true };
//     case types.SUCCESS:
//       return { ...initialState, success: true };
//     case types.CANCEL:
//       return { ...initialState };
//     default:
//       return state;
//   }
// };

// const [loginState, dispatch] = useReducer(reducer, initialState);

// interface State {
//   showOTPScreen: boolean;
//   verifyingOTP: boolean;
//   success: boolean;
// }
