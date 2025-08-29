const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Attack = require('../../core/Attack');
const characterService = require('../../service/characterService.js');
const attackService = require('../../service/attackService.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-attack')
		.setDescription('Start the attack creating process. Leave the field character_slug blank to create for your main one.')
		.addStringOption(option =>
			option
				.setRequired(true)
				.setName('name')
				.setDescription('The attack\'s name')
		).addNumberOption(option =>
			option
				.setRequired(true)
				.setName('power')
				.setDescription('The attack\'s default power')
		).addNumberOption(option =>
			option
				.setName('total_coins')
				.setDescription('The attack\'s total of coins')
				.setRequired(true)
		).addNumberOption(option =>
			option
				.setName('coin_power')
				.setDescription('The extra HV (hit value) for each HEAD coin')
				.setRequired(true)
		).addNumberOption(option =>
			option
				.setName('coin_damage')
				.setDescription('The extra damage for each HEAD coin')
				.setRequired(true)
		).addStringOption(option =>
			option
				.setRequired(false)
				.setName('character_slug')
				.setDescription('The character who will own the attack')
		),

	async execute(interaction) {
		let character;
		if(!interaction.options.getString('character_slug')) {
			character = await characterService.getMainCharacter();
		} else {
			character = await characterService.findCharacter(interaction.options.getString('character_slug'));
		}

		if (!character) {
			await interaction.reply('Character not found. Make sure you that you have a character or that the slug entered is correct.');
		}

		const attackInstance = new Attack(
			interaction.options.getString('name'),
			interaction.options.getNumber('power'),
			interaction.options.getNumber('total_coins'),
			interaction.options.getNumber('coin_power'),
			interaction.options.getNumber('coin_damage'),
			character.slug
		);

		const newAttack = await attackService.createAttack(attackInstance, character.slug);
		if (newAttack) {
			resultEmbed = new EmbedBuilder()
				.setColor(0x00FF00)
				.setTitle(`✅ Attack ${attackInstance.name} Created!`)
				.setDescription(`**Slug**:  ${attackInstance.slug()} (Remember the slug, as it's used for most of the commands)`)
				.addFields(
					{ name: 'Base Power', value: attackInstance.power.toString(), inline: true },
					{ name: 'Total Coins', value: attackInstance.totalCoins.toString(), inline: true },
					{ name: 'Coin Power', value: attackInstance.coinPower.toString(), inline: true },
					{ name: 'Coin Damage', value: attackInstance.coinDamage.toString(), inline: true },
				)
				.setTimestamp()
				.setFooter({ text: `Requested by ${interaction.user.username}` });
			await interaction.reply({ embeds: [resultEmbed] });
		} else {
			await interaction.reply('Error when trying to create attack. Please try again.');
		}
	},
};