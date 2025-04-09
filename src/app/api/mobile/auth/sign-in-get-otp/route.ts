/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse, userAgent } from 'next/server';

import http from '@/services/http';
import { cookies } from 'next/headers';
import get from 'lodash/get';

export const GetOtp = (
  item?: unknown
): {
  verifyId: string;
  expires: number;
} => ({
  verifyId: get(item, 'verifyId') || '',
  expires: get(item, 'expires') || 0
});

export async function POST(request: NextRequest) {
  try {
    const deviceToken = (await cookies()).get('device-token');
    const values = await request.json();

    const { data } = await http.request.post('/um/hub/v1/b2c-auth/sign-in-get-otp', {
      phone: values.phone,
      password: values.password,
      device: {
        token: get(deviceToken, 'value') || '',
        deviceOs: userAgent(request).os.name?.toUpperCase(),
        model: userAgent(request).device.model,
        osVersion: userAgent(request).os.version,
        appVersion: 'Via-1.02'
      }
    } as {
      phone: string;
      password: string;
      device: {
        token: string;
        deviceOs: string;
        model: string;
        osVersion: string;
        appVersion: string;
      };
    });

    const item = GetOtp(get(data, 'data'));

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
