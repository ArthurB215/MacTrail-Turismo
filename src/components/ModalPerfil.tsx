import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { usuario } from "../constants/user";
import { useRouter } from "expo-router";
import ModalSair from "./ModalSair";

export default function ModalPerfil({ visible, onClose }: any) {
  const [mostrarCpf, setMostrarCpf] = useState(false);
  const [modalSair, setModalSair] = useState(false);
  const router = useRouter();

  function formatarCpf(valor: string) {
    const nums = valor.replace(/\D/g, "");
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function mascararCpf(valor: string) {
    return formatarCpf(valor).replace(/\d(?=\d)/g, "•");
  }

  function confirmarLogout() {
    setModalSair(false);
    onClose();
    router.replace("/TelaLogin");
  }

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.card}>
            <View style={styles.header} />

            <Image
              source={require("../../assets/images/perfil.png")}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text>✕</Text>
            </TouchableOpacity>

            <View style={styles.content}>
              <Text style={styles.name}>{usuario.nome}</Text>
              <Text style={styles.email}>{usuario.email}</Text>

              <View style={styles.infoBox}>
                <Text style={styles.sectionTitle}>Informações</Text>

                <Text style={styles.label}>CPF</Text>
                <View style={styles.cpfBox}>
                  <Text>
                    {mostrarCpf
                      ? formatarCpf(usuario.cpf)
                      : mascararCpf(usuario.cpf)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setMostrarCpf(!mostrarCpf)}
                  >
                    <Text style={styles.toggle}>
                      {mostrarCpf ? "Ocultar" : "Mostrar"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Data de nascimento</Text>
                <Text style={styles.value}>
                  {usuario.dataNascimento}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferências</Text>
                <Text style={styles.empty}>
                  Esse usuário ainda não possui preferências
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lugares já visitados</Text>
                <Text style={styles.empty}>
                  Esse usuário ainda não visitou nenhum lugar
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Locais Favoritos</Text>
                <Text style={styles.empty}>
                  Esse usuário ainda não tem nenhum local favorito
                </Text>
              </View>

              <TouchableOpacity
                style={styles.logout}
                onPress={() => setModalSair(true)}
              >
                <Text style={styles.logoutText}>Deslogar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ModalSair
        visible={modalSair}
        onCancel={() => setModalSair(false)}
        onConfirm={confirmarLogout}
      />
    </>
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
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },

  header: {
    height: 80,
    backgroundColor: "#1e90ff",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    position: "absolute",
    top: 35,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },

  content: {
    marginTop: 60,
    padding: 20,
  },

  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  email: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },

  infoBox: {
    marginTop: 10,
  },

  section: {
    marginTop: 15,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  label: {
    color: "#666",
    marginTop: 8,
  },

  value: {
    marginTop: 2,
  },

  cpfBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  toggle: {
    color: "#1e90ff",
  },

  empty: {
    color: "#888",
    marginTop: 3,
  },

  logout: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#ff0000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },

  logoutText: {
    color: "#fff",
  },
});