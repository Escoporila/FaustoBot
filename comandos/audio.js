module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    if(!message.member.voiceChannel) return message.reply("Você precisa estar em um canal de voz!");
    
    let configs = db.get(`${message.guild.id}`).find({id: message.guild.id}).value();
    let audios = configs.audios;
    let audiosNomes = [];
    audios.forEach(audio => {
        audiosNomes.push(audio.nome);
    });
    if(!args[0] || audiosNomes.indexOf(args[0]) === -1) return message.reply(`Insira um áudio válido: **${audiosNomes.join(", ")}**`);
    
    let voiceChannel = message.member.voiceChannel;
    let nome = args[0];
    let URL = audios[audiosNomes.indexOf(nome)].link;

    voiceChannel.join().then(connection => {
        const dispatcher = connection.playStream(URL);

        dispatcher.on("end", end => {
            setTimeout(function()
            {
                voiceChannel.leave()
            }, 2000)
        });
    }).catch(err => console.log(err));
}