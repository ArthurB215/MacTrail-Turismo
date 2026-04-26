import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ModalConfirm from "./ModalConfirm";

export default function ReservaModal({ visible, onClose, lugar }: any) {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");

  const [diaChegada, setDiaChegada] = useState("");
  const [mesChegada, setMesChegada] = useState("");

  const [horaSaida, setHoraSaida] = useState("");
  const [horaChegada, setHoraChegada] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [email, setEmail] = useState("");

  const [mesmoDia, setMesmoDia] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const anoAtual = new Date().getFullYear();

  function isBissexto(ano: number) {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  }

  function diasNoMes(m: number, a: number) {
    if (m === 2) return isBissexto(a) ? 29 : 28;
    if ([4, 6, 9, 11].includes(m)) return 30;
    return 31;
  }

  function validarDia(text: string, setDiaFn: any, mesRef: string) {
    let num = text.replace(/\D/g, "");
    if (num.length > 2) num = num.slice(0, 2);

    let d = parseInt(num);
    let m = parseInt(mesRef);

    if (!isNaN(d)) {
      if (!isNaN(m)) {
        const max = diasNoMes(m, anoAtual);
        if (d > max) num = String(max);
      } else if (d > 31) {
        num = "31";
      }
    }

    setDiaFn(num);
  }

  function validarMes(text: string, setMesFn: any) {
    let num = text.replace(/\D/g, "");
    if (num.length > 2) num = num.slice(0, 2);

    let m = parseInt(num);
    if (!isNaN(m) && m > 12) num = "12";

    setMesFn(num);
  }

  function formatarHora(text: string) {
    let num = text.replace(/\D/g, "");

    if (num.length > 4) num = num.slice(0, 4);

    if (num.length >= 3) {
      num = num.slice(0, 2) + ":" + num.slice(2);
    }

    let [h, m] = num.split(":");

    if (h) {
      let hora = parseInt(h);
      if (!isNaN(hora) && hora > 23) h = "23";
    }

    if (m) {
      let min = parseInt(m);
      if (!isNaN(min) && min > 59) m = "59";
    }

    return m !== undefined ? `${h}:${m}` : h;
  }

  function completarHora(hora: string) {
    if (!hora.includes(":")) return hora;

    let [h, m] = hora.split(":");

    if (m && m.length === 1) {
      m = m + "0";
    }

    return `${h}:${m}`;
  }

  function horaValida(hora: string) {
    if (!/^\d{2}:\d{2}$/.test(hora)) return false;

    const [h, m] = hora.split(":").map(Number);

    if (h < 0 || h > 23) return false;
    if (m < 0 || m > 59) return false;

    return true;
  }

  function validarData(d: number, m: number) {
    if (m < 1 || m > 12) return false;
    const maxDias = diasNoMes(m, anoAtual);
    if (d < 1 || d > maxDias) return false;
    return true;
  }

  function horaParaMinutos(hora: string) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  }

  function handleReserva() {
    if (!dia || !mes || !horaSaida || !horaChegada || !pessoas || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!horaValida(horaSaida) || !horaValida(horaChegada)) {
      alert("Horário inválido! Use HH:MM entre 00:00 e 23:59.");
      return;
    }

    const d1 = parseInt(dia);
    const m1 = parseInt(mes);

    if (!validarData(d1, m1)) {
      alert("Data de saída inválida!");
      return;
    }

    let d2 = mesmoDia ? d1 : parseInt(diaChegada);
    let m2 = mesmoDia ? m1 : parseInt(mesChegada);

    if (!validarData(d2, m2)) {
      alert("Data de chegada inválida!");
      return;
    }

    if (!mesmoDia) {
      if (m2 < m1 || (m2 === m1 && d2 < d1)) {
        alert("Data de chegada não pode ser anterior à data de saída!");
        return;
      }
    }

    const saida = horaParaMinutos(horaSaida);
    const chegada = horaParaMinutos(horaChegada);

    const mesmaData =
      mesmoDia || (d1 === d2 && m1 === m2);

    if (mesmaData) {
      if (chegada === saida) {
        alert("Horário de chegada não pode ser igual ao de saída no mesmo dia!");
        return;
      }

      if (chegada < saida) {
        alert("Horário de chegada não pode ser menor que o de saída no mesmo dia!");
        return;
      }
    }

    setModalConfirm(true);
  }

  function toggleMesmoDia() {
    const novo = !mesmoDia;
    setMesmoDia(novo);

    if (novo) {
      setDiaChegada(dia);
      setMesChegada(mes);
    }
  }

  function fecharTudo() {
    setModalConfirm(false);
    onClose();
  }

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Reservar viagem</Text>
            <Text style={styles.subtitle}>{lugar?.nome}</Text>

            <Text style={styles.label}>Data de saída</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.smallInput}
                placeholder="DD"
                value={dia}
                onChangeText={(t) => validarDia(t, setDia, mes)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.smallInput}
                placeholder="MM"
                value={mes}
                onChangeText={(t) => validarMes(t, setMes)}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Horário de saída</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={horaSaida}
              onChangeText={(text) => setHoraSaida(formatarHora(text))}
              onBlur={() => setHoraSaida(completarHora(horaSaida))}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.checkbox} onPress={toggleMesmoDia}>
              <View style={[styles.box, mesmoDia && styles.boxChecked]} />
              <Text>Mesma data de chegada</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Data de chegada</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.smallInput, mesmoDia && styles.disabled]}
                placeholder="DD"
                value={mesmoDia ? dia : diaChegada}
                editable={!mesmoDia}
                onChangeText={(t) =>
                  validarDia(t, setDiaChegada, mesChegada)
                }
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.smallInput, mesmoDia && styles.disabled]}
                placeholder="MM"
                value={mesmoDia ? mes : mesChegada}
                editable={!mesmoDia}
                onChangeText={(t) => validarMes(t, setMesChegada)}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Horário de chegada</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={horaChegada}
              onChangeText={(text) => setHoraChegada(formatarHora(text))}
              onBlur={() => setHoraChegada(completarHora(horaChegada))}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade de pessoas</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              value={pessoas}
              onChangeText={setPessoas}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.button} onPress={handleReserva}>
              <Text style={styles.buttonText}>Confirmar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ModalConfirm visible={modalConfirm} onClose={fecharTudo} />
    </>
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
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 15,
    color: "#666",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  smallInput: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#000",
  },
  boxChecked: {
    backgroundColor: "#000",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
});