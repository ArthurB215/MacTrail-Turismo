const KEY = "usuario_logado";

export function setUsuarioLogado(email: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, email);
  }
}

export function getUsuarioLogado() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(KEY);
  }
  return "";
}

export function logoutUsuario() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
  }
}