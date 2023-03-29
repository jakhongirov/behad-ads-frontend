import './addCampaign.scss'
import useToken from '../../Hooks/useToken';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddCampaign() {
    const [token, setToken] = useToken();
    const navigate = useNavigate()

    const HandleAddCampaign = (e) => {
        e.preventDefault();
        const {
            campaign_name,
            advertisement_title,
            advertisement_description,
            advertisement_action_text,
            advertisement_link,
            advertisement_limit,
            advertisement_budget,
            gender,
            max_age,
            min_age,
            country,
            city,
            interest,
            phone_lang,
            action_price,
            advertisement_category,
            click_per_user,
            advertisement_type,
            type_of_campaign,
            advertisement_click_link,
            advertisement_media_type,
            advertisement_media,
        } = e.target.elements
        const formData = new FormData();

        formData.append("photo", advertisement_media.files[0]);
        formData.append("campaign_name", campaign_name.value.trim());
        formData.append("advertisement_title", advertisement_title.value.trim());
        formData.append("advertisement_description", advertisement_description.value.trim());
        formData.append("advertisement_action_text", advertisement_action_text.value.trim());
        formData.append("advertisement_link", advertisement_link.value.trim());
        formData.append("advertisement_limit", advertisement_limit.value.trim());
        formData.append("advertisement_budget", advertisement_budget.value.trim());
        formData.append("gender", gender.value.trim());
        formData.append("max_age", max_age.value.trim());
        formData.append("min_age", min_age.value.trim());
        formData.append("country", country.value.trim());
        formData.append("city", city.value.trim());
        formData.append("interest", interest.value.trim());
        formData.append("phone_lang", phone_lang.value.trim());
        formData.append("advertisement_category", advertisement_category.value.trim());
        formData.append("click_per_user", click_per_user.value.trim());
        formData.append("advertisement_type", advertisement_type.value.trim());
        formData.append("type_of_campaign", type_of_campaign.value.trim());
        formData.append("action_price", Number(action_price.value.trim()));
        formData.append("advertisement_click_link", advertisement_click_link.value.trim());
        formData.append("advertisement_media_type", advertisement_media_type.value.trim());
        formData.append("advertising_id", token ? token.user_id : setToken(false));


        axios.post('https://ads.behad.uz/api/v1/addAdvertisement', formData, {
            headers: {
                'Content-Type': 'form-data',
                "type": "formData",
                'Accept': 'application/json'
            },
        }).then(data => {
            if (data.status === 200) {
                navigate('/advertiser/advertisement')
            } else {
                console.log(data);
            }
        }).catch(e => console.log(e))

    }

    return (
        <>
            <main className="main">
                <section className="login addCampaign">
                    <dic className="container">
                        <div className='login__box'>
                            <form autoComplete="off" onSubmit={HandleAddCampaign}>
                                <h1 className='login__title'>Add campaign</h1>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='campaign_name' type="text" name='campaign_name' required />
                                    <label className={"login__phone_label"} htmlFor="campaign_name">
                                        Campaign name
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_title' type="text" name='advertisement_title' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_title">
                                        Advertisement title
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <textarea className={'login__phone__input'} id='advertisement_description' type="text" name='advertisement_description' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_description">
                                        Advertisement description
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_action_text' type="text" name='advertisement_action_text' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_action_text">
                                        Advertisement action text
                                    </label>
                                </div>

                                <div className='login__input__box login__input__box--select'>
                                    <select className='login__phone__input login__phone__input--select' name="gender" required>
                                        <option value="all">All</option>
                                        <option value="erkak">Male</option>
                                        <option value="ayol">Female</option>
                                    </select>
                                </div>

                                <div className='register__input__box'>
                                    <div className='login__input__box login__input__box--width'>
                                        <input className='login__phone__input' id='min_age' type="number" name='min_age' placeholder='' required min={0} max={100} />
                                        <label className="login__phone_label" htmlFor="min_age">
                                            Min age
                                        </label>
                                    </div>
                                    <div className='login__input__box login__input__box--width'>
                                        <input className='login__phone__input' id='max_age' type="number" name='max_age' placeholder='' required min={0} max={100} />
                                        <label className="login__phone_label" htmlFor="max_age">
                                            Max age
                                        </label>
                                    </div>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='country' type="text" name='country' required defaultValue={'all'} />
                                    <label className={"login__phone_label"} htmlFor="country">
                                        Country
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='city' type="text" name='city' required defaultValue={'all'} />
                                    <label className={"login__phone_label"} htmlFor="city">
                                        City
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='interest' type="text" name='interest' required defaultValue={'all'} />
                                    <label className={"login__phone_label"} htmlFor="interest">
                                        Interest users
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='phone_lang' type="text" name='phone_lang' required defaultValue={'all'} />
                                    <label className={"login__phone_label"} htmlFor="phone_lang">
                                        Phone languages
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_link' type="text" name='advertisement_link' />
                                    <label className={"login__phone_label"} htmlFor="advertisement_link">
                                        Advertisement link
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_click_link' type="text" name='advertisement_click_link' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_click_link">
                                        Advertisement click link
                                    </label>
                                </div>

                                <div className='upload__photo-box'>
                                    <label className='upload__photo__label' htmlFor="upload">
                                        Upload media
                                    </label>
                                    <input type="file" id='upload' name="advertisement_media" style={{ "display": "none" }} />
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_media_type' type="text" name='advertisement_media_type' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_media_type">
                                        Advertisement media type
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_category' type="text" name='advertisement_category' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_category">
                                        Advertisement category
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_limit' type="number" name='advertisement_limit' required />
                                    <label className={"login__phone_label"} htmlFor="advertisement_limit">
                                        Advertisement limit
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='advertisement_budget' type="number" name='advertisement_budget' />
                                    <label className={"login__phone_label"} htmlFor="advertisement_budget">
                                        Advertisement budget
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='action_price' type="text" name='action_price' />
                                    <label className={"login__phone_label"} htmlFor="action_price">
                                        Action price
                                    </label>
                                </div>

                                <div className='login__input__box'>
                                    <input className={'login__phone__input'} id='click_per_user' type="text" name='click_per_user' required />
                                    <label className={"login__phone_label"} htmlFor="click_per_user">
                                        Click per user
                                    </label>
                                </div>

                                <div className='login__input__box login__input__box--select'>
                                    <select className='login__phone__input login__phone__input--select' name="advertisement_type" required>
                                        <option value="banner">Banner</option>
                                        <option value="inters">Inters</option>
                                        <option value="rewarded">Rewarded</option>
                                        <option value="nativeBanner">Native banner</option>
                                    </select>
                                </div>

                                <div className='login__input__box login__input__box--select'>
                                    <select className='login__phone__input login__phone__input--select' name="type_of_campaign" required>
                                        <option value="" disabled>Type of campaign</option>
                                        <option value="view">View</option>
                                        <option value="click">Click</option>
                                        <option value="fullView">Full view</option>
                                    </select>
                                </div>

                                <button className='login__btn'>Add campaign</button>
                            </form>
                        </div>
                    </dic>
                </section>
            </main>
        </>
    )

}

export default AddCampaign;