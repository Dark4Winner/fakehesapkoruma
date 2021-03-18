const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (args[0] === 'sıfırla') {
let fakehesaprol = db.fetch(`fakehesaprol_${message.guild.id}`)
if (!fakehesaprol) return message.channel.send(`<a:dikkat:707520390242631804>Fake Hesap Koruması Ayarlanmadığı İçin Sıfırlanamaz!`)
   if(!db.has(`fakehesaprol_${message.guild.id}`)) return message.channel.send(`<a:dikkat:707520390242631804>Sistem zaten kapalı.`)
message.channel.send(`Fake Hesap Koruması Başarıyla Sıfırlandı!<a:tiks:743841333692727378>`)
  db.delete(`fakehesap_${message.guild.id}`)
  db.delete(`fakehesaprol_${message.guild.id}`)
  return;
}

let rol = message.mentions.roles.first()
if(db.has(`fakehesaprol_${message.guild.id}`)) return message.channel.send(`<a:dikkat:707520390242631804>Sistem zaten açık.`)
if(!rol) return message.channel.send(`<a:dikkat:707520390242631804>Sunucuya Gelen Fake Hesaplara  Verilecek Rolü Belirtmeyi Unuttun!`)

let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send(`<a:dikkat:707520390242631804>Fake Hesap Logunu AYarlamayı Unuttun!`)

db.set(`fakehesaprol_${message.guild.id}`, rol.id)
db.set(`fakehesap_${message.guild.id}`, kanal.id)

message.channel.send(`<a:tiks:743841333692727378>Fake Hesap Koruması Başarıyla Ayarlandı ! \n Not Alınacak Rol Otomatik Olarak Oto Rol Ayarlanmıştır`)  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'fake-hesap-koruma'
}


//////komutlara atılacak.



client.on("guildMemberAdd", async (member) => {
 let log = db.fetch(`fakehesap_${member.guild.id}`);
    let rol = db.fetch(`otorol_${member.guild.id}`);
    let rol2 = db.fetch(`fakehesaprol_${member.guild.id}`);
    
    let user = client.users.cache.get(member.id);
    
     let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran", 
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
      }
     let aylar = aylartoplam 
    require("moment-duration-format");
  
    
      let s = (`${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}`)
    
 const kurulus = new Date().getTime() - user.createdAt.getTime();
  const güvenlidarkcode = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${client.user.username} Fake Hesaplara Ceza Sistemi`)
  .setDescription(`Kullanıcı: ${member} \n Hesap Kuruluş Tarihi: **${s}** \n Durumu: **Sunucuya Giriş Yapabilir<a:onn:739938568214020177>**`)
 /////
  const fakehesapdarkcode = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${client.user.username} Fake Hesaplara Ceza Sistemi`)
  .setDescription(`Kullanıcı: ${member} \n Hesap Kuruluş Tarihi: **${s}** \n Durumu: **Sunucuya Giriş Yapamaz<a:off:739938567434010704>** \n Verilecek Rol: <@&${rol2}> \n Alınacak Rol: <@&${rol}> Dark Code Sayesinde Fake Hesabı Yakladım`)

member.roles.remove(rol)
  
const gün = moment.duration(kurulus).format("D")
    var kontrol;
      if (kurulus > 2629800000) {
member.roles.add(rol)
 client.channels.cache.get(log).send(güvenlidarkcode)
} else {
member.roles.add(rol2)
member.roles.remove(rol)
client.channels.cache.get(log).send(fakehesapdarkcode)
}
});

////maine atılacak index.js bot.js vs
