import * as SQLite from "expo-sqlite";

type Reserva = {
  userEmail: string;
  lugar: string;
  diaSaida: string;
  mesSaida: string;
  diaChegada: string;
  mesChegada: string;
  horaSaida: string;
  horaChegada: string;
  pessoas: string;
};

async function getDB() {
  return await SQLite.openDatabaseAsync("app.db");
}

export async function initDatabase() {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userEmail TEXT,
      lugar TEXT,
      diaSaida TEXT,
      mesSaida TEXT,
      diaChegada TEXT,
      mesChegada TEXT,
      horaSaida TEXT,
      horaChegada TEXT,
      pessoas TEXT
    );
  `);
}

export async function salvarReserva(reserva: Reserva) {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userEmail TEXT,
      lugar TEXT,
      diaSaida TEXT,
      mesSaida TEXT,
      diaChegada TEXT,
      mesChegada TEXT,
      horaSaida TEXT,
      horaChegada TEXT,
      pessoas TEXT
    );
  `);

  await db.runAsync(
    `INSERT INTO reservations (
      userEmail,
      lugar,
      diaSaida,
      mesSaida,
      diaChegada,
      mesChegada,
      horaSaida,
      horaChegada,
      pessoas
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      reserva.userEmail,
      reserva.lugar,
      reserva.diaSaida,
      reserva.mesSaida,
      reserva.diaChegada,
      reserva.mesChegada,
      reserva.horaSaida,
      reserva.horaChegada,
      reserva.pessoas,
    ]
  );
}

export async function getReservasPorUsuario(email: string) {
  const db = await getDB();

  return await db.getAllAsync(
    "SELECT * FROM reservations WHERE userEmail = ?",
    [email]
  );
}

export async function deletarReserva(id: number) {
  const db = await getDB();

  await db.runAsync(
    "DELETE FROM reservations WHERE id = ?",
    [id]
  );
}