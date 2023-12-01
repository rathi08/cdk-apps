import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CdkStack } from './cdk-stack';

export class PipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      new CdkStack(this, 'CDKStack');
    }
}