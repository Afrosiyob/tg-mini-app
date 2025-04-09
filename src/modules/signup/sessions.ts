'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import * as Types from './types';
import get from 'lodash/get';

export async function verifyToken() {
  const accessToken = (await cookies()).get('access-token')?.value;

  if (!accessToken) {
    redirect('/mobile/auth/signin');
  } else {
    redirect('/mobile/dashboard');
  }
}

export async function createToken({ tokens }: { tokens: Types.IEntity.Tokens }) {
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

  const payloadRefreshToken = jwtDecode(tokens.refreshToken);

  cookieStore.set('refresh-token', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });

  redirect('/mobile/dashboard');
}

export async function updateAccessToken() {
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

export async function updateRefreshToken() {
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

export async function createVerifyId({ verifyId }: { verifyId: string }) {
  const cookieStore = await cookies();

  cookieStore.set('verify-id', verifyId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
}

export async function deleteVerifyId() {
  const cookieStore = await cookies();

  cookieStore.delete('verify-id');
}

export async function deleteAccessToken() {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
}

export async function deleteRefreshToken() {
  const cookieStore = await cookies();

  cookieStore.delete('refresh-token');
}

export async function deleteDeviceToken() {
  const cookieStore = await cookies();

  cookieStore.delete('device-token');
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('refresh-token');
  cookieStore.delete('access-token');
}
