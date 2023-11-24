import { Construct } from 'constructs';
import { aws_s3 as s3, CfnOutput } from 'aws-cdk-lib';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import path = require('path');
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';


export interface StaticWebAppConstructProps {

}

export class StaticWebAppConstruct extends Construct {
    constructor(scope: Construct, id: string, props?: StaticWebAppConstructProps) {
        super(scope, id);

        const bucket = new s3.Bucket(scope, 'Bucket', {
            versioned: true,
        });

        new BucketDeployment(this, 'BucketDeployment', {
            destinationBucket: bucket,
            sources: [Source.asset(path.resolve('./assets'))]
        });

        const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
        bucket.grantRead(originAccessIdentity);

        const appUrl = new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(bucket, { originAccessIdentity }),
            },
        })

        new CfnOutput(this, 'CloudFrontURL', { value:  appUrl.domainName});
    }
}