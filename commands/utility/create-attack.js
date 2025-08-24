const { SlashCommandBuilder, TextChannel } = require('discord.js');
const Helper = require('../../core/Helper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-attack')
		.setDescription('Start the attack creating process.')
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
		),
	async execute(interaction) {
		const attackName = interaction.options.getString('name');
		const slug = Helper.slugify(attackName);
		await interaction.reply(`Attack ${attackName} was created. Slug: ${slug}`)
	},
};