const Discord = require("discord.js")
const rbx = require("noblox.js")

const config = {
	description: `Verifies your roblox account to your discord account.`,
	aliases: [],
	usage: [],
	rolesRequired: [],
	category: 'Verification'
};

module.exports = {
	config,
	run: async (client, message, args) => {
 
  

  let msg = await message.channel.send("Please complete the prompt...") // Send a message for awaiting.
  
  
  function makeid() {
    var text = "";
    var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋']; // Emoji list This can be used for words.
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)]; // This will random the emojis 
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
  }

  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) //This is the collector to collect the Message for getting the username.
  const robloxEmbed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("❓ | What's your ROBLOX username? Please say 'never mind' if you wish to cancel this prompt.")
.setFooter("Sodava Database | This prompt will cancel after 200 seconds.")
.setTimestamp()
 msg.channel.send(robloxEmbed) //Send the first Embed
  
 collector.on("collect", m => {
   if(m.content === 'never mind' || m.content === 'never mind') {
     message.channel.send('**Cancelled prompt.**')
     return
   } //Collector1 End
   rbx.getIdFromUsername(m.content).then(foundId => { //Get the userID from username
     const Id = foundId
     const newString = makeid() + makeid() + makeid() + makeid() + makeid() //Emoji thing
   const foundUsername = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("Greetings, **" + m.content + "**, to verify ownership, we ask of you to complete verification. Please put the emoticons below in your blurb, or status. \n `" + newString + "`\n\nPlease Say **done** when complete.\nSay **cancel** to cancel. ")
.setFooter("Sodava Databse")
.setTimestamp()
 msg.channel.send(foundUsername) //The part where it asks you to add the Code
       const collector2 = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) // Collector2
collector2.on('collect', async mag => {
      if(mag.content.includes('done') & mag.content.includes("done") && mag.author.id == message.author.id) {
        const fetchingBlurb = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("I will now head over to your profile, please wait as I look upon your account.")
.setFooter("Checking..")
.setTimestamp()
         msg.channel.send(fetchingBlurb) //Checks the Blurb / Status
        setTimeout(function() { //Timeout Stuff
rbx.getStatus(foundId).then(status => { //Check status
            console.log(status) //Console.log the status
          rbx.getBlurb(foundId).then(blurb => { // Checks the blurb
            if(status.includes(newString) || blurb.includes(newString)) { // If code is in blurb procceds with operation
              const verified = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle("Prompt")
.setDescription("You have now been verified! Please wait shortly as you are going to recieve the Verified role.")
.setFooter("Sodava Database | You're now verified!")
.setTimestamp() 
               msg.channel.send(verified) // Sent if user has put code
              message.member.roles.add(message.guild.roles.cache.find(r => r.name == "Verified")) // Add the users role
              message.member.setNickname(m.content) // Sets the users nickname



               } else {
               message.channel.send("Can not find the emojis.") // Sent if user has not put code
               }
          })
        }, 5000)
      })
      } else
        if(mag.content.includes('never mind') && mag.author.id == message.author.id) {
          message.channel.send('**Cancelled prompt.**') // If user says `Cancel`
                               return
        }
    })
 })
})
}
};