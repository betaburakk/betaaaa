const { QueryType } = require('discord-player');

module.exports = {
    name: 'baslat',
    aliases: ['p'],
    utilisation: '{prefix}baslat [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
if (!args[0]) return message.channel.send({ content: `${message.author}, Çalmasını istediğin şarkının adını yaz. ❌` });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ content: `${message.author}, Sonuç yok! ❌` });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel)
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send({ content: `${message.author}, Sesli kanala gelemiyorum.. ❌` });
        }

        await message.channel.send({ content: `Şarkı ${res.playlist ? 'Calma Listesi' : 'Track'} Başlıyor... 🎧` });

if(client.config.opt.selfDeaf === false) {
let channel = message.member.voice.channel;
const { joinVoiceChannel } = require('@discordjs/voice');
const connection = joinVoiceChannel({
   channelId: channel.id,
   guildId: channel.guild.id,
   adapterCreator: channel.guild.voiceAdapterCreator,
   selfDeaf: false
});
}

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
