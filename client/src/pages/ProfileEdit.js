import '../App.css'
import './ProfileEdit.css'
import EditSidebar from '../components/profileEdit/EditSidebar'
import BasicProfileEdit from '../components/profileEdit/BasicProfileEdit'
import PasswordEdit from '../components/profileEdit/PasswordEdit'
import Footer from '../components/Footer'
import { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'


const _userdata = localStorage.userdata || null;
if (_userdata) {
    console.log("Successfully fetched userdata from localStorage")
    console.log(JSON.parse(localStorage.userdata));
}



const ProfileEdit = () => {
    const [userdata, setUserdata] = useState(_userdata)
    let { url, path } = useRouteMatch();
    return (
        <div className="page-container">
            <main className="profile-edit-container">
                <EditSidebar url={url}/>
                <section className="profile-edit-feature">
                    <Switch>
                        <Route exact path={`${path}`}>
                            <BasicProfileEdit userdata={userdata}/>
                        </Route>
                        <Route path={`${path}/password`}>
                            <PasswordEdit/>
                        </Route>
                    </Switch>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ProfileEdit;