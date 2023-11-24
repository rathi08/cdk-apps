import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface LambdaFnConstructProps {
  fnName: string;
}

export class LambdaFnConstruct extends Construct {
  constructor(scope: Construct, id: string, props: LambdaFnConstructProps) {
    super(scope, id);

    new lambda.Function(this, props.fnName, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda-handler'),
    });

  }
}