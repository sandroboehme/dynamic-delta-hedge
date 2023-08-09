const functions = require('@google-cloud/functions-framework');
const Firestore = require('@google-cloud/firestore');

exports.hedge = async (db, context) => {
    await hedge('/trades/2023/months/8/days/6/trades', db);
    // await hedge('/trades/2023/months/8/days/6/trades/BTC-11AUG23-30500-C');
};

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('helloPubSub', cloudEvent => {
    // The Pub/Sub message is passed as the CloudEvent's data payload.

    const data = JSON.parse(Buffer.from(cloudEvent.data.message.data, 'base64').toString())
    console.log(`Hello, ${data.trade}!`);
    const db = new Firestore();
    hedge(data.trade, db);
});

async function hedge(path) {
    const Firestore = require('@google-cloud/firestore');
    const trades = await db.collection('/trades/2023/months/8/days/6/trades').doc('BTC-11AUG23-30500-C').get();
    console.log(trades.data());
    /**
     * Das Instrument parsen
     * Option Position von Deribit laden
     * Delta und Amount laden
     * Strike und Tolerance Strike aus dme Datastore Node laden
     * Index Price laden
     * Wenn Index price > Strike, dann Delta-close
     * Delta-close:
     *  Future Position von Deribit laden
     *  position delta + future delta = current delta; ggf dazu kaufen oder teilweise verkaufen
     *
     * Wenn Index < Tolerance
     *   close Future position
     */
}
