import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // About endpoints
  about: {
    get: () => api.get('/about'),
    getStats: () => api.get('/about/stats'),
    getExperience: () => api.get('/about/experience'),
    getEducation: () => api.get('/about/education'),
  },

  // Skills endpoints
  skills: {
    get: () => api.get('/skills'),
    getCategories: () => api.get('/skills/categories'),
    getTechCloud: () => api.get('/skills/tech-cloud'),
  },

  // Projects endpoints
  projects: {
    getAll: (params) => api.get('/projects', { params }),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
  },

  // Contact endpoints
  contact: {
    submit: (data) => api.post('/contact', data),
    getAll: (params) => api.get('/contact', { params }),
    getById: (id) => api.get(`/contact/${id}`),
    updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  },

  // Health check
  health: () => api.get('/health'),
};

export default api;
