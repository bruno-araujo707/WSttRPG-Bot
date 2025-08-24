const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Attack = require('../../core/Attack.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin-flip')
        .setDescription('Simule um ataque simples utilizando moedas.')
        .addNumberOption(option =>
            option
                .setName('total')
                .setDescription('Total de moedas')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('poder_base')
                .setDescription('Poder base do ataque')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('poder_moedas')
                .setDescription('Poder da moeda caso caia como cara')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('dano_moedas')
                .setDescription('Dano adicionado ao total caso a moeda caia como cara')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('defesa_alvo')
                .setDescription('A defesa do alvo para calcular o acerto')
                .setRequired(false)
        ),

    async execute(interaction) {
        const totalCoins = interaction.options.getNumber('total');
        const targetDefense = interaction.options.getNumber('defesa_alvo');

        const results = Attack.flipCoins(
            totalCoins,
            interaction.options.getNumber('poder_base'),
            interaction.options.getNumber('poder_moedas'),
            interaction.options.getNumber('dano_moedas'),
        );

        let resultEmbed;

        if (targetDefense !== null) {
            if (results.hitValue >= targetDefense) {
                resultEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('✅ Ataque Acertou!')
                    .setDescription(`Um ataque com **${totalCoins}** moedas foi realizado!`)
                    .addFields(
                        { name: 'Resultado dos Lançamentos', value: `> ${results.headTotal} Cara(s) \n> ${results.tailsTotal} Coroa(s)` },
                        { name: 'Poder de Acerto (VA) vs Defesa', value: `**${results.hitValue}** vs **${targetDefense}**` },
                        { name: '💥 Dano Causado', value: `**${results.damage}**` }
                    )
                    .setTimestamp()
                    .setFooter({ text: `Comando executado por ${interaction.user.username}` });
            } else {
                resultEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('❌ Ataque Errou!')
                    .setDescription(`Um ataque com **${totalCoins}** moedas foi realizado!`)
                    .addFields(
                        { name: 'Resultado dos Lançamentos', value: `> ${results.headTotal} Cara(s) \n> ${results.tailsTotal} Coroa(s)` },
                        { name: 'Poder de Acerto (VA) vs Defesa', value: `**${results.hitValue}** vs **${targetDefense}**` },
                        { name: '💥 Dano Causado', value: '**0**' }
                    )
                    .setTimestamp()
                    .setFooter({ text: `Comando executado por ${interaction.user.username}` });
            }
        } else {
            resultEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🪙 Resultado do Ataque com Moedas')
                .setDescription(`Um ataque com **${totalCoins}** moedas foi realizado!`)
                .addFields(
                    { name: 'Resultado dos Lançamentos', value: `> ${results.headTotal} Cara(s) \n> ${results.tailsTotal} Coroa(s)` },
                    { name: '⚔️ Poder de Acerto Final (VA)', value: `**${results.hitValue}**`, inline: true },
                    { name: '💥 Dano Final', value: `**${results.damage}**`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Comando executado por ${interaction.user.username}` });
        }
        
        await interaction.reply({ embeds: [resultEmbed] });
    },
};