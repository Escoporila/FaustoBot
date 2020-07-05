module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    {let conta = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    let usuario = message.mentions.users.first() || message.author;
    if(usuario.id === client.user.id) return message.reply("Eu não posso uma conta.");

    message.reply(`${usuario.id === message.author.id ? "Você" : usuario.username} possui ${conta.dinheiro} FaustoCoins!`);}
}