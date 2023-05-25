import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

function HomeAd() {
    const [token] = useToken();
    const navigate = useNavigate()

    return (
        <>
            <main className="main">
                <section className="homedev">
                    <div className="container">
                        <h1 className="home__heading">
                            Welcome {token.user_full_name} advertiser
                        </h1>

                        <div className='home__btn-box'>
                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/advertiser/addCampaign')}
                            >
                               Add your advertisement
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/advertiser/advertisement')}
                            >
                                Show your advertisements
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomeAd