import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function ModalSair({ visible, onCancel, onConfirm }: any) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Deseja realmente sair?</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirm} onPress={onConfirm}>
              <Text style={styles.confirmText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  cancel: {
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },

  confirm: {
    backgroundColor: "#ff0000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },

  cancelText: {
    color: "#000",
  },

  confirmText: {
    color: "#fff",
  },
});