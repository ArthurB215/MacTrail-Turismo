import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { deletarReserva } from "../database/database";

export default function ModalApagar({ visible, onCancel, reserva, onDeleted }: any) {
  async function confirmarDelete() {
    try {
      await deletarReserva(reserva.id);
      onDeleted();
      onCancel();
    } catch (error) {
      console.log(error);
      alert("Erro ao apagar reserva");
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Apagar reserva?</Text>

          <Text style={styles.text}>
            {reserva?.lugar} - {reserva?.diaSaida}/{reserva?.mesSaida} às {reserva?.horaSaida}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={confirmarDelete}>
              <Text style={styles.deleteText}>Apagar</Text>
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
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    color: "#555",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancel: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  delete: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelText: {
    color: "#000",
    fontWeight: "bold",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});