import { NextRequest, NextResponse } from 'next/server';

import http from '@/services/http';
import { cookies } from 'next/headers';

import get from 'lodash/get';

export const Token = (
  item?: unknown
): {
  accessToken: string;
  refreshToken: string;
} => ({
  accessToken: get(item, 'accessToken') || '',
  refreshToken: get(item, 'refreshToken') || ''
});

export async function POST(request: NextRequest) {
  try {
    const verifyId = (await cookies()).get('verify-id');
    const values = await request.json();

    const { data } = await http.request.post('/um/hub/v1/b2c-auth/sign-in-confirm-otp', {
      verifyId: get(verifyId, 'value') || '',
      verifyCode: values.verifyCode
    } as {
      verifyId: string;
      verifyCode: string;
    });

    const item = Token(get(data, 'data'));

    return new NextResponse(JSON.stringify(item), {
      headers: {
        'Content-type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500
    });
  }
}
