import React, { useState, useEffect } from "react";
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
    setEmail("");
    onClose();
  }

  function handleClose() {
    setEmail("");
    onClose();
  }

  useEffect(() => {
    if (!visible) {
      setEmail("");
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.modalTitle}>Redefinir senha</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="done"
            onSubmitEditing={handleEnviar}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleEnviar}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeText}>Cancelar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
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