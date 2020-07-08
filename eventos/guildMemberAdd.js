const { RichEmbed } = require("discord.js");

module.exports.run = async (client, low, FileSync, adapter, db, member) => {
    let canal = client.channels.get(member.guild.systemChannel.id);
    let nome = member.user.username;
    let avatar = member.user.displayAvatarURL;
    
    let boasVindas = new RichEmbed()
    .setTitle(`Seja muito bem vindo ao servidor ${member.guild.name}, ${nome}`)
    .setColor("#0000FF")
    .setImage(avatar);
    
    canal.send(boasVindas)

    db.get(`${member.guild.id}`).push
        ({
          id: member.user.id,
          nome: member.user.username,
          avatar: member.user.displayAvatarURL,
          dinheiro: 500,
          diaRecompensa: "Não foi pega"
        }).write(); 
}