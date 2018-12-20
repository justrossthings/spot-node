// NPM Dependencies
const PubNub = require('pubnub');

const { controller } = ('./controller');

const pubnub = new PubNub({
  subscribeKey: 'sub-c-3e91234c-012f-11e9-a399-32ec39b2e34f',
  publishKey: 'pub-c-86d77efa-af69-435d-bd9d-d9e25341436f'
});

pubnub.addListener({
  status: (statusEvent) => {
    switch (statusEvent.category) {
      case 'PNConnectedCategory':
        return console.log(`connected to ${statusEvent.affectedChannels}`);
      case 'PNUnsubscribeOperation':
        return console.log(`disconnected from ${statusEvent.affectedChannels}`);
      default:
        return console.log('something else', statusEvent);
    }
  },
  message: (msg) => {
    if (msg.channel === 'controls') {
      controller(msg.message.control);
    }
  }
});

exports.connect = channel => {
  console.log(`connecting to ${channel}`);
  pubnub.subscribe({
    channels: [channel]
  });
};

exports.disconnect = () => {
  pubnub.unsubscribeAll();
};