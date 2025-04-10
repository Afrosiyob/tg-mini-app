import { popup } from '@telegram-apps/sdk-react';
import { redirect } from 'next/navigation';

import * as Sessions from '../sessions';

async function Logout() {
  if (popup.open.isAvailable()) {
    // popup.isOpened() -> false
    const promise = popup.open({
      title: 'Hello dude!',
      message: 'Do u wont logout ?',
      buttons: [
        { id: 'cancel', type: 'cancel' },
        { id: 'ok', type: 'ok' }
      ]
    });

    const buttonId = await promise;

    switch (buttonId) {
      case 'cancel':
        console.log('popup canceled');
        break;

      case 'ok':
        await Sessions.AccessToken.Delete();
        await Sessions.RefreshToken.Delete();

        redirect('/auth/signin');

      default:
        break;
    }
  }
}

export default Logout;
