import { NextRequest, NextResponse } from 'next/server';

import * as Services from '@/services';
import * as Mappers from '@/modules/signin/mappers';
import get from 'lodash/get';

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    const { data } = await Services.Https.Server.request.post('/um/hub/v1/b2c-auth/sign-in-confirm-otp', {
      verifyId: values.verifyId,
      verifyCode: values.verifyCode
    } as {
      verifyId: string;
      verifyCode: string;
    });

    const item = Mappers.ConfirmOtp(get(data, 'data'));

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
