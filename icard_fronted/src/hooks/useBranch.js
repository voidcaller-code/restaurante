import { useContext } from 'react'

import { BranchContext } from '../context/BranchContextDefinition'

export const useBranch = () => useContext(BranchContext)
