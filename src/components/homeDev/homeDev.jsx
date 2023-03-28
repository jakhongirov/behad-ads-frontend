import './homeDev.scss'
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

function HomeDev() {
    const [token] = useToken();
    const navigate = useNavigate()

    return (
        <>
            <main className="main">
                <section className="homedev">
                    <div className="container">
                        <h1 className="home__heading">
                            Welcome {token.user_first_name} {token.user_last_name} developer
                        </h1>

                        <div className='home__btn-box'>
                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/developer/addApp')}
                            >
                               Add your app
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/developer/apps')}
                            >
                                Show your apps
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomeDev