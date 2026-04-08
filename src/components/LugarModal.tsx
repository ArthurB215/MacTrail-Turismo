import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image} from "react-native";
import { useRouter } from "expo-router";

export default function LugarModal({ visible, onClose, lugares }: any) {
  const router = useRouter();

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Lugares Disponíveis</Text>

          <View style={styles.grid}>
            {lugares.map((item: any) => (
              <TouchableOpacity
                key={item.id}
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
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
  },
});