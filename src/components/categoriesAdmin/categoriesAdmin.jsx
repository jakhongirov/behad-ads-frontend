import { useState, useEffect } from 'react'
import useToken from '../../Hooks/useToken';

function CategoriesAdmin() {
    const [data, setData] = useState([])
    const [found, setFound] = useState('')
    const [token, setToken] = useToken()
    const [add, setAdd] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch('https://ads.adstar.uz/api/v1/categories', {
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
    }, [token, refresh])

    const HandleDelete = (e) => {
        const id = JSON.parse(e.target.dataset.id);

        fetch('https://ads.adstar.uz/api/v1/deleteCategory', {
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

    const AddCategory = (e) => {
        e.preventDefault();
        const { category_name } = e.target.elements

        fetch('https://ads.adstar.uz/api/v1/addCategory', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category_name: category_name.value.trim()
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    setRefresh(refresh + 1)
                    setAdd(!add)
                    category_name.value = null
                } else if (data.status === 401) {
                    setToken(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const UpdateCategory = (e) => {
        e.preventDefault();
        const { category_name } = e.target.elements

        fetch('https://ads.adstar.uz/api/v1/editCategory', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                category_name: category_name.value.trim()
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
                        <h1 className="home__heading">Categories</h1>

                        <button
                            className='home__login__btn'
                            onClick={() => setAdd(!add)}
                        >
                            Add category
                        </button>

                        <br />

                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.category_id}</td>
                                            <td>{e.category_name}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setEdit(!edit)
                                                        setId(e.category_id)
                                                        setFound(e.category_name)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    style={{ 'color': 'red' }}
                                                    data-id={e.category_id}
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

                        <div className={add ? "modal" : "modal--close"}>
                            <div className='modal__item'>
                                <h5>Add</h5>
                                <br />
                                <form onSubmit={AddCategory}>
                                    <input
                                        style={{
                                            'display': "block",
                                            'padding': "10px"
                                        }}
                                        type="text"
                                        name='category_name'
                                        placeholder='Category title' />

                                    <br />

                                    <button className='edit__btn' style={{ 'display': "block" }} >Add</button>
                                </form>
                                <br />
                                <button onClick={() => setAdd(!add)}>Close</button>
                            </div>
                        </div>

                        <div className={edit ? "modal" : "modal--close"}>
                            <div className='modal__item'>
                                <h5>Edit</h5>
                                <br />
                                <form onSubmit={UpdateCategory}>
                                    <input
                                        style={{
                                            'display': "block",
                                            'padding': "10px"
                                        }}
                                        type="text"
                                        name='category_name'
                                        placeholder='Category title'
                                        defaultValue={found} />

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

export default CategoriesAdmin