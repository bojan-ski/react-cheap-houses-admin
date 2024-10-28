import { Outlet, useNavigation } from "react-router-dom"
// context
import { AppProvider } from "../context.jsx"
// components
import Loading from "../components/Loading.jsx"
import Header from "../components/appLayout/header/Header.jsx";
import Footer from "../components/appLayout/footer/Footer.jsx"
// toastify
import { ToastContainer } from 'react-toastify';


const AppLayout = () => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === 'loading'

    return (
        <AppProvider>
            <>
                <Header />

                <main>
                    {isPageLoading ? <Loading /> : <Outlet />}
                </main>

                <Footer />
            </>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                pauseOnFocusLoss={false}
            />
        </AppProvider>
    )
}

export default AppLayout