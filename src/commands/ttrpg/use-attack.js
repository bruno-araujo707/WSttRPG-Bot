const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const characterService = require('../../service/characterService.js');
const attackService = require('../../service/attackService.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use-attack')
		.setDescription('Use an attack from a character. Leave the field character blank to use your main one.')
		.addStringOption(option =>
			option
				.setRequired(false)
				.setName('attack_slug')
				.setDescription('The attack. Leave it blank to use your main one.')
		).addStringOption(option =>
			option
				.setRequired(false)
				.setName('character_slug')
				.setDescription('The character you wish to use. Leave it blank to use your main one.')
		).addStringOption(option =>
			option
				.setRequired(false)
				.setName('target_slug')
				.setDescription('Uses the attack against a character. It will tell you whether you failed or succeded.')
		),
	async execute(interaction) {
		let character;
		if(!interaction.options.getString('character_slug')) {
			character = await characterService.getMainCharacter();
		} else {
			character = await characterService.findCharacter(interaction.options.getString('character_slug').toLowerCase());
		}

		if(!character) {
			return interaction.reply({ content: `The passed character does not exist.`, ephemeral: true });
		}

		let attack;
		if(!interaction.options.getString('attack_slug')) {
			attack = await attackService.getMainAttack(character);
		} else {
			attack = await attackService.findAttack(interaction.options.getString('attack_slug').toLowerCase());
		}

		if(!attack) {
			return interaction.reply({ content: `The attack doesn't exists, or the passed character is not the owner of this attack.`, ephemeral: true });
		}
		
		const results = attack.useAttack(
            attack.totalCoins,
            attack.power,
            attack.coinPower,
            attack.coinDamage,
        );

		const resultEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('🪙 RESULT')
			.setDescription(`The attack ${attack.name} was made using **${attack.totalCoins}** coins!`)
			.addFields(
				{ name: 'Coin(s) toss result', value: `> ${results.headTotal} Head(s) \n> ${results.tailsTotal} Tail(s)` },
				{ name: '⚔️ Final Hit Value (HV)', value: `**${results.hitValue}**`, inline: true },
				{ name: '💥 Final Damage', value: `**${results.damage}**`, inline: true }
			)
			.setTimestamp()
			.setFooter({ text: `Requested by: ${interaction.user.username}` });
		await interaction.reply({ embeds: [resultEmbed] });
	},
};