import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function ModalConfirm({ visible, onClose }: any) {
  const router = useRouter();

  function handleClose() {
    onClose();
    router.replace("/TelaPrincipal");
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Reserva realizada!</Text>

          <Text style={styles.text}>
            Sua reserva foi feita com sucesso.
          </Text>

          <Text style={styles.text}>
            Os dados serão enviados para o email informado.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});