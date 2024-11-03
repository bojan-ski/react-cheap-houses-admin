import { RouterProvider, createBrowserRouter } from "react-router-dom"


// PAGES
import AppLayout from "./pages/AppLayout.jsx"
import Login from "./pages/Login.jsx"
import Users from "./pages/Users.jsx"
import Blog from "./pages/Blog.jsx"
import SelectedBlogPost from "./pages/SelectedBlogPost.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"

// LOADERS
import { loader as selectedBlogPostLoader } from "./pages/SelectedBlogPost.jsx"


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/korisnici',
        element: <Users />,
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/blog/:id',
        element: <SelectedBlogPost />,
        loader: selectedBlogPostLoader
      },
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App