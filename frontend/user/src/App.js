import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider,
  Navigate
} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/Home'
import System from './pages/System'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'

// layouts
import RootLayout from './layouts/RootLayout'

function App() {

  const { user } = useAuthContext()

  const router = createBrowserRouter(
  
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route  path="system"  element={user ? <System /> : <Navigate to="/login" />} />
        <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/system" />} 
      />
          <Route 
        path="/signup" 
        element={!user ? <Signup /> : <Navigate to="/system" />} 
      />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
    </Route>
    )
    
  )

  
  return (
    <RouterProvider router={router} />
  );
}

export default App
