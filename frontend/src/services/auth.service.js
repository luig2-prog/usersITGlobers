import axios from "axios";

const API_URL = "http://localhost:3001/auth";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Error en el registro" };
    }
  }

  async login(identifier, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { identifier, password });
      if (response.data.success) {
        console.log("🚀 ~ AuthService ~ login ~ response:", response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Error en el login" };
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log("🚀 ~ AuthService ~ getUsers ~ response:", response)
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        this.logout();
      }
      throw error.response?.data || { error: "Error al obtener usuarios" };
    }
  }

  async logout() {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }
}

export default new AuthService();
