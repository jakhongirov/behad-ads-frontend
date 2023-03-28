import './home.scss'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    return (
        <>
            <main className="main">
                <section className="home">
                    <div className="container">
                        <h1 className="home__heading">
                            Welcome to Behad Advertisements server
                        </h1>

                        <div className='home__btn-box'>
                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/register/developer')}
                            >
                                Sign up developer
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/register/advertiser')}
                            >
                                Sign up advertiser
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;