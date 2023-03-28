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
        const { first_name, last_name, email, phone, password } = e.target.elements

        fetch('https://ads.behad.uz/api/v1/register', {
            method: "POST",
            headers: {
                "Accep": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                first_name: first_name.value.trim(),
                last_name: last_name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                password: password.value.trim(),
                role: 'admin'
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
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='first_name' type="text" name='first_name' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="first_name">
                                    First name
                                </label>
                            </div>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='last_name' type="text" name='last_name' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="last_name">
                                    Last name
                                </label>
                            </div>

                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='email' type="email" name='email' required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="email">
                                    Email or ICloud
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