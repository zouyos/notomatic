import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { type User, type NoteType } from '../types/types';

interface JwtPayload {
  userId: string
}

export class NoteAPI {
  static formatId(note: NoteType) {
    if (note._id) {
      const { _id, ...rest } = note;
      return { id: _id.toString(), ...rest };
    } else if (note.id) {
      return { ...note, id: note.id.toString() };
    }
  }

  static getUserIdFromToken() {
    let token = Cookies.get('token');
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      return decodedToken?.userId;
    }
    return null;
  }

  static async create(note: NoteType) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/note/`,
        { ...note, userId: this.getUserIdFromToken() },
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/note/`,
        {
          withCredentials: true,
        }
      );
      return response.data.map(this.formatId);      
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/note/${id}`,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async update(note: NoteType) {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/note/${note.id}`,
        { ...note, userId: this.getUserIdFromToken() },
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/note/${id}`,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async signup(user: User) {
    try {
      return (
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/signup`,
          user,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async login(user: User) {
    try {
      return (
        await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, user, {
          withCredentials: true,
        })
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async requestPasswordReset(email: string) {
    try {
      return (
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/request-password-reset`,
          email,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(data: any) {
    try {
      return (
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/reset/${data.token}`,
          data,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }
}
