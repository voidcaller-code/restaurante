import { ToastContainer } from 'react-toastify'
import { Navigation } from './routes'
import { AuthProvider, BranchProvider } from './context'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthProvider>
      <BranchProvider>
        <Navigation />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </BranchProvider>
    </AuthProvider>
  )
}
