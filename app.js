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
app.function('sample_function', async ({ _client, inputs, complete, fail }) => {
  try {
    const { sample_input } = inputs;

    // Option 1: Complete the function after business logic is run
    complete({ outputs: { sample_output: sample_input } });

    // Option 2: Use interactivity (e.g. sending a button) to
    // complete the function only after a user takes action.
    // To use, add `client` to the callback arguments above.
    // await client.chat.postMessage({
    //   channel: 'YOUR-CHANNEL-ID-HERE',
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: 'Click the button to signal the function has completed!',
    //       },
    //       accessory: {
    //         type: 'button',
    //         text: {
    //           type: 'plain_text',
    //           text: 'Complete Function',
    //         },
    //         action_id: 'sample_button',
    //       },
    //     },
    //   ],
    // });
  } catch (error) {
    console.error(error);
    fail({ error });
  }
});

/** Sample Action Listener */
// For Option 2, commented out above
app.action('sample_button', async ({ ack, context, complete, fail }) => {
  await ack();

  // If related to a function_executed event, the context contains
  // information about the function execution the action is related to.
  const { functionExecutionId } = context;

  try {
    complete({ function_execution_id: functionExecutionId });
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
