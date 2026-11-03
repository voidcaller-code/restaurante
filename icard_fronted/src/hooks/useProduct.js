import { useCallback, useState } from "react";
import {
  getProductsApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsByCategoryApi,
  getAvailableProductsByCategoryApi,
} from "../api/product";
import { useAuth } from "./useAuth";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const { auth } = useAuth();

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProducts(response?.retData ?? []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth?.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await getProductByIdApi(id);
      return response?.retData ?? [];
      //return await getProductByIdApi(id);
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const getProductsByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(idCategory);
      setProducts(response?.retData ?? []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableProductsByCategory = useCallback(async (
    idTable,
    idCategory,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAvailableProductsByCategoryApi(
        idTable,
        idCategory,
      );
      const inventory = response?.retData ?? [];
      setProducts(
        inventory.map((item) => ({
          ...item.product_data,
          stock: item.stock,
        })),
      );
    } catch (requestError) {
      setError(requestError);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    products,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getAvailableProductsByCategory,
  };
}
