// Vista temporal para pruebas
import { Outlet } from 'react-router'
import { SideMenu, TopMenu } from '../../components/Admin'
import './AdminLayout.scss'

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <TopMenu />

      <div className="admin-layout__main-content">
        <SideMenu>
          <Outlet />
        </SideMenu>
      </div>
    </div>
  )
}
// import { Outlet, Navigate } from 'react-router'
// import { SideMenu } from '../../components/Admin'
// import { useAuth } from '../../hooks'
// import './AdminLayout.scss'

// export function AdminLayout() {
//   const { auth } = useAuth()

//   if (!auth) {
//     return <Navigate to="/admin/login" replace />
//   }

//   return (
//     <div className="admin-layout">
//       <div className="admin-layout__main-content">
//         <SideMenu>
//           <Outlet />
//         </SideMenu>
//       </div>
//     </div>
//   )
// }

