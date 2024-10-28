import { useRouteError } from "react-router-dom"
// components
import Error from "../components/errorPage/Error.jsx"


const ErrorPage = () => {
    const error = useRouteError()

    return <div className="error">
        {error.status == 404 ? (
            <Error textOne="Stranicu koju tražite ne postoji" textTwo="Molimo Vas da se vratite na početnu stranicu" />
        ) : (
            <Error textOne="Pojavio se problem" textTwo="Molimo Vas da se vratite na početnu stranicu" />
        )}
    </div>
}

export default ErrorPage