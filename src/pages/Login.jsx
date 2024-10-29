import { useNavigate } from "react-router-dom";
// toastify
import { toast } from 'react-toastify'
import PageHeader from "../components/PageHeader";


const Login = () => {
  const navigate = useNavigate()

  const handleLoginSubmit = e => {
    e.preventDefault()

    const enteredEmail = e.target.elements[0].value.trim()
    const enteredPassword = e.target.elements[1].value

    console.log(enteredEmail);
    console.log(enteredPassword);

  }


  return (
    <div className="login-page mt-5">
      <div className="container">

        <PageHeader title='Registracija'/>

        <section className="login-form bg-white w-75 mx-auto p-5 rounded-5">
          <form onSubmit={handleLoginSubmit}>

            <div className="mb-3">
              <label htmlFor="loginEmail" className="col-form-label fw-bolder mb-1">
                Email adresa (elektronska pošta)
              </label>
              <input type="email" className="form-control" name="loginEmail" id="loginEmail" placeholder="Vaša email adresa" required />
            </div>

            <div className="mb-4">
              <label htmlFor="loginPassword" className="col-form-label fw-bolder mb-1">
                Lozinka
              </label>
              <input type="password" className="form-control" name="loginPassword" id="loginPassword" placeholder="Vaša lozinka" required />
            </div>

            <button type="submit" className="btn bg-orange-hover fw-bolder text-white py-3 w-100 rounded-4">
              Prijavite se
            </button>
          </form>
        </section>

      </div>
    </div>
  )
}

export default Login