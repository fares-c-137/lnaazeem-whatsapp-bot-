# LNA Azeem WhatsApp Bot

This is a WhatsApp bot for LNA Azeem store that handles customer inquiries and orders.

## Server Deployment Instructions

### 1. Server Requirements
- Node.js (v14 or higher)
- npm (Node Package Manager)
- PM2 (Process Manager)

### 2. Installation Steps

1. **Install Node.js and npm**
   ```bash
   # For Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2 globally**
   ```bash
   npm install -g pm2
   ```

3. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd lna-azeem-whatsapp-bot
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start the bot using PM2**
   ```bash
   pm2 start bot.js --name "lna-bot"
   ```

### 3. PM2 Commands

- Start the bot: `pm2 start bot.js --name "lna-bot"`
- Stop the bot: `pm2 stop lna-bot`
- Restart the bot: `pm2 restart lna-bot`
- View logs: `pm2 logs lna-bot`
- Monitor the bot: `pm2 monit`

### 4. Auto-start on Server Reboot
```bash
pm2 startup
pm2 save
```

### 5. Important Notes
- Make sure to scan the QR code when the bot first starts
- Keep the server running 24/7
- Monitor the logs regularly for any issues
- The bot will only respond when users send "test" as a message

## Local Development
For local development, use:
```bash
npm run dev
``` 