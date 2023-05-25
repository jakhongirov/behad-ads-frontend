import './register.scss'
import { useState } from 'react'
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';

function Register({ role }) {
    const [, setToken] = useToken();
    const [err, setErr] = useState(false)
    const [err1, setErr1] = useState(false)
    const navigate = useNavigate()

    const HandleRegister = (e) => {
        e.preventDefault();
        const { full_name, company_name, phone, password } = e.target.elements

        fetch('https://ads.adstar.uz/api/v1/register', {
            method: "POST",
            headers: {
                "Accep": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                full_name: full_name.value.trim(),
                company_name: company_name.value.trim(),
                phone: phone.value.trim(),
                password: password.value.trim(),
                role: role
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 400) {
                    setErr(true)
                } else if (data.status === 200) {
                    setToken(data.data)

                    if (data.data.user_role === 'developer') {
                        navigate('/developer')
                    } else if (data.data.user_role === 'reklomadatel') {
                        navigate('/advertiser')
                    } else if (data.data.user_role === 'admin') {
                        navigate('/admin')
                    }
                } else if (data.status === 302) {
                    setErr1(true)
                }
            })
            .catch((error) => console.log('error', error))

    }

    return (
        <main className='main'>
            <section className='login'>
                <div className='container'>
                    <div className='login__box'>
                        <form autoComplete="off" onSubmit={HandleRegister}>
                            <h1 className='login__title'>Sign up developer</h1>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='full_name' type="text" name='full_name' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="full_name">
                                    Full name
                                </label>
                            </div>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='company_name' type="text" name='company_name' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="company_name">
                                    company name
                                </label>
                            </div>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='phone' type="text" name='phone' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="phone">
                                    Phone
                                </label>
                                <span className={err1 ? 'forget__error__span' : 'close'}>{err1 ? "Telefon raqami ro'yhatdan o'tgan" : ""}</span>
                            </div>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                    Password
                                </label>
                                <span className={err ? 'forget__error__span' : 'close'}>{err ? "Parol no'togri" : ""}</span>
                            </div>

                            <button className='login__btn'>Sign up</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Register;