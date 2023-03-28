import useToken from "../../Hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Redirect() {
    const [token, setToken] = useToken();
    const navigate = useNavigate()

    useEffect(() => {
        if (token.user_role === 'developer') {
            navigate('/developer')
        } else if (token.user_role === 'reklomadatel') {
            navigate('/advertiser')
        } else if (token.user_role === 'admin') {
            navigate('/admin')
        } else {
            setToken(false)
        }
    }, [token])


    return (
        <></>
    )

}

export default Redirect