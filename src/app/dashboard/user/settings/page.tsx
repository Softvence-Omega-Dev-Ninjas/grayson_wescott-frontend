import { AssignedProgram } from './_components/AssignedProgram';
import { EliteStrengthProgram } from './_components/EliteStrengthProgram';
import { MessagingPreferences } from './_components/MessagingPreferences';
import { PaymentsSubscription } from './_components/PaymentsSubscription';
import { ProfileAccount } from './_components/ProfileAccount';
import { ProgressTracking } from './_components/ProgressTracking';

export default function UserSettingPage() {
  return (
    <div className="  p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Row */}
          <ProfileAccount />
          <AssignedProgram />

          {/* Middle Row */}
          <ProgressTracking />
          <EliteStrengthProgram />

          {/* Bottom Row */}
          <div className="grid gap-6">
            <MessagingPreferences />
          </div>
          <PaymentsSubscription />
        </div>
      </div>
    </div>
  );
}
