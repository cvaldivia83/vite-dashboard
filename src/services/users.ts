import { userInterface } from "../types/user";
import { SearchQuery } from "../types/search";

// export const API_URL= 'http://localhost:3001'

export const API_URL = 'https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/'

export class UsersService {

  // GET all users
  static async getUsers(query: SearchQuery, page: number): Promise<userInterface[]> {
    const params = new URLSearchParams();
    
    if (query.nome) {
      params.append('nome', `${query.nome[0].toUpperCase()}${query.nome.slice(1)}`);
    }

    if (query.sobrenome) {
      params.append('sobrenome', `${query.sobrenome[0].toUpperCase()}${query.sobrenome.slice(1)}`);
    }

    if (query.email) {
      params.append('email', query.email);
    }

    const queryString = params.toString();
    const url = `${API_URL}${queryString && '?'}${queryString ? '&' + queryString : ''}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch(error) {
      console.log('Error fetching users:', error);
      throw error;
    }
  }

  // GET a single user

  static async getUser(id: number): Promise<userInterface> {
    const url = `${API_URL}${id}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch(error) {
      console.error('Error fetching user id' + id, error);
      throw error;
    }
  }

  // POST create a new user
  static async createUser(userData: object): Promise<userInterface> {
    const url = `${API_URL}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetch(url, options)
      return await response.json();
    } catch(error) {
      console.error('Error creating user:' + error);
      throw error;
    }
  }

  // PUT update a user - replace some fields
  static async updateUser(id: string, userData: object): Promise<userInterface> {
    const url = `${API_URL}${id}`;

    const options = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetch(url, options);
      return response.json();
    } catch(error) {
      console.log('Error updating user: ', error);
      throw error;
    }
  }

  // DELETE delete a user
  static async deleteUser(id: string): Promise<userInterface> {
    const url = `${API_URL}${id}`;

    const options = {
      method: 'DELETE',
    };

    try {
      const response = await fetch(url, options);
      return response.json();
    } catch(error) {
      console.log('Unable to delete user;', error);
      throw error;
    }
  }
}


