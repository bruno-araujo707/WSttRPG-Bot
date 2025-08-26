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
			idle: 30000,
			ephemeral: false,
			loop: true
		});

		const targetUser = interaction.options.getUser('target') ?? interaction.user;
		const characters = await characterService.listCharactersFromUser({ userId: targetUser.id });

		if (!characters || characters.length === 0) {
			return interaction.reply({ content: `${targetUser.username} não possui personagens.`, ephemeral: true });
		}

		const embeds = characters.map(character => {
			return new EmbedBuilder()
				.setColor(0x5865F2)
				.setTitle(character.name)
				.setAuthor({ name: `Personagem de ${targetUser.username}`, iconURL: targetUser.displayAvatarURL() })
				.setImage(character.imageUrl)
				.addFields(
					{ name: '💪 Força', value: character.strength.toString(), inline: true },
					{ name: '🏃 Destreza', value: character.dexterity.toString(), inline: true },
					{ name: '🧠 Conhecimento', value: character.knowledge.toString(), inline: true },
					{ name: '🧘 Psique', value: character.psyche.toString(), inline: true },
					{ name: '🎭 Face', value: character.face.toString(), inline: true }
				);
		});

		pagination.setEmbeds(embeds, (embed, index, array) => {
			return embed.setFooter({ text: `Personagem ${index + 1} de ${array.length} • Solicitado por ${interaction.user.username}` });
		});
		
		await pagination.render();
	},
};