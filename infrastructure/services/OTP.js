import { createClient } from 'redis';
import { Redis } from '@upstash/redis';
import { Resend } from "resend";
import crypto from 'crypto';
import { log } from 'console';


const resend = new Resend(process.env.RESEND_API_KEY);
class OTP {
    constructor() {
        this.redisClient = new Redis({
            url: "https://stirring-dory-25781.upstash.io",
            token:"AWS1AAIncDIyMGM0NzExY2Y2ZjQ0ZDQxYTg2Y2QzODg1MDk4NDgwYnAyMjU3ODE",
        });
        
      
    }

    generateOtp() {
        return crypto.randomInt(100000, 999999).toString();
    }
    

    async sendOtp(email) {
  try {
    console.log("Generating OTP");

    const otp = this.generateOtp();

    // Store OTP in Redis (60 seconds)
    await this.redisClient.set(`otp:${email}`, otp, { ex: 60 });
    console.log("OTP stored in Redis");

    // Send email via Resend
    await resend.emails.send({
      from: "PhoneFix <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>OTP Verification</h2>
          <p>Your OTP code is:</p>
          <h1>${otp}</h1>
          <p>This code is valid for 1 minute.</p>
        </div>
      `,
    });

    console.log("OTP email sent successfully");
    return true;

  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP. Please try again later.");
  }
}
    async verifyOtp(email, otp) {
        try {
            const storedOtp = await this.redisClient.get(`otp:${email}`);
            console.log(storedOtp,"hrllk");
            
            if (!storedOtp) {
                throw new Error("OTP has expired.");
            }
            console.log(`Stored OTP: ${storedOtp}`);
            // Check their types

            const Ismatch =storedOtp == otp;
            return Ismatch
            
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw new Error("Failed to verify OTP. Please try again later.");
        }
    }

    async deleteOtp(email) {
        try {
            await this.redisClient.del(email);
        } catch (error) {
            console.error("Error deleting OTP:", error);
            throw new Error("Failed to delete OTP. Please try again later.");
        }
    }
}

export default OTP;
