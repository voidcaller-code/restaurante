import { useCallback, useState } from "react";
import {
  getTablesApi,
  addTableApi,
  updateTableApi,
  deleteTableApi,
  getTableApi,
  getTableByIdApi,
} from "../api/table";
import { useAuth } from "./useAuth";

export function useTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]); // guardas las mesas que obtienes de la API
  const [table, setTable] = useState(null);

  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth?.token);
      setTables(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addTable = async (data) => {
    try {
      setLoading(true);
      await addTableApi(data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTable = async (idTable) => {
    try {
      setLoading(true);
      const response = await getTableApi(idTable);
      setTable(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const isExistTable = useCallback(async (idTable) => {
    try {
      const response = await getTableByIdApi(idTable);

      return (response?.retData?.length ?? 0) > 0;
    } catch (error) {
      setError(error);
      return false;
    }
  }, []);

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    getTable,
    isExistTable,
  };
}
