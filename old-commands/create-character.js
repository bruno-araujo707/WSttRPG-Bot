const { SlashCommandBuilder, TextChannel } = require('discord.js');
// const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, time: 15_000 });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-character')
		.setDescription('Start the character creating process.'),
	async execute(interaction) {
		// filter is needed, so the bot knows who he needs to reply
		const collectorFilter = message => { 
			return message.author.id === interaction.user.id;
		};
		
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const userName = interaction.member.displayName;
		await interaction.reply({ content: `Hello **${userName}**! What will be your new character name?`, withResponse: true })
			.then(response => {
				response.resource.message.channel.awaitMessages({ filter: collectorFilter, max: 1, time: 30_000, errors: ['time'] })
					.then(collected => {
						characterName = collected.first().content;
						interaction.followUp(`
							Alright, **${characterName}** it is! Now please, send his/her attributes in that order:
							STRENGHT, DEXTERITY, KNOWLEDGE, PSIQUE, FACE, and remember to type the commas. Example: 3, 4, 2, 1, 3
						`);
					})
					.catch(collected => {
						interaction.followUp('Time\'s up.');
					});
			})
	},
};