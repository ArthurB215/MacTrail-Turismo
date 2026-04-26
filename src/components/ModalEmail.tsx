import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotModal({ visible, onClose }: any) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleEnviar() {
    if (!email) {
      alert("Digite seu email!");
      return;
    }

    alert("Email de redefinição enviado!");

    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Redefinir senha</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleEnviar}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancelar</Text>
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

  label: {
    marginBottom: 5,
    color: "#000",
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  sendButton: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
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