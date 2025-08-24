const { SlashCommandBuilder, TextChannel } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-character')
		.setDescription('Start the character creating process.')
		.addStringOption(option =>
			option
				.setRequired(true)
				.setName('name')
				.setDescription('The character\'s name')
		).addNumberOption(option =>
			option
				.setRequired(true)
				.setName('strength')
				.setDescription('The character\'s strength')
		).addNumberOption(option =>
			option
				.setName('dexterity')
				.setDescription('The character\'s dexterity')
				.setRequired(true)
		).addNumberOption(option =>
			option
				.setName('knowledge')
				.setDescription('The character\'s knowledge')
				.setRequired(true)
		).addNumberOption(option =>
			option
				.setName('psyche')
				.setDescription('The character\'s psyche')
				.setRequired(true)
		).addNumberOption(option =>
			option
				.setName('face')
				.setDescription('The character\'s face')
				.setRequired(true)
		).addUserOption(option =>
			option
				.setRequired(false)
				.setName('target')
				.setDescription('The character owner')
		),
	async execute(interaction) {
		const characterName = interaction.options.getString('name');
		const characterOwner = interaction.options.getUser('target') ?? interaction.member;

		await interaction.reply(`Character ${characterName} was created. Owner: ${characterOwner.displayName}`)
	},
};