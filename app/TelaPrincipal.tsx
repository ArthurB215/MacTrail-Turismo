import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import LugarModal from "../src/components/LugarModal";

export default function Home() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const lugares = [
    {
      id: 1,
      imagem: require("../assets/images/chile.png"),
      nome: "Cordilheira dos Andes",
      pais: "Chile",
      rating: 4.7,
      localizacao: "América do Sul",
      descricao: "Cordilheira extensa com paisagens incríveis e diversidade natural.",
    },
    {
      id: 0,
      imagem: require("../assets/images/japao.png"),
      nome: "Monte Fuji",
      pais: "Japão",
      rating: 4.8,
      localizacao: "Ásia",
      descricao: "O Monte Fuji é o pico mais alto do Japão e um símbolo nacional.",
    },
    {
      id: 2,
      imagem: require("../assets/images/china.png"),
      nome: "Templo do Céu",
      pais: "China",
      rating: 4.6,
      localizacao: "Ásia",
      descricao: "Templo histórico em Pequim usado por imperadores chineses.",
    },
    {
      id: 3,
      imagem: require("../assets/images/franca.png"),
      nome: "Torre Eiffel",
      pais: "França",
      rating: 4.9,
      localizacao: "Europa",
      descricao: "Um dos monumentos mais famosos do mundo localizado em Paris.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [filtro, setFiltro] = useState<"recentes" | "procurados" | "avaliados">("recentes");
  const [busca, setBusca] = useState("");

  const lugaresFiltrados =
    filtro === "avaliados"
      ? [...lugares].sort((a, b) => b.rating - a.rating).slice(0, 2)
      : filtro === "procurados"
      ? [
          lugares.find((l) => l.id === 3),
          lugares.find((l) => l.id === 1),
        ].filter(Boolean)
      : lugares;

  const lugarAtual = lugaresFiltrados[index];

  function mudarFiltro(novoFiltro: "recentes" | "procurados" | "avaliados") {
    setFiltro(novoFiltro);
    setIndex(0);
  }

  function proximaImagem() {
    setIndex((prev) => (prev + 1) % lugaresFiltrados.length);
  }

  function imagemAnterior() {
    setIndex((prev) => (prev - 1 + lugaresFiltrados.length) % lugaresFiltrados.length);
  }

  const sugestoes = lugares.filter((l) =>
    l.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Olá, Arthur</Text>
          <Text style={styles.subtitle}>Explore o mundo.</Text>
        </View>

        <Image
          source={require("../assets/images/perfil.png")}
          style={styles.profileImage}
        />
      </View>

      <View style={{ position: "relative", zIndex: 10 }}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Lugares bonitos"
            value={busca}
            onChangeText={setBusca}
            style={styles.input}
          />
        </View>

        {busca.length > 0 && (
          <View style={styles.sugestoes}>
            {sugestoes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.sugestaoItem}
                onPress={() => {
                  setBusca(item.nome);
                  router.push({
                    pathname: "/LugarInfo",
                    params: { id: item.id },
                  });
                }}
              >
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lugares Populares</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.verTudo}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>

      <LugarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        lugares={lugares}
      />

      <View style={styles.filters}>
        <TouchableOpacity
          style={filtro === "recentes" ? styles.activeFilter : styles.filter}
          onPress={() => mudarFiltro("recentes")}
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

        <TouchableOpacity
          style={filtro === "procurados" ? styles.activeFilter : styles.filter}
          onPress={() => mudarFiltro("procurados")}
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
          onPress={() => mudarFiltro("avaliados")}
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
      </View>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          if (!lugarAtual) return;
          router.push({
            pathname: "/LugarInfo",
            params: {
              id: lugarAtual.id,
            },
          });
        }}
      >
        <Image source={lugarAtual?.imagem} style={styles.image} />

        <TouchableOpacity style={styles.leftBtn} onPress={imagemAnterior}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightBtn} onPress={proximaImagem}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{lugarAtual?.nome}</Text>
          <Text style={styles.cardSub}>
            📍 {lugarAtual?.pais} ⭐ {lugarAtual?.rating}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 MacTrail Turismo - Todos os direitos reservados
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

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  searchBox: {
  marginTop: 20,
  position: "relative",
  zIndex: 10,
},

input: {
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 10,
  zIndex: 20,
},

sugestoes: {
  position: "absolute",
  top: 70,
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 10,
  zIndex: 999,
  elevation: 10,
},

  sugestaoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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