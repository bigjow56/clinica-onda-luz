// API client for communicating with the server
const API_BASE_URL = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async signIn(email: string, password: string) {
    try {
      const data = await this.request<{ user: any; token: string }>('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      this.token = data.token;
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: { message: error.message } };
    }
  }

  async signUp(email: string, password: string, role = 'admin') {
    try {
      const data = await this.request<{ user: any }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: { message: error.message } };
    }
  }

  async getMe() {
    try {
      const data = await this.request<{ user: any }>('/auth/me');
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: { message: error.message } };
    }
  }

  signOut() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return Promise.resolve();
  }

  // Site settings
  async getSiteSettings() {
    return this.request('/site-settings');
  }

  async updateSiteSettings(settings: any) {
    return this.request('/site-settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Team members
  async getTeamMembers() {
    return this.request('/team-members');
  }

  async getTeamMember(id: string) {
    return this.request(`/team-members/${id}`);
  }

  async createTeamMember(member: any) {
    return this.request('/team-members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateTeamMember(id: string, member: any) {
    return this.request(`/team-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  }

  async deleteTeamMember(id: string) {
    return this.request(`/team-members/${id}`, {
      method: 'DELETE',
    });
  }

  // Appointments
  async getAppointments() {
    return this.request('/appointments');
  }

  async createAppointment(appointment: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  async updateAppointment(id: string, appointment: any) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
    });
  }

  async deleteAppointment(id: string) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();