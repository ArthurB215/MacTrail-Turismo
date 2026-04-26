export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  dataNascimento: string;
};

export const usuario: Usuario = {
  id: 1,
  nome: "Arthur Batista",
  email: "teste@email.com",
  senha: "123456",
  cpf: "123.456.789-00",
  dataNascimento: "10/02/2004",
};
