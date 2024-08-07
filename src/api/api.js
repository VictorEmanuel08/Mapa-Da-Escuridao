import axios from "axios";
/**
 * Cria uma instância do axios com configurações personalizadas.
 *
 * Esta instância do axios é configurada para se comunicar com a API do aplicativo
 * no endereço base especificado abaixo (servidor Flórida e porta 3004).
 *
 * baseURL: Define o URL base para todas as requisições feitas usando esta instância.
 *
 * Requisição GET para 'http://192.168.6.181:3004/api'
 */
export const app = axios.create({
  baseURL: "http://192.168.6.181:3004/api",
});
