const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'ara',
    aliases: [],
    utilisation: '{prefix}ara [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
      
if (!args[0]) return message.channel.send({ content: `${message.author}, Geçerli şarkı girin. ❌` });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ content: `${message.author}, Şarkı bulunamadı. ❌` });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(`Aratılan Şarkı: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nŞarkıyı seçmek için **1** veya **${maxTracks.length}** seçin ve gönderin ya da  **cancel** aktif olani iptal etmek için.⬇️`);

        embed.setTimestamp();
        embed.setFooter({ text: 'by BETA ❤', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 25000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ content: `Aratılan iptal oldu. ✅` }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ content: `Hata: lütfen **1** den **${maxTracks.length}** kadar sayı girin ya da **cancel** aktif olani iptal etmek için. ❌` });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send({ content: `${message.author}, I can't join audio channel. ❌` });
            }

            await message.channel.send({ content: `Loading your music call. 🎧` });

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send({ content: `${message.author}, Süre doldu ❌` });
        });
    },
};
