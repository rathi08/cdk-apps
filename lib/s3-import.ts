import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import path = require('path');

export interface S3ImportProps {
    id: string
}

export class S3Import extends Construct {
  constructor(scope: Construct, id: string, props: S3ImportProps) {
    super(scope, id);

    const bucket = new s3.Bucket(scope, props.id, {
        removalPolicy: cdk.RemovalPolicy.RETAIN
    });

    //cdk import - first import and then deploy the assets
    //const byName = s3.Bucket.fromBucketName(this, 'BucketByName', 'my-bucket');
    //const byArn = s3.Bucket.fromBucketArn(this, 'BucketByArn', 'arn:aws:s3:::my-bucket');

    new BucketDeployment(this, 'BucketDeployment', {
        destinationBucket: bucket,
        sources: [Source.asset(path.resolve('./assets'))],
        prune: false
    });
    
  }
}