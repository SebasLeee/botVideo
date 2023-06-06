const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.json');

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const { loadPCommands } = require('./Handlers/PcommandHandler');
const { logsHandler } = require('./Handlers/logHandler')

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.setMaxListeners(0);
client.commands = new Collection();
client.pcommands = new Collection();

client.login(config.token).then(() => {
    loadEvents(client)
    loadCommands(client)
    loadPCommands(client)
    logsHandler(client)
});