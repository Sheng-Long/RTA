import axios from "axios";

export const BASE_URL = import.meta.env["VITE_API_BASE_URL"] as string;

export interface ErrorItem {
  code: string;
}

export type ErrorItems = Array<ErrorItem>;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});