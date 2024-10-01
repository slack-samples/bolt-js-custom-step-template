# Bolt for JavaScript Custom Step Template

This is a Bolt for JavaScript template app used to build custom steps for
use in [Workflow Builder](https://api.slack.com/start#workflow-builder).

## Setup

Before getting started, first make sure you have a development workspace where
you have permission to install apps. **Please note that the features in this
project require that the workspace be part of
[a Slack paid plan](https://slack.com/pricing).**

### Developer Program

Join the [Slack Developer Program](https://api.slack.com/developer-program) for
exclusive access to sandbox environments for building and testing your apps,
tooling, and resources created to help developers build and grow.

## Installation

### Create a Slack App

1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and
   choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that
   says `*Paste your manifest code here*` (within the JSON tab) and click _Next_
4. Review the configuration and click _Create_
5. Click _Install_ button and _Allow_ on the screen that follows. You'll then be
   redirected to the App Settings dashboard.

### Environment Variables

Before you can run the app, you'll need to store some environment variables.

1. Rename `.env.sample` to `.env`
2. Open your apps setting page from
   [this list](https://api.slack.com/apps), click _OAuth & Permissions_ in the
   left hand menu, then copy the _Bot User OAuth Token_ into your `.env` file
   under `SLACK_BOT_TOKEN`
3. Click _Basic Information_ from the left hand menu and follow the steps in the
   _App-Level Tokens_ section to create an app-level token with the
   `connections:write` scope. Copy that token into your `.env` as
   `SLACK_APP_TOKEN`.

### Local Project

```zsh
# Clone this project onto your machine
git clone https://github.com/slack-samples/bolt-js-custom-step-template.git

# Change into this project directory
cd bolt-js-custom-step-template

# Install dependencies
npm install

# Run Bolt server
npm start
```

### Linting

Run linter for code formatting and linting:

```zsh
npm run lint
```

## Using Steps in Workflow Builder

With your server running, your step is now ready for use in
[Workflow Builder](https://api.slack.com/start#workflow-builder)! Add it as a
custom step in a new or existing workflow, then run the workflow while your app
is running.

For more information on creating workflows and adding custom steps, read more
[here](https://slack.com/help/articles/17542172840595-Create-a-new-workflow-in-Slack).

## Project Structure

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to
start the server. This project aims to keep this file as thin as possible,
primarily using it as a way to route inbound requests.

### `manifest.json`

`manifest.json` is a configuration for Slack apps. With a manifest, you can
create an app with a pre-defined configuration, or adjust the configuration of
an existing app.
