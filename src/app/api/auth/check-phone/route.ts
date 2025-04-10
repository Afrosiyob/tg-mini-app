import { NextRequest, NextResponse } from 'next/server';

import * as Services from '@/services';

import get from 'lodash/get';
import * as Mappers from '@/modules/signin/mappers';

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    const { data } = await Services.Https.Server.request.post('/um/hub/v1/b2c-auth/check-phone', {
      phone: values.phone
    } as {
      phone: string;
    });

    const item = Mappers.CheckPhone(get(data, 'data'));

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
