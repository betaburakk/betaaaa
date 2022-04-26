module.exports = {
    name: 'dur',
    aliases: [],
    utilisation: '{prefix}dur',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `Çalan şarkı **${queue.current.title}** durdu ✅` : `${message.author}, Bir şeyler yanlış gitti. ❌` });
    },
};
