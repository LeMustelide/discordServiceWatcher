const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const { targets, modules } = require('./config.json');
const { token } = require('./token.json');

const EmbedBase = new EmbedBuilder()
    .setTitle('Status des services')
    .setDescription('')

async function getChannels() {
    out = [];
    for (i in targets) {
        let t = targets[i];
        try {
            let c = await Bot.channels.fetch(t);
            out.push(c);
            console.log(`Can send to: ${c.name} (${t})`);
        } catch(e) {
            console.error(e);
        }
    };
    
    return out;
}

function checks(auto) {
    if (auto === undefined) auto = 'automatique'
    let total = 0;
    let pass = 0;
    modules.forEach(m => {
        let {check,name} = require(`./services/${module}`);
        res = check();
        EmbedBase.addFields({
            "name": name,
            "value": res.text
        });
        total += res.total;
        pass += res.pass;
    });
    EmbedBase.setDescription(`Tests ${auto} des services - ${pass} réussis pour un total de ${total}`);
}

async function clock() {
    channels = await getChannels();
    console.log(`Sending to ${Object.keys(channels).length} channels`);
    for (i in channels) {
        let chan = channels[i];
        let embed = {
            "title": "Status des services",
            "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
            "url": "https://discordapp.com",
            "color": 10108637,
            "fields": [
                {
                    "name": "AQG API",
                    "value": "✅ Opérationnel"
                },
                {
                    "name": "AQG API",
                    "value": "✅ Opérationnel"
                }
            ]
            };
        chan.send({ content: "test", embeds: [embed] });
    };
    setInterval(async function() {
        checks();
        let channels = await getChannels();
        for (i in channels) {
            let chan = channels[i];
            chan.send({embeds: [EmbedBuilder.toJson()]});
        }
    }, 3.6e6);
}

const Bot = new Client({
    disableMentions: "everyone",
    intents: [
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.User, Partials.GuildMember, Partials.Channel
    ]
});

Bot.on("ready", () => {
    clock();
});

Bot.login(token);