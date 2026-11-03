import { Button, Form, Navbar } from 'react-bootstrap'
import { FaSignOutAlt } from 'react-icons/fa'

import { useAuth, useBranch } from '../../../hooks'

import './TopMenu.scss'

export function TopMenu() {
  const { auth, logout } = useAuth()
  const {
    branches,
    selectedBranch,
    loadingBranches,
    selectBranch,
  } = useBranch()

  const renderName = () => {
    if (auth?.me?.retData?.first_name && auth?.me?.retData?.last_name) {
      return `${auth.me.retData.first_name} ${auth.me.retData.last_name}`
    }

    return auth?.me?.retData?.email || 'Administrator'
  }

  return (
    <Navbar fixed="top" className="top-menu-admin">
      <div className="top-menu-admin__logo">
        <p>iCard Admin</p>
      </div>

      <div className="top-menu-admin__right">
        <div className="top-menu-admin__branch">
          <Form.Label htmlFor="admin-branch-select">Branch</Form.Label>
          <Form.Select
            id="admin-branch-select"
            size="sm"
            value={selectedBranch?.id ?? ''}
            onChange={(event) => selectBranch(event.target.value)}
            disabled={loadingBranches || branches.length === 0}
          >
            {branches.length === 0 && (
              <option value="">No branches available</option>
            )}
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <span>Hello, {renderName()}</span>

        <Button
          type="button"
          variant="outline-light"
          size="sm"
          onClick={logout}
        >
          <FaSignOutAlt />
        </Button>
      </div>
    </Navbar>
  )
}
