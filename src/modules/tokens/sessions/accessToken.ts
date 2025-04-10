'use server';

import { cookies } from 'next/headers';

import { jwtDecode } from 'jwt-decode';

export async function Create({ accessToken }: { accessToken: string }) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const payloadAccessToken = jwtDecode(accessToken);

  cookieStore.set('access-token', accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Delete() {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
}
