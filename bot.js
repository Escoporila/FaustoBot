const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("banco.json");
const db = low(adapter);

client.on("ready", () => {
    console.log("LIGADO");
    client.user.setActivity("snarflengansa");
});

client.on("message", async message => {
    console.log(db.get(`${message.guild.id}`).find({id: message.author.id}).value());
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${command}.js`);
        await commandFile.run({Discord, client, message, args, low, FileSync, adapter, db});
    } catch (err) {

        if (err.code === "MODULE_NOT_FOUND") return;
        console.error(err);
    }

})

fs.readdir("./eventos/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        const eventName = file.split(".")[0]
        const event = require(`./eventos/${file}`)
        
        client.on(eventName, event.bind(null, client))
    });
});

client.login(config.token);