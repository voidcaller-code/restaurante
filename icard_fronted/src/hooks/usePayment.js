import { useState } from "react";
import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
  getPaymentsApi,
} from "../api/payment";

export function usePayment() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  const createPayment = async (paymentData) => {
    try {
      const response = await createPaymentApi(paymentData);
      return response?.retData ?? null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      const response = await getPaymentByTableApi(idTable);
      return response?.retData ?? [];
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const closePayment = async (idPayment) => {
    try {
      await closePaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setPayments(response?.retData ?? []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    payments,
    createPayment,
    getPaymentByTable,
    closePayment,
    getPayments,
  };
}
