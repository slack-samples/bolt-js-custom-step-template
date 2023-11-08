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

/** Sample Function Listener */
app.function('sample_function', async ({ inputs, complete, fail }) => {
  try {
    const { sample_input } = inputs;
    complete({ outputs: { sample_output: sample_input } });
  } catch (error) {
    console.error(error);
    fail({ error });
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
