const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Roda um número aleatório entre 1 a 20'),
	async execute(interaction) {
		let result = getRandomInt(1, 20);
		await interaction.reply(`Resultado: ${result}`);
	},
};

function getRandomInt(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}