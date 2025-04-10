/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse, userAgent } from 'next/server';

import * as Services from '@/services';
import * as Mappers from '@/modules/signup/mappers';

import get from 'lodash/get';

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    const { data } = await Services.Https.Server.request.post('/um/hub/v1/b2c-auth/sign-up-get-otp', {
      phone: values.phone,
      password: values.password
    } as {
      phone: string;
      password: string;
    });

    const item = Mappers.GetOtp(get(data, 'data'));

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
