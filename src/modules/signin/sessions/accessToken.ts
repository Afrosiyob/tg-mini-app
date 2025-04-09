'use server';

import { cookies } from 'next/headers';

import { jwtDecode } from 'jwt-decode';
import * as Types from '../types';
import get from 'lodash/get';

export async function Create({ tokens }: { tokens: Types.IEntity.Tokens }) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const payloadAccessToken = jwtDecode(tokens.accessToken);

  cookieStore.set('access-token', tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Update() {
  const accessToken = (await cookies()).get('access-token')?.value;

  if (!accessToken) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = jwtDecode(accessToken);
  const cookieStore = await cookies();

  cookieStore.set('access-token', accessToken, {
    httpOnly: true,
    secure: true,
    expires: get(payload, 'exp') || expires,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Delete() {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
}
