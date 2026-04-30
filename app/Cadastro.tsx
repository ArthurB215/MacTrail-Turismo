import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  function formatarCPF(text: string) {
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
    if (cleaned.length <= 9) return cleaned;
    return cleaned.slice(0, 9) + "-" + cleaned.slice(9);
  }

  function isBissexto(ano: number) {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  }

  function diasNoMes(m: number, a: number) {
    if (m === 2) return isBissexto(a) ? 29 : 28;
    if ([4, 6, 9, 11].includes(m)) return 30;
    return 31;
  }

  function validarDia(text: string) {
    let num = text.replace(/\D/g, "");
    if (num.length > 2) num = num.slice(0, 2);

    let d = parseInt(num);
    let m = parseInt(mes);
    let a = parseInt(ano);

    if (!isNaN(d)) {
      if (!isNaN(m) && !isNaN(a)) {
        const max = diasNoMes(m, a);
        if (d > max) num = String(max);
      } else if (d > 31) {
        num = "31";
      }
    }

    setDia(num);
  }

  function validarMes(text: string) {
    let num = text.replace(/\D/g, "");
    if (num.length > 2) num = num.slice(0, 2);

    let m = parseInt(num);
    if (!isNaN(m) && m > 12) num = "12";

    setMes(num);
  }

  function validarAno(text: string) {
    let num = text.replace(/\D/g, "");
    if (num.length > 4) num = num.slice(0, 4);

    if (num.length === 4) {
      const anoAtual = new Date().getFullYear();
      let a = parseInt(num);

      if (a > anoAtual) num = String(anoAtual);
      if (a < 1900) num = "1900";
    }

    setAno(num);
  }

  useEffect(() => {
    if (!dia) return;

    const d = parseInt(dia);
    const m = parseInt(mes);
    const a = parseInt(ano);

    if (!isNaN(d) && !isNaN(m) && !isNaN(a)) {
      const max = diasNoMes(m, a);
      if (d > max) {
        setDia(String(max));
      }
    }
  }, [mes, ano]);

  function dataFutura(d: number, m: number, a: number) {
    const hoje = new Date();
    const data = new Date(a, m - 1, d);
    return data > hoje;
  }

  function handleCadastro() {
    if (!nome || !email || !cpf || !senha || !dia || !mes || !ano) {
      alert("Preencha todos os campos!");
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      alert("CPF deve conter 11 números!");
      return;
    }

    const d = parseInt(dia);
    const m = parseInt(mes);
    const a = parseInt(ano);

    if (m < 1 || m > 12) {
      alert("Mês inválido!");
      return;
    }

    const maxDias = diasNoMes(m, a);

    if (d < 1 || d > maxDias) {
      alert("Dia inválido para esse mês!");
      return;
    }

    if (dataFutura(d, m, a)) {
      alert("Data não pode ser no futuro!");
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
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>
          Preencha os dados para se cadastrar.
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          onSubmitEditing={handleCadastro}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleCadastro}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          value={cpf}
          onChangeText={(text) => setCpf(formatarCPF(text))}
          keyboardType="numeric"
          onSubmitEditing={handleCadastro}
        />

        <Text style={styles.label}>Data de nascimento</Text>
        <View style={styles.dataRow}>
          <TextInput
            style={styles.dataInput}
            placeholder="DD"
            value={dia}
            onChangeText={validarDia}
            keyboardType="numeric"
            onSubmitEditing={handleCadastro}
          />
          <TextInput
            style={styles.dataInput}
            placeholder="MM"
            value={mes}
            onChangeText={validarMes}
            keyboardType="numeric"
            onSubmitEditing={handleCadastro}
          />
          <TextInput
            style={styles.dataInput}
            placeholder="AAAA"
            value={ano}
            onChangeText={validarAno}
            keyboardType="numeric"
            onSubmitEditing={handleCadastro}
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          onSubmitEditing={handleCadastro}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

        <Text style={styles.or}>────────────── OU ──────────────</Text>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Já possui uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/TelaLogin")}>
            <Text style={styles.loginLink}> Faça Login</Text>
          </TouchableOpacity>
        </View>
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
  },

  dataRow: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 50,
  },

  dataInput: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    width: 110,
    textAlign: "center",
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

  or: {
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#000",
  },

  loginLink: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});