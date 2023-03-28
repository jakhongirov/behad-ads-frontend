import './homeAdmin.scss'
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

function HomeAdmin() {
    const [token] = useToken();
    const navigate = useNavigate()

    return (
        <>
            <main className="main">
                <section className="homedev">
                    <div className="container">
                        <h1 className="home__heading">
                            Welcome {token.user_first_name} {token.user_last_name} admin
                        </h1>

                        <div className='home__btn-box'>
                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/admin/users')}
                            >
                               Users
                            </button>
                            
                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/admin/categories')}
                            >
                               Categories
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/admin/apps')}
                            >
                               Adds
                            </button>

                            <button
                                className='home__login__btn'
                                onClick={() => navigate('/admin/advertisements')}
                            >
                                Advertisements
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomeAdmin