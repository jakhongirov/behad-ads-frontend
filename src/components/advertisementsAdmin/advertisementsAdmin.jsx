import { useState, useEffect } from 'react'
import useToken from '../../Hooks/useToken';

function AdvertisementsAdmin() {
    const [data, setData] = useState([])
    const [token, setToken] = useToken()
    const [offset, setOffset] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [show, setShow] = useState(false)
    const [ad, setAd] = useState({})

    useEffect(() => {
        fetch('https://ads.adstar.uz/api/v1/advertisements?offset=' + offset, {
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
    }, [token, offset, refresh])

    const HandleAd = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/advertisements?campaign_id=' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setAd(data.data[0])
                    setShow(!show)
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/deleteAdvertisement', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                campaign_id: id
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

    const checkboxChange = (e) => {
        const id = JSON.parse(e.target.dataset.id);
        const status = JSON.parse(e.target.dataset.checked);

        fetch("https://ads.adstar.uz/api/v1/editAdStatus", {
            method: "PUT",
            body: JSON.stringify({
                campaign_id: id,
                status: !status
            }),
            headers: { token: token, "Content-Type": "application/json", },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setRefresh(refresh + 1)
                } else if (data.status === 401) {
                    setToken(false)
                } else {
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <main className='main'>
                <section className="advertisements">
                    <div className="container">
                        <h1 className='home__heading'>Advertisements</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ad id</th>
                                    <th>Campaign name</th>
                                    <th>Ad title</th>
                                    <th>Ad description</th>
                                    <th>Ad link</th>
                                    <th>Ad upload link</th>
                                    <th>Ad type</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Active</th>
                                    <th>Actions</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.campaign_id}</td>
                                            <td>{e.campaign_name}</td>
                                            <td>{e.advertisement_title.split(' ').length > 3 ? e.advertisement_title.split(' ').slice(0, 3).join(' ') + '...' : e.advertisement_title}</td>
                                            <td>{e.advertisement_description.split(' ').length > 3 ? e.advertisement_description.split(' ').slice(0, 3).join(' ') + '...' : e.advertisement_description}</td>
                                            <td>
                                                <a style={{ "color": "blue" }} href={e.advertisement_link} target='_blank'>Link</a>
                                            </td>
                                            <td>
                                                <a style={{ "color": "blue" }} href={e.advertisement_media_link} target='_blank'>Link</a>
                                            </td>
                                            <td>
                                                {e.advertisement_type}
                                            </td>
                                            <td>
                                                {e.gender}
                                            </td>
                                            <td>
                                                {e.min_age}-{e.max_age}
                                            </td>
                                            <td>
                                                {e.country}
                                            </td>
                                            <td>
                                                {e.city}
                                            </td>
                                            <button
                                                className='edit__btn'
                                                style={e.advertisement_active ? {
                                                    "background": "green"
                                                } : {
                                                    "background": "none",
                                                    "color": "black",
                                                    "border": "1px solid red"
                                                }}
                                                data-checked={e.advertisement_active}
                                                data-id={e.campaign_id}
                                                onClick={checkboxChange}
                                            >
                                                {e.advertisement_active ? "On" : "Off"}
                                            </button>
                                            <td>
                                                <button
                                                    className='more__btn'
                                                    data-id={e.campaign_id}
                                                    onClick={HandleAd}
                                                >
                                                    •••
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    style={{ 'color': 'red' }}
                                                    data-id={e.campaign_id}
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
                                <h3>{ad.advertisement_title}</h3>
                                <br />
                                <p>{ad.advertisement_description}</p>
                                <br />
                                <p>{ad.advertisement_action_text}</p>
                                <br />
                                <p>Views:</p>
                                {
                                    ad.view && ad.view.map((e, i) => (
                                        <p key={i}>{e.time} - {e.count}</p>
                                    ))
                                }
                                <br />
                                <p>Clicks:</p>
                                {
                                    ad.click && ad.click.map((e, i) => (
                                        <p key={i}>{e.time} - {e.count}</p>
                                    ))
                                }
                                <br />
                                <p>Full views:</p>
                                {
                                    ad.full_view && ad.full_view.map((e, i) => (
                                        <p key={i}>{e.time} - {e.count}</p>
                                    ))
                                }
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

export default AdvertisementsAdmin  