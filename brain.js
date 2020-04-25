const { MuseClient, channelNames } = require('muse-js'); 
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map'); 
async function connectToMuse() {
    const client = new MuseClient();
    await client.connect();
    await client.start();
    const leftChannel = channelNames.indexOf('AF7'); // Left eye electrode           
    const blinks = client.eegReadings
        .filter(r => r.electrode === leftChannel)
        .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
        .filter(max => max > 200);
  
  
        blinks.subscribe(() => {
            console.log("blink!")
            const jumpEvent = new Event('keydown');
            jumpEvent.keyCode = 32; // Space key
            document.dispatchEvent(jumpEvent);
        });
} 
window.connectToMuse = connectToMuse;