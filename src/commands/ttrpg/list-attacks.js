const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Pagination } = require('pagination.djs');
const attackService = require('../../service/attackService');
const characterService = require('../../service/characterService');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-attacks')
		.setDescription('List all the attacks from a determined ')
		.addStringOption(option =>
			option
				.setRequired(false)
				.setName('character_slug')
				.setDescription('The character\'s slug. Leave it blank to get the main character slug.')
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

		let character;
		if(!interaction.options.getString('character_slug')) {
			character = await characterService.getMainCharacter();
		} else {
			let slug = interaction.options.getString('character_slug').toLowerCase(); 
			character = await characterService.findCharacter(slug);
		}

		if (!character) {
			return interaction.reply({ content: `The character doesn't exists.`, ephemeral: true });
		}

		const attacks = await attackService.listAttacksFromCharacter(character);

		if (!attacks || attacks.length === 0) {
			return interaction.reply({ content: `The character doesn't have any attacks. Please, create one and try again later.`, ephemeral: true });
		}

		const embeds = attacks.map(attack => {
			return new EmbedBuilder()
				.setColor(0x5865F2)
				.setTitle(`${attack.name} (Character: ${character.name})`)
				.setDescription('**Slug:** ' + '`' + attack.slug + '`')
				.setImage(attack.imageUrl)
				.addFields(
					{ name: 'Base Power', value: attack.power.toString(), inline: true },
					{ name: 'Total Coins', value: attack.totalCoins.toString(), inline: true },
					{ name: 'Coin Power', value: attack.coinPower.toString(), inline: true },
					{ name: 'Coin Damage', value: attack.coinDamage.toString(), inline: true },
				);
		});

		pagination.setEmbeds(embeds, (embed, index, array) => {
			return embed.setFooter({ text: `${index + 1} / ${array.length} • Requested by ${interaction.user.username}` });
		});
		
		await pagination.render();
	},
};