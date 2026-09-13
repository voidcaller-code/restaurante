import { ToastContainer } from 'react-toastify'
import { Navigation } from './routes'
import { AuthProvider } from './context'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}