const superagent = require("superagent");
const { RichEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args}) => { 
    let {body} = await superagent
    .get("https://corona.lmao.ninja/v2/countries/brazil");

    let casos = body.cases;
    let casosHoje = body.todayCases;
    let mortes = body.deaths;
    let mortesHoje = body.todayDeaths;
    let curados = body.recovered;
    let casosAtivos = body.active;
    let casosCriticos = body.critical;

    let coronamap = new RichEmbed()
    .setTitle("Informções em tempo real do Corona Vírus no Brasil")
    .addField("**Casos Confirmados:**", `**${casos}**`, true)
    .addBlankField(true)
    .addField("**Casos Confirmados Hoje:**", `**${casosHoje}**`, true)
    .addField("**Mortes:**", `**${mortes}**`, true)
    .addBlankField(true)
    .addField("**Mortes Hoje:**", `**${mortesHoje}**`, true)
    .addField("**Pessoas Curadas:**", `**${curados}**`, true)
    .addBlankField(true)
    .addField("**Casos Ativos:**", `**${casosAtivos}**`, true)
    .addField("**Casos Críticos:**", `**${casosCriticos}**`)
    .setColor("#FFFF00")

    message.channel.send(coronamap);
}   