export type Lugar = {
  id: string;
  nome: string;
  pais: string;
  rating: number;
  localizacao: string;
  descricao: string;
  imagem: string;
};

const API_URL =
  "https://6a265414a84f9d39e90701ce.mockapi.io/lugares";

export async function getLugares(): Promise<Lugar[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar lugares");
  }

  return response.json();
}

export async function getLugarById(id: string): Promise<Lugar> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Lugar não encontrado");
  }

  return response.json();
}