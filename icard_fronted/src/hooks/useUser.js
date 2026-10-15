import { useState } from "react";
import {
  getMeApi,
  getUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/user";
import { useAuth } from "./useAuth";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const { auth } = useAuth();

  const getMe = async (token) => {
    try {
      return await getMeApi(token);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth?.token);
      setUsers(response || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    users,
    getMe,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
  };
}
