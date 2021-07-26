import { Certificate, CertificateValidation } from '@aws-cdk/aws-certificatemanager';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { App, Stack, StackProps } from '@aws-cdk/core';
import { CloudFrontToS3 } from '@aws-solutions-constructs/aws-cloudfront-s3';

export interface CdnStackProps extends StackProps {
  domainName: string
  cdnPrefix: string
}

export class CdnStack extends Stack {
  constructor(scope: App, id: string, props: CdnStackProps) {
    super(scope, id, props);

    const { domainName, cdnPrefix } = props
    const cdnDomainName = `${cdnPrefix}.${domainName}`

    const certificate = new Certificate(this, 'certificate', {
      domainName: cdnDomainName,
      validation: CertificateValidation.fromDns()
    })
    const distribution = new CloudFrontToS3(this, 'distribution', {
      cloudFrontDistributionProps: {
        domainNames: [cdnDomainName],
        certificate,
        defaultBehavior: {}
      }
    });
    const zone = HostedZone.fromLookup(this, 'hosted-zone', {
      domainName
    })
    const alias = new CloudFrontTarget(distribution.cloudFrontWebDistribution)
    const target = RecordTarget.fromAlias(alias)
    const aRecord = new ARecord(this, 'alias', {
      target,
      zone,
      recordName: cdnDomainName
    })
  }
}
