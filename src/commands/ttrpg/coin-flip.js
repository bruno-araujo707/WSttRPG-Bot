const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Attack = require('../../core/Attack.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin-flip')
        .setDescription('Simulate an attack using coins.')
        .addNumberOption(option =>
            option
                .setName('total')
                .setDescription('The total of coins')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('base_power')
                .setDescription('The attack\'s base power')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('coin_power')
                .setDescription('The increased value of the attack\'s hit value (HV) when a coin lands on heads')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('coin_damage')
                .setDescription('The increased value of the attack\'s damage when a coin lands on heads')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('target_defense')
                .setDescription('The target defense. If you fill this option, the results will show if the whether it hit it or not.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const totalCoins = interaction.options.getNumber('total');
        const targetDefense = interaction.options.getNumber('target_defense');

        const results = Attack.flipCoins(
            totalCoins,
            interaction.options.getNumber('base_power'),
            interaction.options.getNumber('coin_power'),
            interaction.options.getNumber('coin_damage'),
        );

        let resultEmbed;

        if (targetDefense !== null) {
            if (results.hitValue >= targetDefense) {
                resultEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('✅ THE ATTACK LAND IT!')
                    .setDescription(`An attack with **${totalCoins}** coins was made!`)
                    .addFields(
                        { name: 'Coin(s) toss result', value: `> ${results.headTotal} Head(s) \n> ${results.tailsTotal} Tail(s)` },
                        { name: '⚔️ Final Hit Value (HV) vs Defense', value: `**${results.hitValue}** vs **${targetDefense}**` },
                        { name: '💥 Damage Caused', value: `**${results.damage}**` }
                    )
                    .setTimestamp()
                    .setFooter({ text: `Requested by: ${interaction.user.username}` });
            } else {
                resultEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('❌ MISS!')
                    .setDescription(`An attack with **${totalCoins}** coins was made!`)
                    .addFields(
                        { name: 'Coin(s) toss result', value: `> ${results.headTotal} Head(s) \n> ${results.tailsTotal} Tail(s)` },
                        { name: '⚔️ Final Hit Value (HV) vs Defense', value: `**${results.hitValue}** vs **${targetDefense}**` },
                        { name: '💥 Damage Caused', value: '**0**' }
                    )
                    .setTimestamp()
                    .setFooter({ text: `Requested by: ${interaction.user.username}` });
            }
        } else {
            resultEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🪙 RESULT')
                .setDescription(`An attack with **${totalCoins}** coins was made!`)
                .addFields(
                    { name: 'Coin(s) toss result', value: `> ${results.headTotal} Head(s) \n> ${results.tailsTotal} Tail(s)` },
                    { name: '⚔️ Final Hit Value (HV)', value: `**${results.hitValue}**`, inline: true },
                    { name: '💥 Final Damage', value: `**${results.damage}**`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.username}` });
        }

        await interaction.reply({ embeds: [resultEmbed] });
    },
};