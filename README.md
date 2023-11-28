# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


Available Constructs under cdk-stack

1. S3Import - To import the existing S3 & to deploy the assets
2. StaticWebAppConstruct - Hosts s3 assets in cloudfront.
3. LambdaFnConstruct - Simple Lambda with handler


