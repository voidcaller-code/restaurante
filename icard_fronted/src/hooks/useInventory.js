import { useCallback, useState } from 'react'

import {
  addInventoryApi,
  getInventoryApi,
  updateInventoryApi,
} from '../api/inventory'
import { useAuth } from './useAuth'

export function useInventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { auth } = useAuth()

  const getInventory = useCallback(async (branchId) => {
    try {
      setLoading(true)
      setError(null)

      const response = await getInventoryApi(branchId)
      setInventory(response?.retData ?? [])
    } catch (requestError) {
      setError(requestError)
      setInventory([])
    } finally {
      setLoading(false)
    }
  }, [])

  const addInventory = async (data) => {
    try {
      setError(null)
      return await addInventoryApi(data, auth?.token)
    } catch (requestError) {
      setError(requestError)
      throw requestError
    }
  }

  const updateInventory = async (id, data) => {
    try {
      setError(null)
      return await updateInventoryApi(id, data, auth?.token)
    } catch (requestError) {
      setError(requestError)
      throw requestError
    }
  }

  return {
    inventory,
    loading,
    error,
    getInventory,
    addInventory,
    updateInventory,
  }
}
