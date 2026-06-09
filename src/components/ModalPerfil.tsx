import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import ModalSair from "./ModalSair";
import { getUsuarioLogado, logoutUsuario } from "../api/usuarioLogado";
import { buscarUsuarioPorEmail, Usuario } from "../api/usuarios";
import { getReservasPorUsuario } from "../database/database";
import ModalApagar from "./ModalApagar";

export default function ModalPerfil({ visible, onClose }: any) {
  const [mostrarCpf, setMostrarCpf] = useState(false);
  const [modalSair, setModalSair] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [reservas, setReservas] = useState<any[]>([]);
  const [modalApagar, setModalApagar] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    if (visible) {
      carregarUsuario();
    }
  }, [visible]);

  async function carregarUsuario() {
    try {
      const email = getUsuarioLogado();
      if (!email) return;

      const dados = await buscarUsuarioPorEmail(email);

      if (dados) {
        setUsuario(dados);
      }

      const lista = await getReservasPorUsuario(email);
      setReservas(lista);
    } catch (error) {
      console.error(error);
    }
  }

  async function recarregarReservas() {
    const email = getUsuarioLogado();
    if (!email) return;

    const lista = await getReservasPorUsuario(email);
    setReservas(lista);
  }

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
    logoutUsuario();
    setModalSair(false);
    onClose();

    setTimeout(() => {
      if (Platform.OS === "web") {
        window.location.href = "/TelaLogin";
      } else {
        router.replace("/TelaLogin");
      }
    }, 0);
  }

  if (!usuario) return null;

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.card}
            onPress={(e) => e.stopPropagation()}
          >
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
                  <TouchableOpacity onPress={() => setMostrarCpf(!mostrarCpf)}>
                    <Text style={styles.toggle}>
                      {mostrarCpf ? "Ocultar" : "Mostrar"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Data de nascimento</Text>
                <Text style={styles.value}>{usuario.dataNascimento}</Text>
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
                <Text style={styles.sectionTitle}>Minhas Viagens</Text>

                {reservas.length === 0 ? (
                  <Text style={styles.empty}>
                    Esse usuário ainda não possui viagens
                  </Text>
                ) : (
                  reservas.map((r, index) => (
                    <View key={index} style={styles.viagemCard}>
                      <TouchableOpacity
                        style={styles.deleteX}
                        onPress={() => {
                          setReservaSelecionada(r);
                          setModalApagar(true);
                        }}
                      >
                        <Text style={styles.deleteXText}>✕</Text>
                      </TouchableOpacity>

                      <Text style={styles.viagemLugar}>{r.lugar}</Text>
                      <Text style={styles.viagemData}>
                        {r.diaSaida}/{r.mesSaida} às {r.horaSaida}
                      </Text>
                    </View>
                  ))
                )}
              </View>

              <TouchableOpacity
                style={styles.logout}
                onPress={() => setModalSair(true)}
              >
                <Text style={styles.logoutText}>Deslogar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <ModalSair
        visible={modalSair}
        onCancel={() => setModalSair(false)}
        onConfirm={confirmarLogout}
      />

      <ModalApagar
        visible={modalApagar}
        reserva={reservaSelecionada}
        onCancel={() => setModalApagar(false)}
        onDeleted={recarregarReservas}
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
    width: 30,
    alignItems: "center",
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

  viagemCard: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },

  viagemLugar: {
    fontWeight: "bold",
    fontSize: 14,
  },

  viagemData: {
    color: "#555",
    marginTop: 2,
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

  deleteX: {
  position: "absolute",
  right: 8,
  top: 8,
  backgroundColor: "#ff0000",
  width: 22,
  height: 22,
  borderRadius: 11,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
},

deleteXText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
},
});