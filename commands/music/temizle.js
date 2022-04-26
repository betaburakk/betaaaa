module.exports = {
    name: 'temizle',
    aliases: [],
    utilisation: '{prefix}temizle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok. ❌` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, Sırada Müzik yok ❌` });

        await queue.clear();

        message.channel.send({ content: `Sıra temizlendi. 🗑️` });
    },
};
