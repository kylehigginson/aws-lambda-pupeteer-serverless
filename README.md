# aws-lambda-puppeteer-serverless

## Prereqs

- You have [Serverless framework](https://www.serverless.com/framework/docs/getting-started) setup.


## What is this repo?

- This repo contains one AWS Lambda which runs Puppeteer to log in to [CauliCloud](https://caulicloud.com) and ensure an element appears once logged in.
- The Lambda will run every 10 minutes using an EventBridge event
- The Lambda runs on the NodeJS 18.x runtime.


## Deploy

From the root of the repo run:

```
npm install
serverless deploy
```