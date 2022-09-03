import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8000/api/v1";

class AuthService {

    async login(email, setError) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email });
            const { data } = response.data;
            
            localStorage.setItem('authToken', data.accessToken);

            return response.data;
        } catch (error) {
            setError(error.response.data.message);
            return error.response.data
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        window.location.reload();
    }

    getCurrentUser(token) {
        return jwt_decode(token);
    }
}

export default new AuthService();