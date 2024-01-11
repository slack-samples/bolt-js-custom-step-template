const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');

config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  // To opt-out of using the JIT token to make `client` calls in
  // function-related callbacks, set attachFunctionToken to false.
  // attachFunctionToken: false,
});

/** Sample Function Listener */
app.function('sample_function', async ({ client, inputs, fail }) => {
  try {
    const { user_id } = inputs;

    await client.chat.postMessage({
      channel: user_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Click the button to signal the function has completed',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Complete function',
            },
            action_id: 'sample_button',
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
    fail({ error: `Failed to handle a function request (error: ${error}` });
  }
});

/** Sample Action Listener */
app.action('sample_button', async ({ body, client, complete, fail }) => {
  const { channel, message, interactivity: { interactor } } = body;

  try {
    await complete({ outputs: { user_id: interactor.id } });

    client.chat.update({
      channel: channel.id,
      ts: message.ts,
      text: 'Function completed successfully!',
    });
  } catch (error) {
    console.error(error);
    fail({ error: `Failed to handle a function request (error: ${error}` });
  }
});

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();
