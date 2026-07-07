import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, attendance, guestCount, notes } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.warn('Gmail credentials not found in env. Falling back to success response.');
      return NextResponse.json({ success: true, warning: 'Credentials missing' });
    }

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const isAttending = attendance === 'attending';
    const recipient = process.env.RSVP_RECEIVER_EMAIL || gmailUser;

    const mailOptions = {
      from: `"${name}" <${gmailUser}>`,
      to: recipient,
      subject: `Wedding RSVP: ${name} has ${isAttending ? 'Accepted' : 'Declined'}`,
      text: `
Wedding RSVP Submission:
-------------------------------------
Name: ${name}
Response: ${isAttending ? 'Joyfully Accept' : 'Regretfully Decline'}
${isAttending ? `Guests: ${guestCount}` : ''}
Wishes / Notes: ${notes || 'None'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #C5A880; border-radius: 8px; background-color: #FDFBF7;">
          <h2 style="color: #2E1E17; border-bottom: 2px solid #C5A880; padding-bottom: 10px; margin-top: 0;">Wedding RSVP Response Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 150px; color: #8E754C;">Guest Name:</td>
              <td style="padding: 8px; color: #2E1E17;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #8E754C;">Attendance:</td>
              <td style="padding: 8px; color: #2E1E17; font-weight: bold;">
                <span style="color: ${isAttending ? '#76846D' : '#C8745E'}">${isAttending ? 'Joyfully Accept' : 'Regretfully Decline'}</span>
              </td>
            </tr>
            ${isAttending ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #8E754C;">Guests Count:</td>
              <td style="padding: 8px; color: #2E1E17;">${guestCount}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #8E754C; vertical-align: top;">Notes / Wishes:</td>
              <td style="padding: 8px; color: #2E1E17; white-space: pre-wrap;">${notes || 'None'}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; text-align: center; font-size: 11px; color: #8E754C; border-top: 1px solid rgba(197, 168, 128, 0.2); padding-top: 15px;">
            Sruthy & Adarsh • 2026
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending RSVP email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
