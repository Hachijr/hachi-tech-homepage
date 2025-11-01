import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form notification to admin
export const sendContactNotification = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007BFF;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Service Interest:</strong> ${contactData.serviceInterest || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Received: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent successfully');
  } catch (error) {
    console.error('Error sending contact notification:', error);
    throw error;
  }
};

// Send auto-reply to contact form submitter
export const sendContactAutoReply = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: contactData.email,
    subject: 'Thank you for contacting HLS Tech Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007BFF; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">HLS Tech</h1>
          <p style="color: white; margin: 5px 0;">Hachi Tech Solutions</p>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333;">Thank You for Reaching Out!</h2>
          <p>Dear ${contactData.name},</p>
          <p>We have received your message and appreciate you contacting HLS Tech Solutions. Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007BFF; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Message:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          <p>In the meantime, feel free to explore our services and portfolio on our website.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>The HLS Tech Team</strong></p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Hachi Tech Solutions | Innovating Technology, Empowering Solutions</p>
          <p>Email: info@hlstech.co.zm | Website: www.hlstech.co.zm</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent successfully');
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    // Don't throw error for auto-reply failures
  }
};

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to HLS Tech Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007BFF; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to HLS Tech!</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for subscribing to the HLS Tech newsletter! You'll now receive:</p>
          <ul>
            <li>Latest tech insights and tutorials</li>
            <li>Updates on our projects and services</li>
            <li>Exclusive tips and industry news</li>
            <li>Special offers and announcements</li>
          </ul>
          <p>We're excited to have you as part of our community!</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>The HLS Tech Team</strong></p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Newsletter welcome email sent successfully');
  } catch (error) {
    console.error('Error sending newsletter welcome:', error);
  }
};
