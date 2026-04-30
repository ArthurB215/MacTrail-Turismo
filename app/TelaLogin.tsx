import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import ForgotModal from "../src/components/ModalEmail";
import { usuario } from "../src/constants/user";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleLogin() {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (email === usuario.email && senha === usuario.senha) {
      router.push("/TelaPrincipal");
    } else {
      alert("Email ou senha inválidos!");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/loginfundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Faça login na sua conta.</Text>
        <Text style={styles.subtitle}>
          Insira seu e-mail e senha para fazer login.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Conectar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/Cadastro")}
          >
            <Text style={styles.createButtonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>────────────── OU ──────────────</Text>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/googlelogo.png")}
            style={styles.icon}
          />
          <Text>Continuar com o Google</Text>
        </TouchableOpacity>
      </View>

      <ForgotModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  },
  forgot: {
    textAlign: "right",
    color: "#1e90ff",
    marginTop: 5,
    marginRight: 45,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 150,
  },
  createButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    width: 150,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  createButtonText: {
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
    marginLeft: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
});