import './usersAdmin.scss'
import { useEffect, useState } from "react"
import useToken from '../../Hooks/useToken';

function UsersAdmin() {
    const [data, setData] = useState([])
    const [user, setUser] = useState({})
    const [, setToken] = useToken()
    const [offset, setOffset] = useState(0)
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        fetch('https://ads.adstar.uz/api/v1/users?offset=' + offset + '&sort=user_id desc', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [refresh, offset])

    const HandleUser = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/users?id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setUser(data.data[0])
                    setShow(!show)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }


    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/deleteUser', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setRefresh(refresh + 1)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    return (
        <>
            <main className="main">
                <section className="users">
                    <div className="container">
                        <h1 className="home__heading">Users</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Full name</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>More</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.user_id}</td>
                                            <td>{e.user_full_name}</td>
                                            <td>{e.user_phone}</td>
                                            <td>{e.user_role}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.user_id}
                                                    onClick={HandleUser}
                                                >
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    style={{ 'color': 'red' }}
                                                    data-id={e.user_id}
                                                    onClick={HandleDelete}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className={show ? "modal" : "modal--close"}>
                            <div className="modal__item">
                                <h3>{user.user_id} {user.user_full_name}</h3>
                                <br />
                                <p>
                                    tel: <a href={`tel:${user.user_phone}`}>{user.user_phone}</a>
                                </p>
                                <br />
                                <p>
                                    Company name: {user.user_company_name}
                                </p>
                                <br />
                                <p>
                                    balance: {user.user_balance}
                                </p>
                                <br />
                                <button onClick={() => setShow(!show)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UsersAdmin