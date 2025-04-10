/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse, userAgent } from 'next/server';

import * as Services from '@/services';

import { cookies } from 'next/headers';

import * as Mappers from '@/modules/signup/mappers';

import get from 'lodash/get';

export async function POST(request: NextRequest) {
  try {
    const deviceToken = (await cookies()).get('device-token');
    const values = await request.json();

    const { data } = await Services.Https.Server.request.post('/um/hub/v1/b2c-auth/sign-up-otp', {
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

    const item = Mappers.SetProfileInfo(get(data, 'data'));

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
