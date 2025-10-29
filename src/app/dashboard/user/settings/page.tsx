import ChangePassword from '../../admin/settings/_components/ChangePassword/ChangePassword';
import UpdateProfile from '../../admin/settings/_components/UpdateProfile/UpdateProfile';
import MessagingPreferences from './_components/MessagingPreferences';
// import { MessagingPreferences } from './_components/MessagingPreferences';

const UserSettingPage = () => {
  return (
    <div className="  p-6">
      <div className="container mx-auto">
        <div className="space-y-6">
          <UpdateProfile />
          <ChangePassword />
          <MessagingPreferences />
        </div>
      </div>
    </div>
  );
};
export default UserSettingPage;
