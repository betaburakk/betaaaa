module.exports = {
    name: 'filtre',
    aliases: [],
    utilisation: '{prefix}filtre [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

   if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktif müzik yok!. ❌` });

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send({ content: `${message.author}, Geçerli komut girin. ❌\n\`bassboost, 8D, nightcore\`` });

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({ content: `${message.author}, filtre bulamadım. ❌\n\`bassboost, 8D, nightcore\`` });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({ content: `Uygulanan: **${filter}**, Filtre durumu**${queue.getFiltersEnabled().includes(filter) ? 'Aktif' : 'Deaktif'}** ✅\n **.**` });
    },
};
