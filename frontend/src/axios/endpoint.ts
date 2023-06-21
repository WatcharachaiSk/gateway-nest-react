import baseURL from "./baseURL.config";

export const API = {
  hello: baseURL + "",
  createGate: baseURL + `/gateways`,
  joinGate: baseURL + `/gateways/join`
};
