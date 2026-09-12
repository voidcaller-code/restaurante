import { useState } from 'react'
import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '../api/category'
import { useAuth } from './useAuth'

export function useCategory() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  const { auth } = useAuth()

  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await getCategoriesApi()
      setCategories(response)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const addCategory = async (data) => {
    try {
      setLoading(true)
      await addCategoryApi(data, auth?.token)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateCategory = async (id, data) => {
    try {
      setLoading(true)
      await updateCategoryApi(id, data, auth?.token)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id) => {
    try {
      setLoading(true)
      await deleteCategoryApi(id, auth?.token)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    categories,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}