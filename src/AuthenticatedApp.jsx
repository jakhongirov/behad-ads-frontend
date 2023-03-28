import useToken from './Hooks/useToken';
import { Routes, Route } from 'react-router-dom';

import AddApp from './components/addApp/addApp';
import AddCampaign from './components/addCampaign/addCampaign';
import HomeDev from './components/homeDev/homeDev';
import HomeAd from './components/homeAd/homeAd';
import Apps from './components/apps/apps';
import Advertisements from './components/advertisements/advertisements';
import HomeAdmin from './components/homeAdmin/homeAdmin';
import UsersAdmin from './components/usersAdmin/usersAdmin';
import AppsAdmin from './components/appsAdmin/appsAdmin';
import AdvertisementsAdmin from './components/advertisementsAdmin/advertisementsAdmin';
import CategoriesAdmin from './components/categoriesAdmin/categoriesAdmin';

function AuthenticatedApp() {
    const [token] = useToken();

    if (token.user_role === 'developer') {
        return (
            <Routes>
                <Route path='/developer' element={<HomeDev />} />
                <Route path='/developer/addApp' element={<AddApp />} />
                <Route path='/developer/apps' element={<Apps />} />
            </Routes>
        )
    } else if (token.user_role === 'reklomadatel') {
        return (
            <Routes>
                <Route path='/advertiser' element={<HomeAd />} />
                <Route path='/advertiser/addCampaign' element={<AddCampaign />} />
                <Route path='/advertiser/advertisement' element={<Advertisements />} />
            </Routes>
        )
    } else if (token.user_role === 'admin') {
        return (
            <Routes>
                <Route path='/admin' element={<HomeAdmin />} />
                <Route path='/admin/users' element={<UsersAdmin />} />
                <Route path='/admin/apps' element={<AppsAdmin />} />
                <Route path='/admin/advertisements' element={<AdvertisementsAdmin />} />
                <Route path='/admin/categories' element={<CategoriesAdmin />} />
            </Routes>
        )
    }
}

export default AuthenticatedApp