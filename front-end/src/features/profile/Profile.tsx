import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myServer } from '../../endpoints/endpoints';
import { selectAddress } from '../shipping/shippingSlice';
import { getProfileAsync, selectMyProfile } from './profileSlice';
import AddressManagement from '../shipping/AddressManagement';
import { logoutAsync } from '../authentication/authenticationSlice';




const Profile = () => {
    const dispatch = useAppDispatch();

   

    useEffect(() => {
        dispatch(getProfileAsync());
      }, [dispatch]);

    const profile = useAppSelector(selectMyProfile)

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${year}-${month}-${day}, ${hours}:${minutes}`;
      }
      

    const handleLogout = () => {
        dispatch(logoutAsync())
    };

  return (
    <div>
      <div>
          {profile.username}<br/>
          {formatDate(profile.date)}<br/>

          
      </div>

      
      <br/>
        <br/>
        {/* to delete */}

          <AddressManagement />
      
          <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile