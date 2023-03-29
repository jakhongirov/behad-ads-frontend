import './addApp.scss'
import { useState } from "react";
import useToken from '../../Hooks/useToken';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddApp() {
    const [token] = useToken();
    const [banner, setBN] = useState('')
    const [inters, setIN] = useState('')
    const [rewarded, setRD] = useState('')
    const [native_banner, setNB] = useState('')
    const navigate = useNavigate()

    const makeCode = (length, type) => {
        let characters = '0123456789';
        let charactersLength = characters.length;
        let code = ''

        for (let i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return `${type}-${code}`
    }


    const HandleAddApp = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const { app_name, app_link, ad_type, photo } = e.target.elements

        for (let option of ad_type.options) {
            if (option.selected) {
                if (option.value === 'BN') {
                    setBN(makeCode(16, option.value))
                } else if (option.value === 'IN') {
                    setIN(makeCode(16, option.value))
                } else if (option.value === 'RD') {
                    setRD(makeCode(16, option.value))
                } else if (option.value === 'NB') {
                    setNB(makeCode(16, option.value))
                }
            }
        }

        formData.append("photo", photo.files[0]);
        formData.append("appName", app_name.value.trim());
        formData.append("app_link", app_link.value.trim());
        formData.append('banner_id', banner)
        formData.append('inters_id', inters)
        formData.append('rewarded_id', rewarded)
        formData.append('native_banner_id', native_banner)
        formData.append('userId', token.user_id)

        axios.post('https://ads.behad.uz/api/v1/addApp', formData, {
            headers: {
                'Content-Type': 'form-data',
                "type": "formData",
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*"

            }
        }).then(data => {
            if(data.status === 200) {
                navigate('/developer/apps')
            } else {
                console.log(data);
            }
        }).catch(e => console.log(e))
    }

    return (
        <main className='main'>
            <section className='login'>
                <div className='container'>
                    <div className='login__box'>
                        <form autoComplete="off" onSubmit={HandleAddApp}>
                            <h1 className='login__title'>Add app</h1>

                            <div className='login__input__box'>
                                <input className={'login__phone__input'} id='app_name' type="text" name='app_name' required />
                                <label className={"login__phone_label"} htmlFor="app_name">
                                    App name
                                </label>
                            </div>

                            <div className='login__input__box'>
                                <input className={'login__phone__input'} id='app_link' type="text" name='app_link' required />
                                <label className={"login__phone_label"} htmlFor="app_link">
                                    App link
                                </label>
                            </div>

                            <div className='login__input__box login__input__box--select'>
                                <select className='login__phone__input login__phone__input--select' name="ad_type" required multiple>
                                    <option value="BN">Banner</option>
                                    <option value="IN">Inters</option>
                                    <option value="RD">Rewarded</option>
                                    <option value="NB">Native banner</option>
                                </select>
                            </div>

                            <div className='upload__photo-box'>
                                <label className='upload__photo__label' htmlFor="upload">
                                    Upload app icon
                                </label>
                                <input type="file" id='upload' name="photo" style={{ "display": "none" }} />
                            </div>

                            <button className='login__btn'>Add app</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddApp;