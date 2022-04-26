const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'ses',
    aliases: ['vol'],
    utilisation: `{prefix}ses [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Şuan Ses Seviyesi: **${queue.volume}** 🔊\n**Sesi yükseltmek/düşürmek , için \`1\` \`${maxVol}\` arası sayi girin.**` });

        if (queue.volume === vol) return message.channel.send({ content: `${message.author}, Aktif şarkı aynı ses seviyesiyle çalıyor ❌` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `${message.author}, **Sayı girin \`1\` to \`${maxVol}\` sesi yükseltmek/düşürmek .** ❌` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `Volume changed: **%${vol}**/**${maxVol}** 🔊` : `${message.author}, Bir şeyler yanlış gitti. ❌` }) ;
    },
};
