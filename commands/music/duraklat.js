module.exports = {
    name: 'duraklat',
    aliases: ['st'],
    utilisation: '{prefix}duraklat',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok !. ❌` });

        queue.destroy();

        message.channel.send({ content: `Şuanlık benden bu kadar. Sonra görüşmek üzere ✅` });
    },
};
