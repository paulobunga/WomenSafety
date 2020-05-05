import { StyleSheet } from "react-native";
import { colors } from "config/colors";
import theme from "config/theme";

export default {
  containerView: {
    flex: 1,
    backgroundColor: colors['background']
  },
  loginScreenContainer: {
    flex: 1
  },
  logoText: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center"
  },
  loginFormView: {
    flex: 1,
    height: theme.layout.windowHeight - 70,
    paddingTop: '12%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loginTextContainer: {
    flexDirection: 'row', 
    width: "90%", 
    borderWidth: 2, 
    borderColor: "#eaeaea", 
    borderRadius: 8, 
    marginHorizontal: 15, 
    marginVertical: 5, 
    backgroundColor: colors.white
  },
  loginFormTextInput: {
    width: "72%",
    fontSize: 18,
    borderWidth: 0,
    paddingLeft: 10
  },
  countryCodeInput: {
    width: '12%',
    fontSize: 18,
    borderWidth: 0,
    paddingLeft: 10
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  titleText: {
    fontSize: 24,
    paddingVertical: 16,
    textAlign: 'center',
    color: '#D5214E'
  }
};
