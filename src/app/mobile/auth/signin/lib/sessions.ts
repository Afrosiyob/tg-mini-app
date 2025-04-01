'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import * as Types from '@/app/login/lib/types';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function verifyTokenSession() {
  const cookie = (await cookies()).get('token-session')?.value;
  const session = await decrypt(cookie);

  if (!session?.accessToken && !session?.refreshToken) {
    redirect('/mobile/auth/signin');
  } else {
    redirect('/mobile/dashboard');
  }
}

export async function createTokenSession({ tokens }: { tokens: Types.IEntity.Tokens }) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(tokens);

  cookieStore.set('token-session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function updateTokenSession() {
  const session = (await cookies()).get('token-session')?.value;

  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('token-session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/'
  });
}

export async function deleteTokenSession() {
  const cookieStore = await cookies();

  cookieStore.delete('token-session');
}

export async function createVerifyIdSession({ verifyId }: { verifyId: string }) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set('verify-id-session', verifyId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function deleteVerifyIdSession() {
  const cookieStore = await cookies();

  cookieStore.delete('verify-id-session');
}
