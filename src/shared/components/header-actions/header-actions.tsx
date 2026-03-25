'use client';

import { NotificationButton } from './components/notification-button';
import { SettingsButton } from './components/settings-button';
import { UserButton } from './components/user-button';

export const HeaderActions = () => (
  <div className="flex items-center gap-4">
    <NotificationButton />
    <SettingsButton />
    <UserButton />
  </div>
);
