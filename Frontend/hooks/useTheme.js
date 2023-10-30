import { useColorScheme } from "react-native";

const theme = {
  light: {
    backgroundColor: "#7ea8e7",
    textColor: "#14213d",
    borderColor: "#14213d",
    statusBarStyle: "dark",
  },
  dark: {
    backgroundColor: "#2D2B2B",
    textColor: "#ffffff",
    borderColor: "#e5e5e5",
    statusBarStyle: "light",
  },
};

const getTheme = ({ osColorScheme, appColorScheme }) => {
  if (appColorScheme === "auto") {
    return theme[osColorScheme];
  } else {
    return theme[appColorScheme];
  }
};

const useTheme = ({ currentAppColorScheme }) => {
  const currentOSColorScheme = useColorScheme();
  return getTheme({
    osColorScheme: currentOSColorScheme,
    appColorScheme: currentAppColorScheme,
  });
};

export { useTheme };
