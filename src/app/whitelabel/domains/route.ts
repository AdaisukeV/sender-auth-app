'use server'

import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/client';

if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not defined in the environment variables");
}

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
const subuserName = process.env.NEXT_PUBLIC_SUBUSER_NAME;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { domain, automatedSecurity, customDKIM, dkimSelector } = body;
    try {
        const response = await sendgrid.request({
            method: 'POST',
            url: '/v3/whitelabel/domains',
            headers: { 'On-Behalf-Of': subuserName },
            body: {
                domain,
                automatic_security: automatedSecurity,
                custom_dkim_selector: customDKIM ? dkimSelector : null
            }
        });
        return NextResponse.json(response[1], { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}