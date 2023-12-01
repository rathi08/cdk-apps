import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { PipelineAppStage } from './pipeline-stage';


export class TestCodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // store github token as github-token in secret manager
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub("rathi08/cdk-apps", 'master'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    pipeline.addStage(new PipelineAppStage(this, "Deploy", {
      env: {
        account: StringParameter.valueForStringParameter(
          this, 'ACCOUNT_ID'), region: StringParameter.valueForStringParameter(
            this, 'DEFAULT_REGION')
      },
    }));

  }
}
