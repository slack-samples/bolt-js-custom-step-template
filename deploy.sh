#!/bin/bash

git init
git add .
git commit -m "chore: prepare for deployment"

heroku create slack-deputy-test
heroku config:set SLACK_APP_TOKEN=$SLACK_APP_TOKEN
heroku config:set SLACK_BOT_TOKEN=$SLACK_BOT_TOKEN

git push heroku main
