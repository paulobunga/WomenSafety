import React, { Component, useReducer, useState, useEffect, Fragment } from "react";
import styles from "./style";
import {
  Image,
  Keyboard,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { Button, Subheading, ActivityIndicator, Title } from "react-native-paper";
import { firebaseAuth } from "config/firebase";
import { useForm } from "react-hook-form";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ErrorText } from "components";
import { colors } from "config/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
let confirmation;

export function LoginScreen() {
  const [showOTPScreen, setShowOTPScreen] = useState(false);

  return (
    <KeyboardAwareScrollView style={styles.containerView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <Title style={styles.titleText}>{!showOTPScreen ? 'Login' : 'Verify Your Phone Number'}</Title>
          <View style={styles.loginFormView}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('./assets/logo.png')} width={200} style={{ width: 200, height: 100, marginBottom: '20%' }} />
              {!showOTPScreen && <Subheading>We will send you an <Subheading style={{ color: colors["primary"] }}>One Time Password</Subheading></Subheading>}
              <Subheading>{showOTPScreen ? 'Enter your OTP code here' : 'on this mobile number'}</Subheading>
              {showOTPScreen ? (
                <OTP onCancel={() => setShowOTPScreen(false)} />
              ) : (
                  <PhoneNumber onSubmit={() => setShowOTPScreen(true)} />
                )}
            </View>
            {!showOTPScreen &&
              <View style={{ alignItems: 'center' }}>
                <Subheading style={{  textAlign: 'center' }}><Subheading>By Providing my phone number, I hearby agree and</Subheading> accept the <Subheading style={{ color: colors["primary"] }}>Terms Of service</Subheading> and <Subheading style={{ color: colors["primary"] }}>Private Policy</Subheading> in use of the app</Subheading>
              </View>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
    <View style={{ marginTop: '8%' }}>
      <View style={styles.loginTextContainer}>
        <TextInput
          defaultValue={"+91"}
          editable={false}
          style={[styles.countryCodeInput,{paddingLeft:0, textAlign: 'right'}]}
        />
        <TextInput
          returnKeyLabel="next"
          onSubmitEditing={handleSubmit(onPhoneSubmit)}
          placeholder="Enter Mobile number"
          keyboardType="phone-pad"
          style={styles.loginFormTextInput}
          onChangeText={text => setValue("phoneNumber", text)}
        />
      </View>
      {errors.phoneNumber ? (
        <ErrorText message={"Please enter a valid phone number"} />
      ) : null}
      {error ? <ErrorText message={error} /> : null}
      {loading ? <ActivityIndicator /> : null}
    </View>
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
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}
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
    color: colors["cyan-vivid-900"],
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
