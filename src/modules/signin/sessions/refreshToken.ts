'use server';

import { cookies } from 'next/headers';

import { jwtDecode } from 'jwt-decode';
import * as Types from '../types';
import get from 'lodash/get';

export async function Create({ tokens }: { tokens: Types.IEntity.Tokens }) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const payloadRefreshToken = jwtDecode(tokens.refreshToken);

  cookieStore.set('refresh-token', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Update() {
  const refreshToken = (await cookies()).get('refresh-token')?.value;

  if (!refreshToken) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = jwtDecode(refreshToken);
  const cookieStore = await cookies();

  cookieStore.set('refresh-token', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: get(payload, 'exp') || expires,
    sameSite: 'lax',
    path: '/'
  });
}

export async function Delete() {
  const cookieStore = await cookies();

  cookieStore.delete('refresh-token');
}
