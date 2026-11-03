import { useEffect, useState } from 'react'

import { getBranchesApi } from '../api/branch'
import { BranchContext } from './BranchContextDefinition'

const SELECTED_BRANCH = 'selectedBranch'

export function BranchProvider({ children }) {
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [loadingBranches, setLoadingBranches] = useState(true)
  const [branchError, setBranchError] = useState(null)

  useEffect(() => {
    let ignore = false

    getBranchesApi()
      .then((response) => {
        if (ignore) return

        const activeBranches = (response?.retData ?? []).filter(
          (branch) => branch.active,
        )
        const storedBranchId = Number(localStorage.getItem(SELECTED_BRANCH))
        const nextSelectedBranch =
          activeBranches.find((branch) => branch.id === storedBranchId) ??
          activeBranches[0] ??
          null

        setBranches(activeBranches)
        setSelectedBranch(nextSelectedBranch)

        if (nextSelectedBranch) {
          localStorage.setItem(SELECTED_BRANCH, String(nextSelectedBranch.id))
        } else {
          localStorage.removeItem(SELECTED_BRANCH)
        }
      })
      .catch((error) => {
        if (ignore) return

        setBranchError(error)
        setBranches([])
        setSelectedBranch(null)
      })
      .finally(() => {
        if (!ignore) setLoadingBranches(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const selectBranch = (branchId) => {
    const nextSelectedBranch = branches.find(
      (branch) => branch.id === Number(branchId),
    )

    if (!nextSelectedBranch) return

    setSelectedBranch(nextSelectedBranch)
    localStorage.setItem(SELECTED_BRANCH, String(nextSelectedBranch.id))
  }

  return (
    <BranchContext.Provider
      value={{
        branches,
        selectedBranch,
        loadingBranches,
        branchError,
        selectBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  )
}
