import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const lugares = [
    {
      imagem: require("../assets/images/japao.png"),
      nome: "Monte Fuji",
      pais: "Japão",
      rating: 4.8,
    },
    {
      imagem: require("../assets/images/chile.png"),
      nome: "Cordilheira dos Andes",
      pais: "Chile",
      rating: 4.7,
    },
    {
      imagem: require("../assets/images/china.png"),
      nome: "Templo do Céu",
      pais: "China",
      rating: 4.6,
    },
    {
      imagem: require("../assets/images/franca.png"),
      nome: "Torre Eiffel",
      pais: "França",
      rating: 4.9,
    },
  ];

  const [index, setIndex] = useState(0);
  const [filtro, setFiltro] = useState("procurados");
  const [busca, setBusca] = useState("");

  function proximaImagem() {
    setIndex((prev) => (prev + 1) % lugares.length);
  }

  function imagemAnterior() {
    setIndex((prev) => (prev - 1 + lugares.length) % lugares.length);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Olá. Seja Bem-vindo</Text>
          <Text style={styles.subtitle}>Explore o mundo.</Text>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/TelaLogin")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Lugares bonitos"
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lugares Populares</Text>
        <TouchableOpacity onPress={() => alert("Em breve você verá todos os lugares!")}>
        <Text style={styles.verTudo}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity
          style={filtro === "procurados" ? styles.activeFilter : styles.filter}
          onPress={() => setFiltro("procurados")}
        >
          <Text
            style={
              filtro === "procurados"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Mais Procurados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={filtro === "avaliados" ? styles.activeFilter : styles.filter}
          onPress={() => setFiltro("avaliados")}
        >
          <Text
            style={
              filtro === "avaliados"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Mais Avaliados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={filtro === "recentes" ? styles.activeFilter : styles.filter}
          onPress={() => setFiltro("recentes")}
        >
          <Text
            style={
              filtro === "recentes"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Recentes
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Image source={lugares[index].imagem} style={styles.image} />

        <TouchableOpacity style={styles.leftBtn} onPress={imagemAnterior}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightBtn} onPress={proximaImagem}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{lugares[index].nome}</Text>
          <Text style={styles.cardSub}>
            📍 {lugares[index].pais}   ⭐ {lugares[index].rating}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 Explore Mundo - Todos os direitos reservados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
  },

  loginButton: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  searchBox: {
    marginTop: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  verTudo: {
    color: "#888",
  },

  filters: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  activeFilter: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 20,
  },

  activeFilterText: {
    color: "#fff",
  },

  filter: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 20,
  },

  filterText: {
    color: "#000",
  },

  cardContainer: {
    marginTop: 20,
    borderRadius: 25,
    overflow: "hidden",
    height: 600,
  },

  image: {
    width: "100%",
    height: 600,
  },

  leftBtn: {
    position: "absolute",
    left: 10,
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
  },

  rightBtn: {
    position: "absolute",
    right: 10,
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
  },

  arrow: {
    color: "#fff",
    fontSize: 18,
  },

  cardInfo: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardSub: {
    color: "#eee",
  },

  footer: {
    marginTop: 50,
    marginLeft: -20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cccccc",
    height: 60,
    width: 520,
  },

  footerText: {
    color: "#000000",
    fontSize: 12,
  },
});