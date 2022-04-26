module.exports = {
    name: 'onceki',
    aliases: [],
    utilisation: '{prefix}onceki',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Müzik yok! ❌` });

        if (!queue.previousTracks[1]) return message.channel.send({ content: `${message.author}, Bundan önce müzik çalmadım ❌` });

        await queue.back();

        message.channel.send({ content: `Previous music started playing... ✅` });
    },
};
