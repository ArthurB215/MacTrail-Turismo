import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function LugarInfo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const idNumber = Number(id);

  const lugares = [
    {
      id: 0,
      imagem: require("../assets/images/japao.png"),
      nome: "Monte Fuji",
      pais: "Japão",
      rating: 4.8,
      localizacao: "Ásia",
      descricao:
        "O Monte Fuji é o pico mais alto do Japão, com 3.776 metros de altitude. Conhecido por sua forma perfeitamente simétrica, é considerado um símbolo sagrado e cultural do país. Durante séculos, artistas e poetas se inspiraram em sua beleza. Hoje, é um dos destinos turísticos mais visitados do Japão, especialmente durante a temporada de escalada no verão.",
    },
    {
      id: 1,
      imagem: require("../assets/images/chile.png"),
      nome: "Cordilheira dos Andes",
      pais: "Chile",
      rating: 4.7,
      localizacao: "América do Sul",
      descricao:
        "A Cordilheira dos Andes é a maior cadeia de montanhas do mundo em extensão, atravessando diversos países da América do Sul. No Chile, oferece paisagens impressionantes com picos nevados, lagos cristalinos e vales profundos. É um destino ideal para esportes de aventura como esqui, trilhas e escaladas.",
    },
    {
      id: 2,
      imagem: require("../assets/images/china.png"),
      nome: "Templo do Céu",
      pais: "China",
      rating: 4.6,
      localizacao: "Ásia",
      descricao:
        "O Templo do Céu, localizado em Pequim, é um complexo religioso construído no século XV. Era utilizado pelos imperadores chineses para realizar cerimônias de agradecimento ao céu pelas colheitas. Sua arquitetura impressiona pela simetria e simbolismo, sendo hoje Patrimônio Mundial da UNESCO.",
    },
    {
      id: 3,
      imagem: require("../assets/images/franca.png"),
      nome: "Torre Eiffel",
      pais: "França",
      rating: 4.9,
      localizacao: "Europa",
      descricao:
        "A Torre Eiffel é um dos monumentos mais icônicos do mundo, localizada em Paris. Construída em 1889, possui mais de 300 metros de altura e recebe milhões de visitantes todos os anos. Do topo, é possível ter uma vista panorâmica incrível da cidade, especialmente à noite, quando a torre se ilumina.",
    },
  ];

  const lugar = lugares.find((l) => l.id === idNumber);

  if (!lugar) {
    return (
      <View style={styles.center}>
        <Text>Lugar não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={lugar.imagem} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>
          {lugar.nome}, {lugar.pais}
        </Text>

        <Text style={styles.location}>{lugar.localizacao}</Text>

        <Text style={styles.rating}>⭐ {lugar.rating}</Text>

        <Text style={styles.desc}>{lugar.descricao}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reserve agora</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text>{"<"}</Text>
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
    backgroundColor: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: 300,
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