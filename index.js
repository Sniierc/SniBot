const Discord = require("discord.js");
const { send } = require("process");
const fs = require("fs");
const token = require("./token.json")
const moment = require('moment');
const bdd = require("./bdd.json");
const static = require("static");
const { checkServerIdentity } = require("tls");



const bot = new Discord.Client();

bot.on("guildMemberAdd", member => {
  if (bdd["message-bienvenue"]) {
    bot.channel.cache.get(`776491374445854813`).send(bdd["message-bienvenue"]);
  }
  else {
    bot.channel.cache.get(`776491374445854813`).send("Bienvenue sur le serveur !");
  }
  member.roles.add('805195627624398880');

})

/// Say ///

bot.on("message", async message => {
    if(message.content.startsWith("/say")){
      message.delete();
        let msg = message.content.slice(4)
        if(!msg) return message.reply("Veuillez entrez un message.")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        message.channel.send(embed)
    }    
})


/// Say ///

/// ADD / SUPR ROLE ///



/// ADD / SUPR ROLE ///

/// MUTE ///



/// MUTE ///

/// MUSIQUE ///

// *** A Faire *** //

/// MUSIQUE ///

///Clear Msg///

bot.on("message", message => {

  if (message.content.startsWith("/clear")) {
    message.delete();
    if (message.member.hasPermission('MANAGE_MESSAGES')) {

      let args = message.content.trimStart().split(/ +/g);

      if (args[1]) {
        if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

          message.channel.bulkDelete(args[1])
          message.channel.send(`vous avez supprimé ${args[1]} message(s)`)

        }
        else (
          message.channel.send(`vous devez indiquer une valeur de 1 à 99 !`)
        )
      }
      else {
        message.channel.send("vous devez indiquer un nombre a supprimer !")
      }
    }
    else (
      message.channel.send("vous devez avoir la permission de gérer les messages pour éxecuter cette commande !")
    )
  }

///Clear Msg///

//MSG BVN///

  if (message.content.startsWith("/mb")) {
    message.delete()
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      if (message.content.length > 5) {
        message_bienvenue = message.content.slice(4)
        bdd["message-bienvenue"] = message_bienvenue
        Savebdd()

      }
    }
  }

//MSG BVN///


/// STATS ///

  if (message.content.startsWith("/stats")) {
    let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
    let totalmembers = message.guild.members.cache.size;
    let totalservers = bot.guilds.cache.size;
    let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
    let totalrole = message.guild.roles.cache.get('777550325212119081').members.map(member => member.user.tag).length;

    const MyEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Stats du serveur')
      .setURL('https://discord.js.org/')
      .setAuthor('Sniier', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('Voici les stats du serveur')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields(
        { name: 'Nombre de membres total : ', value: totalmembers, inline: true },
        { name: 'Membres connectés : ', value: onlines, inline: true },
        { name: 'Nombres de serveur auquel le bot appartient : ', value: totalservers, inline: true },
        { name: 'Nombre de bot sur le serveur : ', value: totalbots, inline: true },
        { name: 'Nombre de nouveaux membres  : ', value: totalrole, inline: true },
      )
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('@sniier2 on twitter', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send(MyEmbed);

  }

/// STATS ///

/// INFO ///

  if (message.content.startsWith("/info")) {
      if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else{
            user = message.author;
        }
        const member = message.guild.member(user);

        const InfoEmbed = new Discord.MessageEmbed()
        .setColor('#ff5555')
        .setThumbnail(user.avatarURL)
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`, true)
        .addField('A crée le compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('A rejoin le serveur le :', `${moment.utc(member.JoinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status :', `${user.status}`, true)
        .addField('Joue à :', `${user.presence.game} ? {user.presence.game.name} {: 'Rien'}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
        .addField('En réponse a :', `${message.author.username}#${message.author.discriminator}`)
    message.channel.send(InfoEmbed).then(message => message.delete({ timeout: 1500000 }));
    }

})

/// INFO ///

/// CAPTCHA ///

// *** A Faire *** //

///EASTER EGG///

bot.on('message', msg => {
  if (msg.content === 'Jme fais vraiment chier à se point là ???') {
    msg.reply('EASTER EGG DECOUVERT !');
  }
});

bot.on('message' , msg => {
  if (msg.content === 'Jme fais vraiment chier à se point là ???') {
    msg.reply("GG Tu as trouvé(e) l'easter egg (mentionne @𝙎𝙣𝙞𝙞𝙚𝙧 ♚♛ツ#8825 pour gagner un role (HunterEaster) ! Sur Neko Kun : https://discord.gg/cajm9Bzyn3 )")
    msg.delete();
  }
})

///EASTER EGG///

///Msg Auto///

bot.on('message', message => {
  if (message.content === 'quel est mon avatar ?') {
    message.reply(message.author.displayAvatarURL());
  }
});


bot.on('message', msg => {
  if (msg.content === 'yamete') {
    msg.reply('Kudasai!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'all') {
    msg.reply('ah nn pardons');
  }
});

bot.on('message', msg => {
  if (msg.content === 'axel') {
    msg.reply('Viens manger !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'ah') {
    msg.reply('BH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'ch') {
    msg.reply('DH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'eh') {
    msg.reply('FH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'gh') {
    msg.reply('HH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'ih') {
    msg.reply('JH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'kh') {
    msg.reply('lH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'mh') {
    msg.reply('NH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'oh') {
    msg.reply('PH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'qh') {
    msg.reply('RH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'sh') {
    msg.reply('TH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'uh') {
    msg.reply('VH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'wh') {
    msg.reply('XH !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'yh') {
    msg.reply('ZH cest bien tu connais ton alphabet chakal!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'pong') {
    msg.reply('ping!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'Hey') {
    msg.reply("Hey ! :) ");
  }
});

bot.on('message', msg => {
  if (msg.content === 'SMAASH') {
    msg.reply('OH YOU WINNNNNNNNNN !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'Oh im loose !') {
    msg.reply('OH IM WINNNNNNNNNN !');
  }
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'sa lag') {
    msg.reply('IL Y A DU PING!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'quoi') {
    msg.reply('Feur!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'non') {
    msg.reply('bril!');
  }
});

bot.on('message', msg => {
  if (msg.content === 'Quoi ?') {
    msg.reply('Feur');
  }
});

///Msg Auto///

///Status Bot///

bot.on("ready", async () => {
  bot.user.setStatus("dnd");
  setTimeout(() => {
    bot.user.setActivity("être l'esclave de Sniier_#1048");
  }, 100)
});

///Status Bot///

///REACTIONS///

exports.run = async (client, message, args) => {

  await message.delete().catch(O_o=>{});

  const a = message.guild.roles.get('809897841967104051');
  const b = message.guild.roles.get('809897842750783570');
  const c = message.guild.roles.get('809897843174277122');

  const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

  const embed = new RichEmbed()
      .setTitle('Avaiilable Roles')
      .setDescription(`
      
      🇦 ${a.toString()}
      🇧 ${b.toString()}
      🇨 ${c.toString()}
      `)
      .setColor(0xdd9323)
      .setFooter(`ID: ${message.author.id}`);
      
  message.channel.send(embed).then(async msg => {

      await msg.react('🇦');
      await msg.react('🇧');
      await msg.react('🇨');

      msg.awaitReactions(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
      }).then(collected => {

          const reaction = collected.first();

          switch (reaction.emoji.name) {
              case '🇦':
                  if (message.member.roles.has(a.id)) {
                      msg.delete(2000);
                      return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                  }
                  message.member.addRole(a).catch(err => {
                      console.log(err);
                      return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                  });
                  message.channel.send(`You have been added to the **${a.name}** role!`).then(m => m.delete(3000));
                  msg.delete();
                  break;
              case '🇧':
                  if (message.member.roles.has(b.id)) {
                      msg.delete(2000);
                      return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                  }
                  message.member.addRole(b).catch(err => {
                      console.log(err);
                      return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                  });
                  message.channel.send(`You have been added to the **${b.name}** role!`).then(m => m.delete(3000));
                  msg.delete();
                  break;
              case '🇨':
                  if (message.member.roles.has(c.id)) {
                      msg.delete(2000);
                      return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                  }
                  message.member.addRole(c).catch(err => {
                      console.log(err);
                      return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                  });
                  message.channel.send(`You have been added to the **${c.name}** role!`).then(m => m.delete(3000));
                  msg.delete();
                  break;
          }
      }).catch(collected => {
          return message.channel.send(`I couldn't add you to this role!`);
      });

  });

};

exports.help = {
  name: 'roles'
};

///REACTIONS///

///Bot Status///

bot.on('ready', () => {
  console.log(`Le bot : (${bot.user.tag}) est allumé !`);
});

bot.off('inready', () => {
  console.log(`le bot ${bot.user.tag} est off !`);
});

///Bot Status///

function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue.");
  });
}

bot.login(token.token);
