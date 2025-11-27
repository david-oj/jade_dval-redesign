import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import { SALT } from './config/config.js';


export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: `JadeDval <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email not sent');
    }
};

export const htmlHelper = (fullName, interest) =>  `<html>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #111; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #111; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #1c1c1c; border-radius: 10px; padding: 40px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #20b29e; font-size: 28px; margin: 0;">Welcome ${fullName}</h1>
              </td>
            </tr>
            <tr>
              <td style="color: #cccccc; font-size: 16px; line-height: 1.6;">
                <p style="margin-top: 0;">Thank you for registering with <strong style="color: #20b29e;">Jade D’Val</strong>. We're excited to have you on board and to support your journey in tech!</p>
                <p>Your area of interest is: <strong style="color: #ffffff;">${interest}</strong></p>
                <p>If you have any questions, feel free to reach out to our team at any time. We're here to help you succeed.</p>
                <p style="margin-bottom: 0;">Best regards,</p>
                <p style="margin-top: 5px;">The <span style="color: #20b29e;">Jade D’Val</span> Team</p>
              </td>
            </tr>
           
            <tr>
              <td align="center" style="padding-top: 40px; font-size: 12px; color: #666;">
                © ${new Date().getFullYear()} Jade D’Val. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

// student login email html builder
export const loginDetailsHtml = (fullName, email, password) => `
<html>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #111; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #111; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #1c1c1c; border-radius: 10px; padding: 40px;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #20b29e; font-size: 28px; margin: 0;">Keep Going, ${fullName}!</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="color: #cccccc; font-size: 16px; line-height: 1.6;">
                <p style="margin-top: 0;">
                  You’re making great progress catching up in your learning journey. 
                  Every step you take brings you closer to mastering the skills you need 🚀.
                </p>

                <p>
                  Below are your login credentials for the <strong style="color: #20b29e;">Jade D’Val App</strong>. 
                  Use them to access your study materials and continue building your knowledge:
                </p>

                <!-- Credentials -->
                <table width="100%" cellpadding="10" cellspacing="0" border="0" 
                       style="margin: 20px 0; background-color: #2a2a2a; border-radius: 8px;">
                  <tr>
                    <td style="color: #20b29e; font-weight: bold; width: 100px;">Email:</td>
                    <td style="color: #ffffff;">${email}</td>
                  </tr>
                  <tr>
                    <td style="color: #20b29e; font-weight: bold;">Password:</td>
                    <td style="color: #ffffff;">${password}</td>
                  </tr>
                </table>

                <p style="margin-bottom: 0;">Best regards,</p>
                <p style="margin-top: 5px;">The <span style="color: #20b29e;">Jade D’Val</span> Team</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 40px; font-size: 12px; color: #666;">
                © ${new Date().getFullYear()} Jade D’Val. All rights reserved.
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

// html buider email for access code
export const accessCodeHtml = (fullName, department, accessCode) => `
<html>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #111; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #111; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #1c1c1c; border-radius: 10px; padding: 40px;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #20b29e; font-size: 28px; margin: 0;">Your One-Time Access Code</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="color: #cccccc; font-size: 16px; line-height: 1.6;">
                <p style="margin-top: 0;">
                  Hello <strong style="color: #ffffff;">${fullName}</strong>,
                </p>

                <p>
                  An access code has been generated for you by the <strong style="color: #20b29e;">Jade D’Val</strong> team.  
                  Use this code to unlock your <strong style="color: #ffffff;">${department}</strong> department materials in the app:
                </p>

                <!-- Access Code -->
                <div style="margin: 20px 0; text-align: center;">
                  <span style="display: inline-block; padding: 15px 25px; background-color: #20b29e; color: #111; 
                               font-size: 20px; font-weight: bold; border-radius: 8px; letter-spacing: 2px;">
                    ${accessCode}
                  </span>
                </div>

                <p style="color: #ff5555; font-weight: bold; text-align: center;">
                  ⚠️ This access code can only be used once.
                </p>

                <p>
                  Enter this code in the app to access your department’s resources.  
                  If you face any issues, please reach out to our support team.
                </p>

                <p style="margin-bottom: 0;">Best regards,</p>
                <p style="margin-top: 5px;">The <span style="color: #20b29e;">Jade D’Val</span> Team</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 40px; font-size: 12px; color: #666;">
                © ${new Date().getFullYear()} Jade D’Val. All rights reserved.
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;


// Hash password
const saltRounds = isNaN(parseInt(SALT, 10)) ? 10 : parseInt(SALT, 10);
export const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

// 
export const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
}

// function to create password
export const autoPasswordCreation = () => {
  const randomStr = Math.random().toString(36).substring(2, 12).toUpperCase();
  const yr = new Date().getFullYear();
  const password = `JDVA-${yr}-${randomStr}`;
  return password;
}

export default { 
  sendEmail,
  htmlHelper,
  hashPassword, 
  comparePassword, 
  autoPasswordCreation,
  loginDetailsHtml,
  accessCodeHtml
};