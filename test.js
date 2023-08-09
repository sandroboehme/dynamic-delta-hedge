// test.js
const test = require('firebase-functions-test')();
const functions = require('./index');
const Firestore = require("@google-cloud/firestore");

test.mockConfig({});

const eventData = {
    // Mock the Firestore entity creation data here if needed
    // For example, if you were expecting a `data` object, provide it here.
};

const context = {
    // You can mock any relevant context data here, like the Firestore document ID, etc.
};


const db = new Firestore({
    projectId: 'delta-hedge-395023',
    keyFilename: './delta-hedge-395023-633dd31fcfac.json',
});

functions.hedge(db, context);

// functions.helloFirestore(eventData, context);
// const string = "projects/delta-hedge-395023/databases/(default)/documents/trades/2023/months/8/days/6/trades/BTC-7AUG23-28000-C";
// const regexp = /.*\/documents\/trades\/(.*)\/months\/(.*)\/days\/(.*)\/trades\/(.*)/g;

// const matches = [...string.matchAll(regexp)];
// const jobName = `${matches[0][1]}/${matches[0][2]}/${matches[0][3]}/${matches[0][4]}`
// console.log(jobName)

// const matches = [...string.matchAll(/\/documents(.*)/g)];
// const trade = `${matches[0][1]}/${matches[0][2]}/${matches[0][3]}/${matches[0][4]}`
// console.log(matches[0][1])
// const matches = string.matchAll(regexp);
// for (const match of matches) {
//     console.log(match);
//     console.log(match.index)
// }
test.cleanup();
