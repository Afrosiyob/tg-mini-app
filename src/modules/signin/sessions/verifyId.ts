'use server';

import { cookies } from 'next/headers';

export async function Create({ verifyId }: { verifyId: string }) {
  const cookieStore = await cookies();

  cookieStore.set('verify-id', verifyId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Delete() {
  const cookieStore = await cookies();

  cookieStore.delete('verify-id');
}
