module.exports = {
    name: 'gec',
    aliases: [],
    utilisation: '{prefix}gec',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `**${queue.current.title}**, Sıradaki şarkı çalıyor ✅` : `${message.author}, Bir şeyler yanlış gitti ❌` });
    },
};
