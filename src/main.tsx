import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import AddDog from './pages/AddDog.tsx'
import { Provider, useDispatch } from 'react-redux'
import {store} from "@/store/store"
import {login, logout} from "@/store/authSlice"
import authSerivce from "@/appwrite/auth"


function Layout(): JSX.Element{
  const dispatch = useDispatch()

  useEffect(() => {
    authSerivce.userExist()
    .then((userData) => {
      userData ? dispatch(login(userData)) : dispatch(logout())
    })
  }, [])

    return(
      <>
        <Navbar />
        <div className='mt-24'></div>
        <Outlet />
      </>
    )
}

const router = createBrowserRouter([
  {
    path : "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "add-dog-info",
        element: <AddDog />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
