import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Forgot() {
  const router = useRouter();

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleReset() {
    if (!senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert("Senha redefinida com sucesso!");
    router.push("/TelaLogin");
  }

  return (
    <ImageBackground
      source={require("../assets/images/loginfundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subtitle}>
          Digite sua nova senha abaixo.
        </Text>

        <Text style={styles.label}>Nova senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a nova senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          returnKeyType="next"
        />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          returnKeyType="done"
          onSubmitEditing={handleReset}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Redefinir senha</Text>
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
    marginTop: 50,
    padding: 30,
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
    color: "#000000",
    marginLeft: 50,
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    width: 350,
    marginLeft: 50,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    width: 350,
    marginLeft: 50,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});