const { SlashCommandBuilder, TextChannel } = require('discord.js');
const characterService = require('../../service/characterService');

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
		const characterOwner = interaction.options.getUser('target') ?? interaction.member;
		const userId = characterOwner.id;
		const characterData = {
			name: interaction.options.getString('name'),
			strength: interaction.options.getNumber('strength'),
			dexterity: interaction.options.getNumber('dexterity'),
			knowledge: interaction.options.getNumber('knowledge'),
			psyche: interaction.options.getNumber('psyche'),
			face: interaction.options.getNumber('face'),
			userId: userId
		};

		const newCharacter = await characterService.createCharacter(characterData);

		if (newCharacter) {
			await interaction.reply(`Character ${characterData.name} was created. Owner: ${characterOwner.displayName}`);
		} else {
			await interaction.reply('Error when trying to create character. Please try again.');
		}
	},
};