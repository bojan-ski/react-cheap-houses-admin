import { useNavigate } from "react-router-dom";
// api 
import userSignIn from "../api/userSignIn";
// component
import PageHeader from "../components/PageHeader";
// toastify
import { toast } from 'react-toastify'
import FormInput from "../components/FormInput";


const Login = () => {
  const navigate = useNavigate()

  const handleLoginSubmit = async e => {
    e.preventDefault()

    const enteredEmail = e.target.elements[0].value.trim()
    const enteredPassword = e.target.elements[1].value

    const response = await userSignIn(enteredEmail, enteredPassword)

    if (response) {
      e.target.elements[0].value = ''
      e.target.elements[1].value = ''

      // success message
      toast.success('ADMIN - Uspešno ste se prijavili')

      // redirect user
      setTimeout(() => navigate('/korisnici'), 1500)
      // setTimeout(() => window.location.href = '/korisnici', 1500)
    }
  }

  return (
    <div className="login-page mt-5">
      <div className="container">

        <PageHeader title='Prijava' />

        <section className="login-form bg-white w-75 mx-auto rounded-5">
          <form onSubmit={handleLoginSubmit} className="p-5">

            <FormInput label='Email adresa (elektronska pošta)' type='email' name='loginEmail' placeholder='Vaša email adresa' required={true} />

            <FormInput label='Lozinka' type='password' name='loginPassword' placeholder='Vaša lozinka' required={true} />

            <button type="submit" className="btn bg-orange-hover fw-bolder text-white mt-3 py-3 w-100 rounded-4">
              Prijavite se
            </button>
          </form>
        </section>

      </div>
    </div>
  )
}

export default Login