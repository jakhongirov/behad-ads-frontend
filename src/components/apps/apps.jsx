import './apps.scss'
import { useState, useEffect } from 'react'
import useToken from '../../Hooks/useToken';    

function Apps() {
    const [data, setData] = useState()
    const [app, setApp] = useState([])
    const [token, setToken] = useToken()
    const [offset, setOffset] = useState(0)
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        fetch('https://ads.adstar.uz/api/v1/apps?offset=' + offset + '&userId=' + token.user_id, {
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
    }, [token, refresh, offset])

    const HandleApp = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/apps?appId=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setApp(data.data[0])
                    setShow(!show)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/deleteApp', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                app_id: id
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
            <main className='main'>
                <section className="apps">
                    <div className="container">
                        <h1 className="home__heading">Apps</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>App id</th>
                                    <th>App name</th>
                                    <th>App link</th>
                                    <th>Icon</th>
                                    <th>Status</th>
                                    <th>More</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.app_id}</td>
                                            <td>{e.app_name}</td>
                                            <td><a href={e.app_link} target="_blank" rel="noopener noreferrer">link</a></td>
                                            <td><a href={e.app_image} target="_blank" rel="noopener noreferrer">icon</a></td>
                                            <td>{e.app_status ? "on" : "off"}</td>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.app_id}
                                                    onClick={HandleApp}
                                                >
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    style={{ 'color': 'red' }}
                                                    data-id={e.app_id}
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
                                <h3>{app.app_id} {app.app_name}</h3>
                                <br />
                                <div>
                                    <img src={app.app_image} alt='app icon' width={200} />
                                </div>
                                <br />
                                <p>
                                    <a href={app.app_link} target="_blank" rel="noopener noreferrer">{app.app_link}</a>
                                </p>
                                <br />
                                <p>Banner id :</p>
                                <p>{app.banner_id ? app.banner_id.join(', ') : '-'}</p>
                                <br />
                                <p>Inters id :</p>
                                <p>{app.inters_id ? app.inters_id.join(', ') : '-'}</p>
                                <br />
                                <p>Rewarded id :</p>
                                <p>{app.rewarded_id ? app.rewarded_id.join(', ') : '-'}</p>
                                <br />
                                <p>Native banner id :</p>
                                <p>{app.native_banner_id ? app.native_banner_id.join(', ') : "-"}</p>
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

export default Apps