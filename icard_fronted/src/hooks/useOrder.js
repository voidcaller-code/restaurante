import { useCallback, useState } from "react";
import {
  getOrdersByTableApi,
  checkDeliveredOrderApi,
  addOrderToTableApi,
  addPaymentToOrderApi,
  closeOrderApi,
  getOrdersByPaymentApi,
} from "../api/orders";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const getOrdersByTable = useCallback(async (
    idTable,
    status,
    ordering,
    showLoading = true,
  ) => {
    try {
      if (showLoading) setLoading(true);

      const response = await getOrdersByTableApi(idTable, status, ordering);
      setOrders(response?.retData ?? []);
    } catch (error) {
      setError(error);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const checkDeliveredOrder = async (idOrder) => {
    try {
      await checkDeliveredOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      return await addOrderToTableApi(idTable, idProduct);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const getOrdersByPayment = async (idPayment) => {
    try {
      const response = await getOrdersByPaymentApi(idPayment);
      return response?.retData ?? [];
    } catch (error) {
      setError(error);
      return [];
    }
  };

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment,
  };
}
