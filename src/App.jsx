import { RouterProvider, createBrowserRouter } from "react-router-dom"


// PAGES
import AppLayout from "./pages/AppLayout.jsx"
import Login from "./pages/Login.jsx"
import Users from "./pages/Users.jsx"
import SelectedUser from "./pages/SelectedUser.jsx"
import AllActiveListings from "./pages/AllActiveListings.jsx"
import AllPendingListings from "./pages/AllPendingListings.jsx"
import SelectedListing from "./pages/SelectedListing.jsx"
import Agencies from "./pages/Agencies.jsx"
import Blog from "./pages/Blog.jsx"
import SelectedBlogPost from "./pages/SelectedBlogPost.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"

// LOADERS
import { loader as selectedUserLoader } from "./pages/SelectedUser.jsx"
import { loader as selectedListingLoader } from "./pages/SelectedListing.jsx"
import { loader as selectedBlogPostLoader } from "./pages/SelectedBlogPost.jsx"
import { loader as allAgenciesLoader } from "./pages/Agencies.jsx"


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/korisnici',
        element: <Users />
      },
      {
        path: '/korisnici/:id',
        element: <SelectedUser />,
        loader: selectedUserLoader
      },
      {
        path: '/oglasi_na_cekanju',
        element: <AllPendingListings />,
      },
      {
        path: '/oglasi_na_cekanju/:id',
        element: <SelectedListing />,
        loader: selectedListingLoader
      },
      {
        path: '/aktivni_oglasi',
        element: <AllActiveListings />
      },
      {
        path: '/aktivni_oglasi/:id',
        element: <SelectedListing />,
        loader: selectedListingLoader
      },
      {
        path: '/agencije',
        element: <Agencies />,
        loader: allAgenciesLoader
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