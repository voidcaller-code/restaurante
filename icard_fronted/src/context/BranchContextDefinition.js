import { createContext } from 'react'

export const BranchContext = createContext({
  branches: [],
  selectedBranch: null,
  loadingBranches: true,
  branchError: null,
  selectBranch: () => null,
})
