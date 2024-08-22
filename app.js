const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');

config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
});

/** Sample Step Listener */
app.function('sample_step', async ({ client, inputs, fail }) => {
  try {
    const { user_id } = inputs;

    await client.chat.postMessage({
      channel: user_id,
      text: 'Click the button to signal the step has completed',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Click the button to signal the step has completed',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Complete step',
            },
            action_id: 'sample_button',
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
    fail({ error: `Failed to handle a step request: ${error}` });
  }
});

/** Sample Action Listener */
app.action('sample_button', async ({ body, client, complete, fail }) => {
  const { channel, message, user } = body;

  try {
    // Steps should be marked as successfully completed using `complete` or
    // as having failed using `fail`, else they'll remain in an 'In progress' state.
    // Learn more at https://api.slack.com/automation/interactive-messages
    await complete({ outputs: { user_id: user.id } });

    await client.chat.update({
      channel: channel.id,
      ts: message.ts,
      text: 'Step completed successfully!',
    });
  } catch (error) {
    console.error(error);
    fail({ error: `Failed to handle a step request: ${error}` });
  }
});

/** Start the Bolt App */
(async () => {
  try {
    await app.start();
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Failed to start the app', error);
  }
})();
