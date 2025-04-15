# Laava AI Agency

This is the codebase for the Laava AI Agency website.

## Contact Form and Newsletter Setup

The website includes a contact form and newsletter subscription functionality using Nodemailer with Gmail SMTP.

### Setting Up Email Functionality

1. Create a `.env.local` file in the root directory of the project (or rename the existing `.env.local.example`).
2. Add the following environment variables:

```
# SMTP Configuration for Nodemailer
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_RECIPIENT=recipient-email@example.com
```

### Creating a Google App Password

For `EMAIL_PASS`, you need to use a Google App Password, not your regular Gmail password:

1. Go to your Google Account settings > Security
2. Enable 2-Step Verification if not already enabled
3. Go to App passwords (under "Signing in to Google")
4. Select "Mail" as the app and "Other" as the device (name it "Laava Website")
5. Copy the generated 16-character password and paste it as the value for `EMAIL_PASS`

### Testing the Contact Form

After setting up the environment variables:

1. Start the development server with `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. You should receive confirmation emails at both the sender and recipient addresses

### Newsletter Subscription

The newsletter subscription form in the footer works with the same email service. When users subscribe:

1. They receive a welcome email
2. The subscription is logged in the console (in a production environment, you would store this in a database)

## Visitor Tracking System

This project includes a visitor tracking system that identifies companies visiting your website based on their IP addresses.

### Features

- Records visitor IPs, company information, and pages visited
- Tracks visit count and timestamps
- Displays visitor data in a secure dashboard
- Respects GDPR with cookie consent integration

### Setup

1. **MongoDB Configuration**

   Make sure you have a MongoDB database available (Atlas free tier or local). Update your `.env.local` file with:

   ```
   MONGODB_URI="your_mongodb_connection_string"
   ```

2. **Dashboard Authentication**

   To secure the dashboard, set up credentials in your `.env.local` file:

   ```
   DASHBOARD_USERNAME="your_username"
   DASHBOARD_PASSWORD="your_secure_password"
   ```

3. **Rate Limiting**

   The free IP-API.com service used for IP lookups is limited to 45 requests per minute. For production use, consider upgrading to a paid plan or using MaxMind's GeoIP database.

### Usage

- **Visitor Dashboard**: Access your visitor data at `/dashboard`
- **IP Tracking**: Automatically tracks visitor IPs when your site loads
- **Cookie Consent**: Visitor tracking respects the user's cookie consent preferences

### Production Recommendations

- For production use, consider using MaxMind's GeoIP database instead of IP-API.com
- Set up a MongoDB Atlas cluster with proper security settings
- Use a strong password for dashboard access
- Consider implementing additional authentication like OAuth or NextAuth.js

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
``` 