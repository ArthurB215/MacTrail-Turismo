import { getUsuarioLogado } from "./usuarioLogado";

export type Reserva = {
  lugar: string;
  diaSaida: string;
  mesSaida: string;
  diaChegada: string;
  mesChegada: string;
  horaSaida: string;
  horaChegada: string;
  pessoas: string;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  dataNascimento: string;
  reservas?: Reserva[];
};

const API_URL =
  "https://6a265414a84f9d39e90701ce.mockapi.io/usuarios";

export async function getUsuarios(): Promise<Usuario[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return response.json();
}

export async function criarUsuario(
  usuario: Omit<Usuario, "id">
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...usuario,
      reservas: [],
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário");
  }

  return response.json();
}

export async function adicionarReserva(
  email: string,
  reserva: Reserva
) {
  const usuarios = await getUsuarios();

  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const reservasAtuais = usuario.reservas || [];

  const response = await fetch(
    `${API_URL}/${usuario.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...usuario,
        reservas: [...reservasAtuais, reserva],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao salvar reserva");
  }

  return response.json();
}

export async function buscarUsuarioPorEmail(
  email: string
): Promise<Usuario | undefined> {
  const usuarios = await getUsuarios();

  return usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export async function getUsuarioAtual(): Promise<Usuario | null> {
  const email = getUsuarioLogado();

  if (!email) {
    return null;
  }

  const usuario = await buscarUsuarioPorEmail(email);

  return usuario || null;
}