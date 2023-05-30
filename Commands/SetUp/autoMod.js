const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType  } = require('discord.js')



module.exports = {

    data: new SlashCommandBuilder()

    .setName('automod')

    .setDescription('Setup AutoMod system')

    .addSubcommand(command => command.setName('flagged-words').setDescription('block profanety, sexual content, and slurs'))

    .addSubcommand(command => command.setName('spam-messages').setDescription('block messages suspected of spam'))

    .addSubcommand(command => command.setName('mention-spam').setDescription('block mentions a certain amount of mentions').addIntegerOption(option => option.setName('number').setDescription('The number of mentions reuired to block messages').setRequired(true)))

    .addSubcommand(command => command.setName('keyword').setDescription('block a given keyword in the server').addStringOption(option => option.setName('word').setDescription('The word to block').setRequired(true)))

    .addSubcommand(command => command.setName('anti-links').setDescription('block links').addChannelOption(option => option.setName('channel').setDescription('Canal en el que si se permite enviar links').addChannelTypes(ChannelType.GuildText)))

    .addSubcommand(command => command.setName('anti-invites').setDescription('block invites if discords')),



    async execute(interaction, client) {



        const {guild, options} = interaction;

        const sub = options.getSubcommand();



        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: `You dont have perms to setUp AutoMod within this server`, ephemeral: true})



        switch (sub) {

            case 'flagged-words':

                await interaction.reply({content: `Loadding your automod rule...`})

                const rule = await guild.autoModerationRules.create({

                    name: `Block profanity, sexual content and slurs by: ${client.user.tag}`,

                    creatorId: `679438909478010911"`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 4,

                    triggerMetadata:

                        {

                            presents: [1, 2, 3]

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This message was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule) return; 

                    const embed = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all swears will be stopped by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed]});

                }, 3000)

                break;



                case 'keyword':

                    await interaction.reply({content: `Loadding your automod rule...`})

                    const word = options.getString('word')

                const rule2 = await guild.autoModerationRules.create({

                    name: `prevent the word ${word} by: ${client.user.tag}`,

                    creatorId: `679438909478010911`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 1,

                    triggerMetadata:

                        {

                            keywordFilter: [`${word}`]

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This message was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule2) return; 

                    const embed2 = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all messages containing the word ${word} will be deleted by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed2]});

                }, 3000)

                break;





                case 'spam-messages':

                await interaction.reply({content: `Loadding your automod rule...`})

                const rule3 = await guild.autoModerationRules.create({

                    name: `Prevent spam messages by: ${client.user.tag}`,

                    creatorId: `679438909478010911`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 3,

                    triggerMetadata:

                        {

                            // mentionTotalLimit: number

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This message was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule3) return; 

                    const embed3 = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all messages suspected of spam will be deleted by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed3]});

                }, 3000)





                break;

                case 'mention-spam':

                    await interaction.reply({content: `Loadding your automod rule...`})

                    const number = options.getInteger('number')

                const rule4 = await guild.autoModerationRules.create({

                    name: `Prevent spam mentions by: ${client.user.tag}`,

                    creatorId: `679438909478010911`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 5,

                    triggerMetadata:

                        {

                            mentionTotalLimit: number

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This message was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule4) return; 

                    const embed4 = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all messages suspetected of mention spam will be deleted. by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed4]});

                }, 3000)

                break;



                case 'anti-links':

                    const permChannel = interaction.options.getChannel('channel');

                    await interaction.reply({content: `Loadding your AutoMod rule...`})

                const rule5 = await guild.autoModerationRules.create({

                    name: `Prevent links by: ${client.user.tag}`,

                    creatorId: `679438909478010911`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 1,

                    triggerMetadata:

                        {

                            keywordFilter: ['http'],

                            regexPatterns: ['http']

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This link was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ],

                    exemptChannels: [`${permChannel.id}`]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule5) return; 

                    const embed5 = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all links now blocked. by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed5]});

                }, 3000)

                break;



                case 'anti-invites':

                    await interaction.reply({content: `Loadding your AutoMod rule...`})

                const rule6 = await guild.autoModerationRules.create({

                    name: `Prevent invite link by: ${client.user.tag}`,

                    creatorId: `679438909478010911`,

                    enabled: true,

                    eventType: 1,

                    triggerType: 1,

                    triggerMetadata:

                        {

                            keywordFilter: ['http'],

                            regexPatterns: ['http']

                        },

                        actions: [

                            {

                                type: 1,

                                metadata: {

                                    channel: interaction.channel,

                                    durationSeconds: 10,

                                    customMessage: `This discord invite was prevented by ${client.user.tag} Auto Moderation.`

                                }

                            }

                        ]

                }).catch(async err => {

                    setTimeout(async () => {

                        console.log(err);

                        await interaction.editReply({ content: `${err}`});

                    }, 2000)

                })

                setTimeout(async () => {

                    if (!rule6) return; 

                    const embed6 = new EmbedBuilder()

                    .setColor('Random')

                    .setDescription(`You AutoMod rule has been created- all discord invites now blocked. by ${client.user.tag}`)

                    await interaction.editReply({content: ``, embeds: [embed6]});

                }, 3000)

                break;

        }

    }

                                                     }