const functions = require('@google-cloud/functions-framework');
const protobuf = require('protobufjs');
const projectId = 'delta-hedge-395023';
const location = 'europe-west3';

exports.helloFirestore = async (data, context) => {
  await createJob("projects/delta-hedge-395023/databases/(default)/documents/trades/2023/months/8/days/6/trades/BTC-7AUG23-28000-C");
};

async function createJob(fqTrade) {
  const {CloudSchedulerClient} = require('@google-cloud/scheduler').v1;

// Instantiates a client
  const schedulerClient = new CloudSchedulerClient();

  const regexp = /.*\/documents\/trades\/(.*)\/months\/(.*)\/days\/(.*)\/trades\/(.*)/g;
  const matches = [...fqTrade.matchAll(regexp)];
  const jobName = `projects/${projectId}/locations/${location}/jobs/${matches[0][1]}_${matches[0][2]}_${matches[0][3]}_${matches[0][4]}`;

  const tradePath = [...fqTrade.matchAll(/\/documents(.*)/g)][0][1];

// Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    job: {
      name: jobName,
      pubsubTarget: {
        topicName: 'projects/delta-hedge-395023/topics/topic1',
        attributes: {
          trade: tradePath
        }
      },
      schedule: '* * * * *', // Once a minute.
    }
  };

// Run request
  const jobResponse = await schedulerClient.createJob(request);
  console.log(jobResponse);
  console.log('after createJob()');
}

functions.cloudEvent('helloFirestore', async cloudEvent => {
  console.log(`Function triggered by event on: ${cloudEvent.source}`);
  console.log(`Event type: ${cloudEvent.type}`);

  console.log('Loading protos...');
  const root = await protobuf.load('data.proto');
  const DocumentEventData = root.lookupType(
    'google.events.cloud.firestore.v1.DocumentEventData'
  );
  const firestoreReceived = DocumentEventData.decode(cloudEvent.data);

  console.log('\nNew value:');
  console.log(firestoreReceived.value);

  // const response = await fetch('https://api.github.com/users/github');
  // const data = await response.json();
  // console.log('\nGoogle Data: ', data);

  await createJob(firestoreReceived.value.name);

});
