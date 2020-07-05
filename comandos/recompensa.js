const moment = require("moment");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    let conta = db.get(`${message.guild.id}`).find({id: message.author.id}).value();
    let dia = moment(`${conta.diaRecompensa}`);

    if(conta.diaRecompensa === "Não foi pega" || dia.diff(moment().format("YYYY-MM-DD H:mm:ss"), "hour") <= -24)
    {
        let bonus = 300 + Math.floor((Math.random() * 901));
        let din = conta.dinheiro + bonus;
        db.get(`${message.guild.id}`).find({id: message.author.id}).assign({dinheiro: din}).write(); 
        db.get(`${message.guild.id}`).find({id: message.author.id}).assign({diaRecompensa: moment().format("YYYY-MM-DD H:mm:ss")}).write();
        message.reply(`Recompensa coletada! Você recebeu ${bonus} FaustoCoins e agora possui ${din}`);
    }
    else
    {
        message.reply(`Você poderá coletar a recompensa em ${24 + dia.diff(moment().format("YYYY-MM-DD H:mm:ss"), "hour")} horas`);
    }
}