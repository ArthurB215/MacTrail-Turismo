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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/TelaLogin")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => router.push("/TelaPrincipalSL")}
          >
            <Text style={styles.buttonText}>Entrar como convidado</Text>
          </TouchableOpacity>
        </View>
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

  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },

  loginButton: {
    backgroundColor: "rgba(27, 121, 216, 0.9)",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  guestButton: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});