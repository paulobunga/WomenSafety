import color from "color";
import { colors } from "./colors";

import { Theme, DefaultTheme, configureFonts } from "react-native-paper";
const fontConfig = {
  default: {
    regular: {
      fontFamily: "roboto-regular"
    },
    medium: {
      fontFamily: "roboto-medium"
    },
    light: {
      fontFamily: "roboto-light"
    },
    thin: {
      fontFamily: "roboto-light"
    }
  }
};
const CustomTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 6,
  colors: {
    primary: colors["cyan-vivid-900"],
    accent: colors["red-vivid-600"],
    background: colors["cool-grey-200"],
    surface: colors["cyan-vivid-050"],
    error: "#B00020",
    text: colors["cool-grey-900"],
    onBackground: "#000000",
    onSurface: "#000000",
    disabled: color(colors["cool-grey-300"])
      .alpha(0.26)
      .rgb()
      .string(),
    placeholder: color(colors["cool-grey-300"])
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(colors["cool-grey-300"])
      .alpha(0.5)
      .rgb()
      .string(),
    notification: colors["pink-vivid-500"]
  },
  animation: {
    scale: 1.0
  },
  fonts: configureFonts(fontConfig)
};

export default CustomTheme;
