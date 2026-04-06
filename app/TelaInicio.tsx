import {View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useFonts, PlayfairDisplay_400Regular_Italic } from "@expo-google-fonts/playfair-display";

export default function Home() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/telainicio.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>MacTrail</Text>
          <Text style={styles.subtitle}>Turismo</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/TelaPrincipalSL")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 45,
    color: "#fff",
    fontFamily: "PlayfairDisplay_400Regular_Italic",
  },

  subtitle: {
    fontSize: 30,
    color: "#fff",
    marginTop: 8,
    fontFamily: "PlayfairDisplay_400Regular_Italic",
  },

  button: {
    backgroundColor: "rgba(27, 121, 216, 0.8)",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,

  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});