import './login.scss'
import { useState } from 'react'
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [, setToken] = useToken();
    const [err, setErr] = useState(false)
    const [err1, setErr1] = useState(false)
    const navigate = useNavigate()

    const HandleLogin = (e) => {
        e.preventDefault();
        const { phone, password } = e.target.elements

        fetch('https://ads.adstar.uz/api/v1/login', {
            method: "POST",
            headers: {
                "Accep": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                phone: phone.value.trim(),
                password: password.value.trim(),
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 401) {
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
                } else if (data.status === 404) {
                    setErr1(true)
                }
            })
            .catch((error) => console.log('error', error))
    }

    return (
        <>
            <main className='main'>
                <section className='login'>
                    <div className='container'>
                        <div className='login__box'>
                            <form autoComplete='off' onSubmit={HandleLogin}>
                                <h1 className='login__title'>Sign in to continue</h1>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='phone' type="text" name='phone' required />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="phone">
                                        Phone
                                    </label>
                                    <span className={err1 ? 'forget__error__span' : 'close'}>{err1 ? "Telefon raqami ro'yhatdan o'tmagan" : ""}</span>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Password
                                    </label>
                                    <span className={err ? 'forget__error__span' : 'close'}>{err ? "Parol no'togri" : ""}</span>
                                </div>

                                <button className='login__btn'>Sign In</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login;