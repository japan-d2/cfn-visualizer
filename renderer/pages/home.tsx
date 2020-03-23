import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import AWS from 'aws-sdk';
import CloudFormationGraph from 'cloudformation-graph'

const Home = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
};

Home.getInitialProps = async () => {

  const cloudformation = new AWS.CloudFormation({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: 'ap-northeast-1'
  });

  // get StackResources
  const resources = await cloudformation.listStackResources({
    StackName: 'nakayama-cfn-visualize-test02', /* required */
  }).promise()
  console.log(resources.$response)

  // get Template
  const template = await cloudformation.getTemplate({
    StackName: 'nakayama-cfn-visualize-test02'
  }).promise();
  const cfg = new CloudFormationGraph();
  const ret = cfg.graph(template.TemplateBody)
  console.log(ret)

  return {}

}

export default Home;
