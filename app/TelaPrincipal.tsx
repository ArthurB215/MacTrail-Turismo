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
import ModalPerfil from "../src/components/ModalPerfil";
import { lugares, Lugar } from "../src/constants/data";

export default function Home() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

  const [index, setIndex] = useState(0);
  const [filtro, setFiltro] = useState<"recentes" | "procurados" | "avaliados">("recentes");
  const [busca, setBusca] = useState("");

  const lugaresFiltradosBusca = busca
    ? lugares.filter((l: Lugar) =>
        l.nome.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  const lugaresFiltrados =
    filtro === "avaliados"
      ? [...lugares].sort((a, b) => b.rating - a.rating).slice(0, 4)
      : filtro === "procurados"
      ? [
          lugares.find((l: Lugar) => l.id === 3),
          lugares.find((l: Lugar) => l.id === 5),
          lugares.find((l: Lugar) => l.id === 0),
          lugares.find((l: Lugar) => l.id === 7),
        ].filter((item): item is Lugar => item !== undefined)
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Olá, Arthur</Text>
            <Text style={styles.subtitle}>Explore o mundo.</Text>
          </View>

          <TouchableOpacity onPress={() => setModalPerfilVisible(true)}>
            <Image
              source={require("../assets/images/perfil.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Lugares bonitos"
            value={busca}
            onChangeText={setBusca}
            style={styles.input}
          />

          {busca.length > 0 && (
            <View style={styles.sugestoes}>
              {lugaresFiltradosBusca.map((item: Lugar) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setBusca(item.nome);
                    router.push({
                      pathname: "/LugarInfo",
                      params: { id: item.id },
                    });
                  }}
                >
                  <Text style={styles.sugestaoItem}>{item.nome}</Text>
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

        <ModalPerfil
          visible={modalPerfilVisible}
          onClose={() => setModalPerfilVisible(false)}
        />

        <View style={styles.filters}>
          <TouchableOpacity
            style={filtro === "recentes" ? styles.activeFilter : styles.filter}
            onPress={() => mudarFiltro("recentes")}
          >
            <Text style={filtro === "recentes" ? styles.activeFilterText : styles.filterText}>
              Recentes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={filtro === "procurados" ? styles.activeFilter : styles.filter}
            onPress={() => mudarFiltro("procurados")}
          >
            <Text style={filtro === "procurados" ? styles.activeFilterText : styles.filterText}>
              Mais Procurados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={filtro === "avaliados" ? styles.activeFilter : styles.filter}
            onPress={() => mudarFiltro("avaliados")}
          >
            <Text style={filtro === "avaliados" ? styles.activeFilterText : styles.filterText}>
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
              params: { id: lugarAtual.id },
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
      </View>

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
    backgroundColor: "#f5f5f5" 
  },

  content: { 
    flex: 1, 
    padding: 20 
  },

  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },

  title: { 
    fontSize: 24, 
    fontWeight: "bold" 
  },

  subtitle: { 
    color: "#666" 
  },

  profileImage: {
     width: 45, 
     height: 45, 
     borderRadius: 50 
  },

  searchBox: { 
    marginTop: 20, 
    position: "relative", 
    zIndex: 10 
  },

  input: { 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 10 
  },

  sugestoes: {
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: 999,
    elevation: 10,
  },

  sugestaoItem: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee"
  },

  sectionHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 20 
  },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  verTudo: { 
    color: "#888" 
  },

  filters: { 
    flexDirection: "row", 
    marginTop: 15, 
    gap: 10 
  },

  activeFilter: { 
    backgroundColor: "#333", 
    padding: 10, 
    borderRadius: 20 
  },

  activeFilterText: { 
    color: "#fff" 
  },

  filter: { 
    backgroundColor: "#ddd", 
    padding: 10, 
    borderRadius: 20 
  },

  filterText: { 
    color: "#000" 
  },

  cardContainer: { 
    marginTop: 20, 
    borderRadius: 25, 
    overflow: "hidden", 
    height: 600
  },

  image: { 
    width: "100%", 
    height: "100%"
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
    fontSize: 18 
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
    fontSize: 16 
  },

  cardSub: { 
    color: "#eee" 
  },

  footer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cccccc",
    height: 60,
  },

  footerText: { 
    color: "#000", 
    fontSize: 12 
  },
});