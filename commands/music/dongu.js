const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'dongu',
    aliases: ['lp'],
    utilisation: '{prefix}dongu <sıra>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({ content: `${message.author}, Önce döngüyü sonlandır **(${client.config.px}loop)** ❌` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Deaktif' : 'aktif'}**, Döngü durmadan devam edicek 🔁` : `${message.author}, Yanlış. ❌` });
        } else {
            if (queue.repeatMode === 2) return message.channel.send({ content: `${message.author}, Sırayı sonlandır **(${client.config.px}loop queue)** ❌` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Şuan çalan şarkı döngüye girdi durmadan devam edecek (all music in the list **${client.config.px}loop queue**  Bu komut ile aktif edin .) 🔂` : `${message.author}, Bir şeyler yanlış gitti ❌` });
};
    },
};
