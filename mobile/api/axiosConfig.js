import axios from 'axios';

const API = axios.create({
    // Ngrok linkin
    baseURL: 'https://unvertically-repentant-delana.ngrok-free.dev/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // Uyarı sayfasını atlar
    }
});

export default API;