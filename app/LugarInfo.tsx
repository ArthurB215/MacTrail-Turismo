import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import ModalReserva from "../src/components/ModalReserva";
import { getLugarById, Lugar } from "../src/api/lugares";
import { imagens } from "../src/constants/imagens";

export default function LugarInfo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [lugar, setLugar] = useState<Lugar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarLugar();
  }, []);

  async function carregarLugar() {
    try {
      const dados = await getLugarById(String(id));
      setLugar(dados);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando lugar...</Text>
      </View>
    );
  }

  if (!lugar) {
    return (
      <View style={styles.center}>
        <Text>Lugar não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          imagens[
            lugar.nome as keyof typeof imagens
          ]
        }
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {lugar.nome}, {lugar.pais}
        </Text>

        <Text style={styles.location}>
          {lugar.localizacao}
        </Text>

        <Text style={styles.rating}>
          ⭐ {lugar.rating}
        </Text>

        <Text style={styles.desc}>
          {lugar.descricao}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            Reserve agora
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 MacTrail Turismo - Todos os direitos reservados
        </Text>
      </View>

      <ModalReserva
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        lugar={lugar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 480,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  location: {
    color: "#666",
    marginVertical: 5,
  },
  rating: {
    marginVertical: 5,
  },
  desc: {
    marginTop: 10,
    color: "#444",
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  back: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cccccc",
    height: 60,
  },
  footerText: {
    color: "#000000",
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});