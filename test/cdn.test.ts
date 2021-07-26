import { SynthUtils } from '@aws-cdk/assert'
import { App } from '@aws-cdk/core'
import { CdnStack } from '../lib/cdn-stack'

test('CDN Stack', () => {
  const app = new App()
  const stack = new CdnStack(app, 'stack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    },
    cdnPrefix: 'cdn',
    domainName: 'domain.name'
  })

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})
