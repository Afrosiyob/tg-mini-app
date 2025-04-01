/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

import http from '@/app/lib/axiosInstance';

import * as Mappers from '@/app/login/lib/mappers';

import get from 'lodash/get';

export async function GET() {
  return NextResponse.json({ message: 'hello get' });
}

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    if (!values.username || !values.password) {
      return new NextResponse(JSON.stringify({ error: 'validation' }), {
        status: 400
      });
    }

    const { data } = await http.request.post('/um/api/v1/auth/sign-in', {
      username: values.username,
      password: values.password
    } as {
      username: string;
      password: string;
    });

    const item = Mappers.Tokens(get(data, 'data'));

    return new NextResponse(JSON.stringify(item), {
      headers: {
        'Content-type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500
    });
  }
}
