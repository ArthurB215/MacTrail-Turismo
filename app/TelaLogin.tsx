import React, { useState } from "react";
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    router.push("/TelaPrincipal"); 
  }

  return (
    <ImageBackground
      source={require("../assets/images/loginfundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Faça login na sua conta.</Text>
        <Text style={styles.title}>conta.</Text>
        <Text style={styles.subtitle}>
          Insira seu e-mail e senha para fazer login.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Conectar</Text>
        </TouchableOpacity>

        <Text style={styles.or}>_________________________ Ou _________________________</Text>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/googlelogo.png")}
            style={styles.icon}
          />
          <Text>Continuar com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/facebooklogo.png")}
            style={styles.icon}
          />
          <Text>Continuar com o Facebook</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 50,
    padding: 30
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#000000",
    marginBottom: 20,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#ffffff",
    marginLeft: 50
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    width: 350,
    marginLeft: 50
  },

  forgot: {
    textAlign: "right",
    color: "#1e90ff",
    marginTop: 5,
    marginRight: 55
  },

  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    width: 200,
    marginLeft: 125
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  or: {
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
    width: 350,
    marginLeft: 50
  },

  icon: {
    width: 20,
    height: 20,
  },
});