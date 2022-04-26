const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'yardim',
    aliases: ['y',"yardım"],
    showHelp: false,
    utilisation: '{prefix}yardim',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(client.user.username);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('To access this music bot: [BETA Music Bot](https://discord.gg/Rqj9MGVYsD), daha fazla yardım için discord sunucumuza gelebilirsiniz.') ;
        embed.addField(`Available - ${commands.size} Command Available`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases[0]})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter({ text: 'Music Bot Commands - by BETA ❤️', iconURL:message.author.avatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed] });
    },
};
