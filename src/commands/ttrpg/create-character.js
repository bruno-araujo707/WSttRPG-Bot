const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const characterService = require('../../service/characterService');
const Character = require('../../core/Character');

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

		const characterInstance = new Character(
			interaction.options.getString('name'),
			interaction.options.getNumber('strength'),
			interaction.options.getNumber('dexterity'),
			interaction.options.getNumber('knowledge'),
			interaction.options.getNumber('psyche'),
			interaction.options.getNumber('face'),
			userId
		);

		const newCharacter = await characterService.createCharacter(characterInstance);

		if (newCharacter) {
			resultEmbed = new EmbedBuilder()
				.setColor(0x00FF00)
				.setTitle(`✅ Character "${characterInstance.name}" Created!`)
				.setDescription('**Slug**: `' + characterInstance.slug() + '` (Remember the slug, as it\'s used for most of the commands)')
				.addFields(
					{ name: 'Strength', value: characterInstance.strength.toString(), inline: true },
					{ name: 'Dexterity', value: characterInstance.dexterity.toString(), inline: true },
					{ name: 'Knowledge', value: characterInstance.knowledge.toString(), inline: true },
					{ name: 'Psyche', value: characterInstance.psyche.toString(), inline: true },
					{ name: 'Face', value: characterInstance.face.toString(), inline: true },
					{ name: '\u200b', value: '\u200b' }
				)
				.setTimestamp()
				.setFooter({ text: `Requested by ${interaction.user.username}` });
			await interaction.reply(({ embeds: [resultEmbed] }));
		} else {
			await interaction.reply('Error when trying to create character. Please try again.');
		}
	},
};