import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";

export default function LugarModal({ visible, onClose, lugares }: any) {
  const router = useRouter();
  const [modoLista, setModoLista] = useState(true);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Lugares Disponíveis</Text>

              <FlatList
                data={lugares}
                key={modoLista ? "lista" : "grid"}
                keyExtractor={(item: any) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={modoLista ? 1 : 2}
                columnWrapperStyle={
                  !modoLista ? { justifyContent: "space-between" } : undefined
                }
                contentContainerStyle={{ paddingBottom: 10 }}
                renderItem={({ item }: any) =>
                  modoLista ? (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        onClose();
                        router.push({
                          pathname: "/LugarInfo",
                          params: { id: item.id },
                        });
                      }}
                    >
                      <Image source={item.imagem} style={styles.image} />

                      <View style={styles.info}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.sub}>
                          {item.pais} ⭐ {item.rating}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.gridItem}
                      onPress={() => {
                        onClose();
                        router.push({
                          pathname: "/LugarInfo",
                          params: { id: item.id },
                        });
                      }}
                    >
                      <Image source={item.imagem} style={styles.gridImage} />
                      <Text style={styles.gridText}>{item.nome}</Text>
                    </TouchableOpacity>
                  )
                }
              />

              <View style={styles.footerButtons}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setModoLista(!modoLista)}
                >
                  <Text style={styles.icon}>
                    {modoLista ? "▦" : "☰"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    height: "68%",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
  },

  info: {
    padding: 10,
    flex: 1,
  },

  nome: {
    fontWeight: "bold",
    fontSize: 16,
  },

  sub: {
    color: "#666",
    marginTop: 5,
  },

  gridItem: {
    width: "48%",
    marginBottom: 10,
  },

  gridImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },

  gridText: {
    textAlign: "center",
    marginTop: 5,
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  iconButton: {
    backgroundColor: "#1e90ff",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    color: "#fff",
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },

  closeText: {
    color: "#fff",
  },
});