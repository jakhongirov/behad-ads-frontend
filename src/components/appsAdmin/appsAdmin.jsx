import { useState, useEffect } from 'react'
import useToken from '../../Hooks/useToken';

function AppsAdmin() {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [app, setApp] = useState({})
    const [token, setToken] = useToken()
    const [offset, setOffset] = useState(0)
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch('https://ads.behad.uz/api/v1/apps?offset=' + offset, {
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

    useEffect(() => {
        fetch('https://ads.behad.uz/api/v1/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setCategories(data.data)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }, [token, refresh, offset])

    const HandleApp = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.behad.uz/api/v1/apps?appId=' + id, {
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

        fetch('https://ads.behad.uz/api/v1/deleteApp', {
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

    const UpdateStatus = (e) => {
        e.preventDefault();
        const { category, status } = e.target.elements

        fetch('https://ads.behad.uz/api/v1/editAppStatus', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                app_id: id,
                category_id: Number(category.value),
                status: status.checked
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setRefresh(refresh + 1)
                    setEdit(!edit)
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
                                    <th>Developer id</th>
                                    <th>App name</th>
                                    <th>App link</th>
                                    <th>Icon</th>
                                    <th>Status</th>
                                    <th>More</th>
                                    <th>Edit Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.app_id}</td>
                                            <td>{e.developer_id}</td>
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
                                                    onClick={() => {
                                                        setEdit(!edit)
                                                        setId(e.app_id)
                                                    }}
                                                >
                                                    Edit
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

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className='modal__item'>
                                <h5>Edit status</h5>
                                <br />
                                <form onSubmit={UpdateStatus}>
                                    <select name="category">
                                        {
                                            categories && categories.map((e, i) => (
                                                <option value={e.category_id}>{e.category_name}</option>
                                            ))
                                        }
                                    </select>
                                    <br />
                                    <p>App status</p>
                                    <input type="checkbox" name='status' />
                                    <br />
                                    <button className='edit__btn' style={{ 'display': "block" }} >Edit</button>
                                </form>
                                <br />
                                <button onClick={() => setEdit(!edit)}>Close</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AppsAdmin