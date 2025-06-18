// Import venom-bot
const venom = require('venom-bot');
const fs = require('fs');
const path = require('path');

// In-memory session store to track users who have interacted
const userSessions = {};

// Menu message in Arabic
const menuMessage = `مرحباً بك في متجر LNA Azeem 👋
كيف يمكننا مساعدتك اليوم؟
الرجاء الرد برقم الخيار المطلوب:

1️⃣ - طلب منتج جديد
2️⃣ - مواعيد العمل
3️⃣ - دليل المقاسات
4️⃣ - متابعة حالة الطلب
5️⃣ - استرجاع منتج
6️⃣ - فرص العمل المتاحة
`;

// Working hours message
const workingHoursMessage = `⏰ مواعيد العمل في جميع الفروع:
من الساعة ٩ صباحاً إلى ١١:٣٠ مساءً

للرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"`;

// Order instructions message
const orderInstructionsMessage = `📝 لطلب منتج جديد، يرجى اتباع الخطوات التالية:

1. إرسال صورة المنتج المطلوب
2. تحديد اللون المطلوب
3. تحديد المقاس المطلوب

سيتم الرد عليك خلال 24 ساعة لتأكيد توفر المنتج.

للرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"`;

// Size guide path
const sizeGuidePath = 'C:\\Users\\Fares-Ibrahim\\Desktop\\LNA AZEEM WHATSAPP BOT\\image.png';

// Start the bot
venom
  .create({
    session: 'lna-azeem-bot',
    multidevice: true,
    folderNameToken: 'tokens',
    mkdirFolderToken: '',
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserWS: '',
    browserArgs: [''],
    puppeteerOptions: {},
    disableWelcome: true,
    updatesLog: true,
    autoClose: 60000,
    createPathFileToken: true,
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error('Error starting venom-bot:', error);
  });

/**
 * Main bot lo`a`c
 * @param {import('venom-bot').Whatsapp} client
 */
function start(client) {
  client.onMessage(async (message) => {
    // Only respond to text messages from users (not groups or self)
    if (!message.isGroupMsg && message.from) {
      const userId = message.from;
      const userInput = message.body ? message.body.trim().toLowerCase() : '';

      // Only respond if user sends "test"
      if (userInput !== 'test') {
        return;
      }

      // Check for menu command
      if (userInput === 'menu' || userInput === 'قائمة') {
        await client.sendText(userId, menuMessage);
        return;
      }

      // If user is new, send menu and mark as greeted
      if (!userSessions[userId]) {
        await client.sendText(userId, menuMessage);
        userSessions[userId] = { greeted: true };
        return;
      }

      // Handle user input
      switch (userInput) {
        case '1':
        case '1️⃣':
          await client.sendText(userId, orderInstructionsMessage);
          userSessions[userId].waitingForOrder = true;
          break;

        case '2':
        case '2️⃣':
          await client.sendText(userId, workingHoursMessage);
          break;

        case '3':
        case '3️⃣':
          try {
            await client.sendImage(
              userId,
              sizeGuidePath,
              'size-guide',
              '📏 دليل المقاسات\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
            );
          } catch (error) {
            console.error('Error sending size guide:', error);
            await client.sendText(
              userId,
              'عذراً، حدث خطأ في إرسال دليل المقاسات. يرجى المحاولة مرة أخرى لاحقاً.\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
            );
          }
          break;

        case '4':
        case '4️⃣':
          await client.sendText(
            userId,
            '📦 لمتابعة حالة طلبك، يرجى إرسال رقم الطلب الخاص بك.\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
          );
          break;

        case '5':
        case '5️⃣':
          await client.sendText(
            userId,
            '🔄 لاسترجاع منتج أو متابعة حالة الاسترجاع، يرجى إرسال رقم الطلب الخاص بك.\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
          );
          break;

        case '6':
        case '6️⃣':
          await client.sendText(
            userId,
            '💼 للاطلاع على فرص العمل المتاحة، يرجى زيارة موقعنا الإلكتروني أو التواصل معنا عبر البريد الإلكتروني: careers@lnaazeem.com\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
          );
          break;

        default:
          // If it's an image and user is in order mode
          if (message.type === 'image' && userSessions[userId].waitingForOrder) {
            await client.sendText(
              userId,
              'شكراً لإرسال الصورة. يرجى تحديد اللون والمقاس المطلوب.\n\nللرجوع للقائمة الرئيسية، اكتب "قائمة" أو "menu"'
            );
            userSessions[userId].hasImage = true;
          } else {
            await client.sendText(
              userId,
              `❗ الرجاء اختيار رقم صحيح من القائمة (1-6)\n\n${menuMessage}`
            );
          }
      }
    }
  });
} 