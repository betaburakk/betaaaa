const Discord = require('discord.js');
module.exports = {
    name: 'kaydet',
    aliases: [],
    utilisation: '{prefix}kaydet',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, There is no music currently playing!. ❌` });

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(client.user.username + " - Save Track")
  .setThumbnail(client.user.displayAvatarURL())
  .addField(`Track`, `\`${queue.current.title}\``)
  .addField(`Duration`, `\`${queue.current.duration}\``)
  .addField(`URL`, `${queue.current.url}`)
  .addField(`Saved Server`, `\`${message.guild.name}\``)
  .addField(`Requested By`, `${queue.current.requestedBy}`)
  .setTimestamp()
  .setFooter({ text: 'by BETA', iconURL: message.author.avatarURL({ dynamic: true }) });
  message.author.send({ embeds: [embed] }).then(() => {
            message.channel.send({ content: `Şarkıyı DM gönderdim. ✅` });
        }).catch(error => {
            message.channel.send({ content: `${message.author}, Özel mesaj atamıyorum. ❌` });
        });
    },
};
