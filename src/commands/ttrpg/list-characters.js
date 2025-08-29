const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Pagination } = require('pagination.djs');
const characterService = require('../../service/characterService');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-character')
		.setDescription('List all the characters from a target.')
		.addUserOption(option =>
			option
				.setRequired(false)
				.setName('target')
				.setDescription('The user you want to see the list')
		),
	async execute(interaction) {
		const pagination = new Pagination(interaction, {
			firstEmoji: '⏮',
			prevEmoji: '◀️',
			nextEmoji: '▶️',
			lastEmoji: '⏭',
			idle: 60000,
			ephemeral: false,
			loop: true
		});

		const targetUser = interaction.options.getUser('target') ?? interaction.user;
		const characters = await characterService.listCharactersFromUser({ userId: targetUser.id });

		if (!characters || characters.length === 0) {
			return interaction.reply({ content: `${targetUser.username} doesn't have any character.`, ephemeral: true });
		}

		const embeds = characters.map(character => {
			return new EmbedBuilder()
				.setColor(0x5865F2)
				.setTitle(character.name)
				.setDescription('**Slug:** ' + '`' + character.slug + '`')
				.setAuthor({ name: `${targetUser.username}'s character`, iconURL: targetUser.displayAvatarURL() })
				.setImage(character.imageUrl)
				.addFields(
					{ name: 'Current HP', value: character.currentHp.toString(), inline: true },
					{ name: 'Max. HP', value: character.maxHp.toString(), inline: true },
					{ name: 'Current SP', value: character.currentSp.toString(), inline: true },
					{ name: 'Max SP', value: character.maxSp.toString(), inline: true },
					{ name: 'Strenght', value: character.strength.toString(), inline: true },
					{ name: 'Dexterity', value: character.dexterity.toString(), inline: true },
					{ name: 'Knowledge', value: character.knowledge.toString(), inline: true },
					{ name: 'Psyche', value: character.psyche.toString(), inline: true },
					{ name: 'Face', value: character.face.toString(), inline: true }
				);
		});

		pagination.setEmbeds(embeds, (embed, index, array) => {
			return embed.setFooter({ text: `${index + 1} / ${array.length} • Requested by ${interaction.user.username}` });
		});
		
		await pagination.render();
	},
};