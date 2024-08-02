'use server'

import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/client';

if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined in the environment variables");
}

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
const subuserName = process.env.NEXT_PUBLIC_SUBUSER_NAME;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'Type query parameter is required' }, { status: 400 });
  }

  try {
    let response;
    if (type === 'domains') {
      response = await sendgrid.request({
        method: 'GET',
        url: '/v3/whitelabel/domains',
        headers: { 'On-Behalf-Of': subuserName }
      });
    } else if (type === 'links') {
      response = await sendgrid.request({
        method: 'GET',
        url: '/v3/whitelabel/links',
        headers: { 'On-Behalf-Of': subuserName }
      });
    } else {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    return NextResponse.json(response[1], { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}