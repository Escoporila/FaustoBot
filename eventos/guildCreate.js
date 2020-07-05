const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("banco.json");
const db = low(adapter);

module.exports = async (client, guild) => {
    db.set(`${guild.id}`, []).write();

    let membros = guild.members;

    membros.forEach(membro => {
        if(membro.user.id === client.user.id) return;
        db.get(`${guild.id}`).push
        ({
          id: membro.user.id,
          nome: membro.user.username,
          avatar: membro.user.displayAvatarURL,
          dinheiro: 500,
          diaRecompensa: "Não foi pega"
        }).write(); 
    });
}