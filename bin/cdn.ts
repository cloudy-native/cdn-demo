#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdnStack } from '../lib/cdn-stack';

const tags = {
    owner: 'stephen',
    service: 'cdn',
    version: '0.1.0'
}

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
}

const domainName = 'stephen.cloud'
const cdnPrefix = 'cdn'

const app = new cdk.App();

const cdnStack = new CdnStack(app, 'CdnStack', { tags, env, domainName, cdnPrefix });
