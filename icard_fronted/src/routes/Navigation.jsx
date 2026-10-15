import { useRoutes } from 'react-router'
import routes from './routes'

export function Navigation() {
  return useRoutes(routes)
}