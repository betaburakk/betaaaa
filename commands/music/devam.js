module.exports = {
    name: 'devam',
    aliases: [],
    utilisation: '{prefix}devam',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`${message.author}, Aktif müzik yok!. ❌` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `**${queue.current.title}**, Şarkı devam ediyor... ✅` : `${message.author}, Bir şeyler yanlış gitti. ❌` });
    },
};
