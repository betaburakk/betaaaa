const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sira',
    aliases: ['q'],
    utilisation: '{prefix}sira',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, Sırada heniz müzik yok. ❌` });

        const embed = new MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Muzik Sırası - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** Other Song...` : `Sırada **${songs}** tane şarkı var .`;

        embed.setDescription(`Şuanda çalan: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({text: 'by BETA', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};
