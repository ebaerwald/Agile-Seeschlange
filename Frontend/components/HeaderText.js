import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const HeaderText = ({ title, type }) => {
  const { currentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const getTextAlign = () => {
    switch (type) {
      case "center":
        return "center";
      case "left":
        return "left";
      case "right":
        return "right";
      default:
        return "center";
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.titleText, { textAlign: getTextAlign() }]}>
        {title}
      </Text>
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    headerContainer: {
      width: "100%",
      marginBottom: 10,
    },
    titleText: {
      color: currentTheme.textColor,
      fontWeight: "bold",
      fontSize: 24,
    },
  });

export default HeaderText;
