import { CfnOutput } from "aws-cdk-lib";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import path from "path";


export interface WebServerProps {

}

export class WebServerConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: WebServerProps) {
    super(scope, id);

    const webServerImg = new DockerImageAsset(this, "web server image", {
        directory: path.join(__dirname, '..', 'container')
    })

    const fargateService = new ApplicationLoadBalancedFargateService(this, "web server", {
        taskImageOptions: {
            image: ContainerImage.fromDockerImageAsset(webServerImg),
            containerPort: 3000
        }
    })

    new CfnOutput(this, 'CloudFrontURL', { exportName: "Server URL", value:  fargateService.loadBalancer.loadBalancerDnsName});
    
  }
}