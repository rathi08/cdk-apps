import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { S3Import } from './s3-import';
import { LambdaFnConstruct } from './lambda-construct';
// import { WebServerConstruct } from './web-server';
// import { StaticWebAppConstruct } from './static-web-app';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new LambdaFnConstruct(this, "LambdaFnConstruct", { fnName: "LambdaFn" });
    // new StaticWebAppConstruct(this, "StaticWebAppConstruct")
    // new S3Import(this, 'Import and Deploy', {id: 'myawsimportbucket'});
    // new WebServerConstruct(this, "Container Web Server");
  }
}
