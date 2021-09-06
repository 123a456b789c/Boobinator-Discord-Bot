const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`TESZTOLDAL \n ${name} - Discord bot \n Meghívható: https://discord.com/api/oauth2/authorize?client_id=863072664863768606&permissions=8&scope=bot`));
app.listen(port, () => console.log(`A program a következő portszámot kapta:${port}`)); 

//BOT KÓD KEZDÉSE
var name = 'Boobinator'
//Külső függvénykönyvtárak
//npm i sqlite3
//npm i sequelize
const request = require('request');
const billboardTop100 = require("billboard-top-100")
const time = require('unix-timestamp-converter');
const leveling = require('discord-leveling')
const status = require('minecraft-server-status');
const parser = require('rss-url-parser')
const rf = require('reddit-image-fetcher')
const covid = require('corona-info');
const weather = require('weather-api-data');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const nevnap = require ('nevnap');
const Chart = require('chart.js')
const ChartJsImage = require('chartjs-to-image');
const DiscordPages = require("discord-pages");
const currency = require("node-currency")
const client = new Discord.Client();
disbut(client);

//Inicializáláskor fut le
client.on('ready', () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity(".help", {type: "PLAYING"});
});

//Parancsok

client.on('message', msg => {
  if (msg.content === '.minecraft') {
  leveling.AddXp(msg.member.user.id, -1)
  status('mc.hypixel.net', 25565, response => {
  var stat = response.online
  if (stat===true) {
    var emote = ':white_check_mark:';
  }
 if (stat===false) {
    var emote = ':octagonal_sign:';
 }
  const embed = new Discord.MessageEmbed()
  .setColor('#2bff00')
  .setTitle(`:pick: *Hypixel* Státusz`)
  .setAuthor(`${name}`)
  .addField(':video_game: Online:', emote)
  .addField(':restroom: Játékosok:', `${response.players.now}db / ${response.players.max}db`)
  .setImage('https://cdn.glitch.com/e58f9f02-0cf8-4a4a-b0a2-17c803c337b2%2Fpng-clipart-minecraft-grass-illustration-minecraft-pocket-edition-minecraft-story-mode-the-technomancer-xbox-360-ico-minecraft-miscellaneous-grass.png?v=1626368827244')
  msg.reply(embed)
});
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('.minecraftd')) {

  
  const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Adatok lekérése sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nincs megadva szerver.`)

  leveling.AddXp(msg.member.user.id, -1)
  var url = msg.content.slice(12).trim().split(' '); 
  chars = msg.content.length;
  if (chars < 12) {
  msg.channel.send(error3)
  } else {
  status(url, 25565, response => {
  var stat = response.online
  if (stat===true) {
    var emote = ':white_check_mark:';
  }
 if (stat===false) {
    var emote = ':octagonal_sign:';
 }

  const embed = new Discord.MessageEmbed()
  .setColor('#2bff00')
  .setTitle(`:pick: *${url}* Státusz`)
  .setAuthor(`${name}`)
  .addField(':video_game: Online:', emote)
  .addField(':restroom: Játékosok:', `${response.players.now}db / ${response.players.max}db`)
  .setImage('https://cdn.glitch.com/e58f9f02-0cf8-4a4a-b0a2-17c803c337b2%2Fpng-clipart-minecraft-grass-illustration-minecraft-pocket-edition-minecraft-story-mode-the-technomancer-xbox-360-ico-minecraft-miscellaneous-grass.png?v=1626368827244')
  msg.reply(embed)
 });
  }
   
    


  }
});


client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(".bot")){
        if(msg.author.bot) return;
        leveling.AddXp(msg.member.user.id, -1)
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#fc03cf')
            .setTitle("A bot élő státusza")
            .addField(" \u200B ", "**Csatornák** : ` " + `${client.channels.cache.size}` + " `")
            .addField(" \u200B ", "**Szerverek** : ` " + `${client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "**Kliensek** : ` " + `${msg.guild.members.cache.size}` + " `")
        msg.reply(exampleEmbed);
    }
})

client.on('message', msg => {
  if (msg.content.startsWith('.kick')) {
    leveling.AddXp(msg.member.user.id, -1)
  const error1 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag eltávolítása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nem jogosult a parancs használatához`)

  const error2 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag eltávolítása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Felhasználó nem kirúgható.`)

  const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag eltávolítása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nincs kijelölve tag, vagy nem megfelelő kijelölés. (Használja a @említés formátumot!`)

  let member = msg.mentions.members.first();
  if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply(error1)
  if(!member) return msg.reply(error3);
  if(!member.kickable) return msg.reply(error2);
  member.kick();
  const embed = new Discord.MessageEmbed()
  .setColor('#2bff00')
  .setTitle("Siker - Tag eltávolítva")
  .setAuthor(`${name}`)
  .setImage('https://cdn.glitch.com/e58f9f02-0cf8-4a4a-b0a2-17c803c337b2%2F523-5232109_check-mark-computer-icons-clip-art-green-checkmark.png?v=1626359493911')
  msg.reply(embed)


  
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('.purge')) {
    leveling.AddXp(msg.member.user.id, -1)


  const error1 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Törlés sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nem jogosult a parancs használatához`)

const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Törlés sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Üzenetek száma mező nem értelmezhető vagy üres.`)

const error2 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Törlés sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Üzenetek száma tatományon kívül (0 < szám > 100)`)  


var args = msg.content.slice(7).trim().split(' '); 
var txt = args.toString();
var num = Number(txt)
if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(error1)
if (!num) return msg.reply(error3);
if (isNaN(num)) return msg.reply(error3);
if (num > 100) return msg.reply(error2); 
if (num < 1) return msg.reply(error2);
var num3 = num + 3

let button = new disbut.MessageButton()
  .setLabel("Törlés")
  .setID("myid")
  .setStyle("red");


const  ok = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle("Nyomd meg a törlés megerősítéséhez!")
  .setAuthor(`${name}`)

msg.channel.send(ok, button);




async function bulk() {
await msg.channel.messages.fetch({ limit: num3 }).then(messages => { 
    msg.channel.bulkDelete(messages);
});
};

client.on('clickButton', async (button) => {
await button.clicker.fetch();
if (!button.clicker.member.hasPermission("KICK_MEMBERS")) return
bulk();
});



  
  }
});


client.on('message', msg => {
  if (msg.content.startsWith('.ban')) {
    leveling.AddXp(msg.member.user.id, -1)
  const error1 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag kitiltása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nem jogosult a parancs használatához`)

  const error2 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag kitiltása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Felhasználó nem kirúgható.`)

  const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Tag kitiltása sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nincs kijelölve tag, vagy nem megfelelő kijelölés. (Használja a @említés formátumot!`)

if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(error1)
let member = msg.mentions.members.first();
if (!member) return msg.channel.send(error3)
if (member.hasPermission("BAN_MEMBERS")) return msg.reply(error2)
let banReason = (`Operátor által eltávolítva. ${msg.author}`)
member.ban({reason: banReason})
  const embed = new Discord.MessageEmbed()
  .setColor('#2bff00')
  .setTitle("Siker - Tag eltávolítva")
  .setAuthor(`${name}`)
  .setImage('https://cdn.glitch.com/e58f9f02-0cf8-4a4a-b0a2-17c803c337b2%2F523-5232109_check-mark-computer-icons-clip-art-green-checkmark.png?v=1626359493911')
  msg.reply(embed)


  
  }
});

client.on('message', msg => {
if(msg.author.bot) return;
leveling.AddXp(msg.member.user.id, 1);
});


client.on('message', msg => {
var prc = msg.content.toLowerCase();
var szl = Array('fasz','geci','kurva','lófasz','köcsög','ondógyurma','buzi','cigány','bazmeg','baszd meg','baszdmeg','baszlak','kúrok','kúrsz','kúrom','kúrod','picsa','ringyó','ribanc')
for (var i = 0; i < szl.length; i++) {
  if (prc.includes(szl[i])) {
    msg.delete();
  leveling.AddXp(msg.member.user.id, -11)
  const embed = new Discord.MessageEmbed()
  .setTitle('Üzenet Törölve')
  .setColor('#e60400')
  .setDescription("Szerver-moderáció")
  .setAuthor(`Vétkes: ${msg.author.username}`)
  .addField('Törlés oka', 'Üzenet tartalma szerepel a tiltólistán.')
  .addField('Üzenet', `||${msg.content}||`)
  .setImage('https://cdn.glitch.com/e58f9f02-0cf8-4a4a-b0a2-17c803c337b2%2F6053-3100-allj-elsobbsegadas-kotelezo-stop-tabla.png?v=1626338794156')
  msg.reply(embed)
    break;
  }
}
});

client.on('message', msg => {
  if (msg.content.startsWith('.weatherd')) {
    leveling.AddXp(msg.member.user.id, -1)
const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - Időjárás betöltése sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nincs kijelölve hely!`)

async function getWeatherdinamic() {
  const data = await weather.loction(location);
  var image = `https:${data.current.condition.icon}`
  const embed = new Discord.MessageEmbed()
  .setTitle(`:cityscape: ${data.location.name}`)
  .setColor('#0c9417')
  .setDescription("with weather-api-data (JS)")
  .setAuthor(data.location.country)
  .addField('Hőmérséklet', data.current.temp_c + 'C°')
  .addField('Időjárás',data.current.condition.text)
  .setImage(image)
  msg.reply(embed)
}

	const location = msg.content.slice(9).trim().split(' ');
chars = msg.content.length;
  if (chars < 10) {
  msg.channel.send(error3)
  } else {
  getWeatherdinamic();
  }

  }
});

client.on('message', msg => {
  if (msg.content.startsWith('.rssd')) {
    leveling.AddXp(msg.member.user.id, -1)
async function RSSD() {
var page = arg1[0]
var url = arg1[1]
const data = await parser(url)
var check = data[page+0].title
var check1 = data[page+1].title
var check2 = data[page+2].title
if (check !==undefined || check1 !==undefined || check2 !==undefined) {
  var feed = data[page+0]
  const embed = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed.title} :scroll:`)
  .setAuthor("RSS")
  .addField(":chains: Link:",feed.link)
  msg.reply(embed)

  var feed1 = data[page+1]
  const embed1 = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed1.title} :scroll:`)
  .setAuthor("RSS")
  .addField(":chains: Link:",feed1.link)
  msg.reply(embed1)

  var feed2 = data[page+2]
  const embed2 = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed2.title} :scroll:`)
  .setAuthor("RSS")
  .addField(":chains: Link:",feed2.link)
  msg.reply(embed2)
}
}



	const arg1 = msg.content.slice(5).trim().split(' ');

const error3 = new Discord.MessageEmbed()
  .setColor('#ff2200')
  .setTitle("Hiba - RSS betöltése sikertelen")
  .setAuthor(`${name}`)
  .addField('Ok:', `Nincs kijelölve RSS feed!`)

  chars = msg.content.length;
  if (chars < 6) {
  msg.channel.send(error3)
  } else {
  RSSD();
  }

  }
});

client.on('message', msg => {
  if (msg.content === '.xp') {

    leveling.AddXp(msg.member.user.id, -1)
async function eco() {
var data = await leveling.Fetch(msg.member.user.id)
const embed2 = new Discord.MessageEmbed()
  .setColor('#93a832')
  .setTitle(`:cowboy: Adatok ${msg.author.username} felhasználóról`)
  .setAuthor("Discord XP")
  .addField(":star: XP:",data.xp)
  .addField(":regional_indicator_i: :regional_indicator_d: Userid:",msg.member.user.id)
  msg.reply(embed2)
}

eco();

}
});

//Mém parancs
client.on('message', msg => {
  if (msg.content === '.meme') {
    leveling.AddXp(msg.member.user.id, -1)
//Array kezelő
function getFields(input, field) {
  var output = [];
  for (var i=0; i < input.length ; ++i)
  output.push(input[i][field]);
  return output;
}


//Parancs kódja
async function meme() {
var image = await rf.fetch({type: 'meme'});
  var result = getFields(image, "image");
  let text = result.toString();
  var result1 = getFields(image, "title");
  let title = result1.toString();
  var result2 = getFields(image, "subreddit");
  let reddit = result2.toString();
  const embed = new Discord.MessageEmbed()
  .setColor('#FF5700')
  .setTitle(title)
  .setAuthor(reddit)
  .setImage(text)
  msg.reply(embed)
}

meme();
   
  }
});

//.porn parancs
client.on('message', msg => {
  if (msg.content === '.porn') {
    leveling.AddXp(msg.member.user.id, -2)
  const RandomHub = require('random-hub').RandomHub;
  const hub = new RandomHub();
  const embed = new Discord.MessageEmbed()
  .setColor('#0d09e3')
  .setTitle("NSFW GIF")
  .setAuthor(`${name}`)
  .setImage(hub.getRandomHub('real'))
  msg.reply(embed)
  }
});

//RSS olvasó parancs (parser után RSS url)
client.on('message', msg => {
  if (msg.content === '.rss') {
    leveling.AddXp(msg.member.user.id, -1)
async function RSS() {

  const data = await parser('https://telex.hu/rss')
  var feed = data[0]
  const embed = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed.title}`)
  .setAuthor("RSS")
  .addField(":chains: Link",feed.link)
  msg.reply(embed)

  var feed1 = data[1]
  const embed1 = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed1.title}`)
  .setAuthor("RSS")
  .addField(":chains: Link",feed1.link)
  msg.reply(embed1)

  var feed2 = data[2]
  const embed2 = new Discord.MessageEmbed()
  .setColor('#00ffb6')
  .setTitle(`:scroll: ${feed2.title}`)
  .setAuthor("RSS")
  .addField(":chains: Link",feed2.link)
  msg.reply(embed2)
};

RSS();
  
  }
});

//Covid adatok parancs
client.on('message', msg => {
if (msg.content === '.covid') {
  leveling.AddXp(msg.member.user.id, -1)
const covidData = async () => {
  let data = await covid.findData({ country: "all" });
  const embed = new Discord.MessageEmbed()
  .setColor('#d62a0f')
  .setTitle("Covid Adatok")
  .setAuthor("Covid World")
  .addField("Elhalálozások",data.deaths)
  .addField("Intenzív osztályon ápoltak",data.critical)
  .addField("Ma gyógyultak",data.todayRecovered)
  .addField("Fertőzések",data.cases)
  .addField("Mai Fertőzések",data.todayCases)
  msg.reply(embed)
}

covidData();

const covidDatah = async () => {
  let datah = await covid.findData({ country: "Hungary" });
  const embed = new Discord.MessageEmbed()
  .setColor('#d62a0f')
  .setTitle("Covid Adatok")
  .setAuthor("Covid HU")
  .addField("Elhalálozások",datah.deaths)
  .addField("Intenzív osztályon ápoltak",datah.critical)
  .addField("Ma gyógyultak",datah.todayRecovered)
  .addField("Fertőzések",datah.cases)
  .addField("Mai Fertőzések",datah.todayCases)
  msg.reply(embed)
}

covidDatah();
  }
});

//Pénzfeldobás (viccgenerátrohoz hasonló)
client.on('message', msg => {
  if (msg.content === '.coin') {
    leveling.AddXp(msg.member.user.id, -1)
  var pénz = Array('https://cdn.glitch.com/13990099-e10d-435c-9d65-af0aa128255f%2Ffej.png?v=1626111247371','https://cdn.glitch.com/13990099-e10d-435c-9d65-af0aa128255f%2F%C3%ADr%C3%A1s.png?v=1626111249060')
  var oldal = pénz[Math.floor(Math.random()*pénz.length)];
  const embed = new Discord.MessageEmbed()
  .setTitle("Véletlen pénzfeldobás eredménye")
  .setAuthor("Random")
  .setColor('#ffcb0f')
  .setImage(oldal)
  msg.reply(embed)
  }
});



//Viccgenerátor Array objektum tartalmazza a vicceket, sortörésekkel
client.on('message', msg => {
  if (msg.content === '.joke') {
    leveling.AddXp(msg.member.user.id, -1)
  var viccek = Array('Ha az ANYA szóból elveszel egy betűt és hármat kicserélsz, pont azt a szót kapod, hogy SÖR… Hát nem csodálatos a magyar nyelv?',
'- Édesanyám, mit rakjak a tésztára? \n - A fedőt fiam, hogy apádnak is maradjon.',
'Mi a különbség a WC és a koporsó között?\nSemmi: ha menni kell, hát menni kell!',
'- Hány óra van?\n- Tíz perc múlva tíz.\n- Nem azt kérdeztem, hogy tíz perc múlva mennyi lesz, hanem hogy most mennyi van.',
'A skót kisfiú megkérdezi az apjától: \n- Apa, mi lesz karácsonykor a fa alatt?\n - Parketta, kisfiam.',
'Vidámsági versenyt rendeztek az állatok. Kié lett a győzelem?\nA juhé…',
'Nagypapa, mi az a plátói szerelem?\n- Kis unokám, az olyan, mintha kívülről nyalogatnád a pálinkásüveget…',
'Bemegy a migráns az ásotthalmi kocsmába, majd megkérdi:\n- Pálinkájuk van?\n- Melyikből szeretne?\n- Abból a kerítésszaggatóból.',
'Ne feledjétek, vasárnap óraátállítás. Mindenki egy órával kevesebbet nem mehet sehova!',
'Jean, mégsem veszem meg azt a Picasso festményt.\n- Miért nem, uram?\n- Nincs rá keret.',
'Miért nem lehet a Lánchídon biciklizni?\n- Mert nincsen rajta pedál!\n- És az Erzsébet hídon?\n- Mert azon még lánc sincs.',
'- Elnézést megmondaná, melyik a túloldal?\n- Persze, az ott szemben.\n- Hát most már tényleg megbolondulok! Onnan meg ideküldtek!',
'- Halló! Érdeklődöm, hogy fájdalmas-e a tetoválás.\n- Attól függ, helyileg hol lenne.\n- Abádszalókon.',
'Az indián bemegy a polgármesteri hivatalba azzal, hogy túl hosszú a neve és szeretné megváltoztatni. Az adatfelvételnél a titkárnő megkérdezi:\n- Jelenleg mi a neve?\n- Szélnél Is Sebesebben Szálló Ezüst Nyílvessző.\n- És mi legyen az új neve?\n- Sutty!',
'- Mi az azkézis?\n- A majom lába, mert az kéz is.',
'- Mi lesz süsüből, ha megfőzik?\n- Zöldbábfőzelék.',
'- Miért nem beszélnek egymással a gumimacik?\n- Haribó!',
'- Hogyan pihen a redőnyös?\n- Reluxál!',
'- Szerszámok játszanak a garázsban:\n- Te vagy a fogó!',
'- Hogy hívják a bolhás macskát?\n- Visz Cat.',
'- Hogy hívják Einstein gyerekeit?\n- Zweistein, dreistein.',
'- Milyen a Dolby Surround zárthelyi?\n- 5 pont, 1-es!',
'- Hogy hívják Herkules feleségét?\n- Fraukules',
'- Két autó áll egymás mellett? Melyik az irodalmár?\n- A bal lada',
'Ki terít meg ebédre az állatóvodában?\nA napos csibe.',
'Ki lehet a mosómedve eszményi társa?\nA teknősbéka.',
'Miért rossz a tetűnek?\nMert hajszálon múlik az élete.',
'Miért tévednek kevesebbet az állatok?\nMert tévedni emberi dolog.',
'Mi hasonlít legjobban az emberre?\nA rendőr. Megszólalásig.',
'Mit mond az orosz a halálos ágyán?\nSzentpétervár.',
'Mivel lepte meg Jimmy a vendégeit?\nEgy ravasz húzással.',
'Miért jó az ejtőernyősöknek?\nMert esőben nem áznak.',
'Hogyan nevezik a vízen járó matrózt?\nTengerész gyalogos.',
'Hogy hívják a zöldruhás szerzetest?\nKörnyezetbarát.',
'Mi a különbség a méh és a darázs között?\nA darázs nem gyűjt vasat.',
'Miért jobb az Alzheimer kór a Parkinson kórnál?\nInkább felejtsem el kifizetni sörömet, minthogy kilötyögtessem.',
'Melyik hely a legveszélyesebb a világon?\nAz ágy, hiszen ott hal meg a lakosság 80%-a.',
'Mit látsz, ha mélyen egy szöszi szemébe nézel?\nA hajhagymáit.',
'Mi az: kicsi, fekete, és nem bírja el a kaszát?\nA halál fia.',
'Mi lesz, ha elütnek egy matematikust?\nMár nem számít.',
'Van egy szőke nő és egy barna . Leugranak egy szakadékba.\nKi ér le először ? A barna mert a szőke eltéved.',
'Mi az szőke nő hajában barna tincs? Halvány remény.','Két barátnő cseveg a presszóban.\n- Imádom a természetet - mondja az egyik.\nA másik figyelmesen ránéz, és epésen megjegyzi:\n- Azok után, amit művelt veled?',
'- Mi lesz a kenyérből, ha a medve ráül?\n- Bundáskenyér.',
'- Hogy hívják eszperente nyelven Kerepestarcsát?\n- Kerepes netegyele! ',
'- Milyen a hallása, mama?\n- Római katolikus...',
'- Mi az, kicsi, szőrös és kering a Föld körül?\n- Műhód.',
'Kovácsék vendégeket várnak:\n- Drágám - szól a feleség -, rakd el azt az esernyőt az előszobából, mert Feketéék is jönnek vacsorára.\n- Butaságokat beszélsz - válaszol a férj -, Feketéék nem lopnak!\n- Nem is attól félek, hogy ellopják, hanem, hogy megismerik.',
'- Melyik a legsárgább madár?\n- A citromhéja.',
'- Mi van a hangyaboly alatt?\n- Hangyagörl.',
'- Hogy hívják a nagyothalló macit?\n- MACI!!!',
'- Bükkfán van és fütyül, mi az?\n- Eltévedt rézfánfütyülő.',
'- Mi van a kisbárány fürdőszobájában?\n- Barikád.',
'- Miért van hosszú nyaka a hattyúnak?\n- Hogy meg ne fulladjon árvíz idején.',
'- Miért csíkos a tigris?\n- Mert rács mögött sült le.',
'- Miért nem száguldozik a csiga a 120-szal?\n- Mert lobogna a szeme.',
'- Hogyan lehet megkülönböztetni a zsiráfot a tehéntől?\n- Nagyon egyszerűen. Állítsd egymás mellé őket, s amelyik a zsiráf mellett van, az a tehén.',
'- Mi lesz a lóból, ha átmegy rajta az úthenger?\n- Sikló.',
'- Mi a különbség a hidra és a kobra közt?\n- A kobra felmehet a hídra, de a hidra nem mehet fel a kobra.',
'- Mit csinál az egér magömlés előtt?\n- Kirágja a zsákot.',
'- Hogyan vesztette el a medve az óráját?\n- Ment az erdőben, az órája megállt, ő pedig továbbment.',
'- Mi az: müz-müz?\n- Méhecske hátramenetben.',
'- Mit kell adni a rinocérosznak, ha hasmenése van?\n- Utat.',
'- Mi az? Kicsi, szőrös és kering a Föld körül?\n- Műhód.',
'- Mibe halt bele a csiga?\n- Belenézett a konnektorba.',
'- Mi lesz egy zsiráf és egy vakond keresztezéséből?\n- Fúrótorony.',
'- Mi lesz a vakond és a fakopáncs keresztezéséből?\n- Ütvefúró.',
'- És egy kígyó és egy sündisznó keresztezéséből?\n- Szögesdrót.',
'- Mi az: tarka és elöl-hátul vérzik?\n- Boci boci tarka\nSe füle se farka...',
'- Miért halt meg a TV Maci?\n- Mert köpött.',
'- Mit csinál a sün, ha babot eszik?\n- Sündörög.',
'- Miért van a mókusnak hátul a farka?\n- Mert elöl a mókus van.',
'- Mit csinál a denevér a mikrohullámú sütőben?\n- Zenét hallgat.',
'- Mi a különbség a krokodil között?\n- Hosszabb, mint zöld.',
'- Mi a különbség a veréb között?\n- Mind a két szárnya teljesen egyforma, különösen a bal.',
'- Miért szürke és rücskös az elefánt bőre?\n- Mert ha fehér lenne és sima, összetéveszthetnénk az aszpirinnel.',
'- Miért fehér az elefánt talpa?\n- Hogy álcázni tudja magát, ha háton úszik egy tejfölösköcsögben.',
'- Mi az a hákettőópéóká?\n- Vízipók.',
'- Mit csinál a szú a fában?\n- Perceg.\n- És a kis szú?\n- Másodperceg.')
  var vicc = viccek[Math.floor(Math.random()*viccek.length)];
  const embed = new Discord.MessageEmbed()
  .setTitle("Szóvicc")
  .setAuthor("Hahota")
  .addField(vicc, '/Szóvicc VÉGE/')
  msg.reply(embed)
  }
});


//HELP

/*
client.on('message', msg => {
  if (msg.content === '.helpall') {
    leveling.AddXp(msg.member.user.id, -1)
const embed = new Discord.MessageEmbed()
.setTitle("Command List")
.setDescription("Parancsok listája. Prefixum: .")
.setAuthor("Boobinator")
.addField("Moderáció", "A csetbot képes a csúnya szavak szűrésére, szövegkörnyezetben is.")
.addField(".help", "Ezen útmutató lekérése")
.addField(".porn", "Véletlenszerű NSFW GIF lekérése")
.addField(".joke", "Véletlenszerű vicc az adatbázisból (bővítés alatt)")
.addField(".covid", "Covid információk a világra és országunkra vonatkozóan.")
.addField(".coin", "Egy pénz véletlen feldobása.")
.addField(".meme", "Egy Véletlenszerű Reddit mém lekérése.")
.addField(".weather", "Budapesti időjárás lekérése")
.addField(".weatherd <hely>", "Időjárás <hely>-re vonatkozóan.")
.addField(".rss", "A telex.hu híroldal RSS-híreinek lekérése.")
.addField(".rssd <page> <url>", "RSS hírek <url> helyről, a <page> oldalról.")
.addField(".ban <member> ", "<member> kitiltása a szerverről. (Csak megfelelő ranggal használható.)")
.addField(".kick <member> ", "<member> kidobása a szerverről. (Csak megfelelő ranggal használható.)")
.addField(".xp", "Az üzenet küldőjének XP-pontjainak lekérése a bot adatbázisából (1 üzenet, 1 pont)")
.addField(".purge <count> ", "<count> számú üzenet törlése a csatornából. (Csak megfelelő ranggal használható.)")
.addField('.minecraft' , 'Hypixel szerver státusz.')
.addField('.minecraftd <url>' , 'Minecraft szerver státusz <url>-hez.')
.addField('.nevnap', 'Mai névnap lekérése (Magyarország).')
msg.reply(embed)
  }
});

*/

//Ehhez ne nyúlj hozzá, ha kedves az életed

client.on('message', msg => {
  if (msg.content === '.weather') {
    leveling.AddXp(msg.member.user.id, -1)

async function getWeather() {
    const data = await weather.loction('Budapest');
    var image = `https:${data.current.condition.icon}`
    const embed = new Discord.MessageEmbed()
  .setTitle("Budapesti időjárás")
  .setColor('#0c9417')
  .setDescription("with weather-api-data (JS)")
  .setAuthor(`${name}`)
  .addField('Hőmérséklet', data.current.temp_c + 'C°')
  .addField('Idő', data.location.localtime)
  .addField('Időjárás',data.current.condition.text)
  .setImage(image)
  msg.reply(embed)
}
getWeather();
}
});


client.on('message', msg => {
  if (msg.content === '.nevnap') {
    leveling.AddXp(msg.member.user.id, -1)
  const embed = new Discord.MessageEmbed()
  .setTitle("Mai névnap")
  .setColor('#0e58cf')
  .setDescription("Magyar névnapok.")
  .setAuthor(`${name}`)
  .addField('Ma:', nevnap.today())
  msg.reply(embed)
}
});

const pg1 = new Discord.MessageEmbed()
.setTitle("Command List.")
.setDescription("Parancsok listája. Prefixum: .")
.setAuthor(`${name}`)
.addField("Moderáció", "A csetbot képes a csúnya szavak szűrésére, szövegkörnyezetben is.")
.addField(".help", "Ezen útmutató lekérése")
.addField(".porn", "Véletlenszerű NSFW GIF lekérése")
.addField(".joke", "Véletlenszerű vicc az adatbázisból (bővítés alatt)")
.addField(".covid", "Covid információk a világra és országunkra vonatkozóan.")
.addField(".coin", "Egy pénz véletlen feldobása.")
.addField(".kor", "Átlagéletkor lekérése név alapján.")

const pg2 = new Discord.MessageEmbed()
.setTitle("Command List.")
.setDescription("Parancsok listája. Prefixum: .")
.setAuthor(`${name}`)
.addField(".meme", "Egy Véletlenszerű Reddit mém lekérése.")
.addField(".weather", "Budapesti időjárás lekérése")
.addField(".weatherd <hely>", "Időjárás <hely>-re vonatkozóan.")
.addField(".rss", "A telex.hu híroldal RSS-híreinek lekérése.")
.addField(".rssd <page> <url>", "RSS hírek <url> helyről, a <page> oldalról.")
.addField(".ban <member> ", "<member> kitiltása a szerverről. (Csak megfelelő ranggal használható.)")
.addField('.billboard', 'Top 3 zene a Billboard Hot 100-ról.')


const pg3 = new Discord.MessageEmbed()
.setTitle("Command List.")
.setDescription("Parancsok listája. Prefixum: .")
.setAuthor(`${name}`)
.addField(".kick <member> ", "<member> kidobása a szerverről. (Csak megfelelő ranggal használható.)")
.addField(".xp", "Az üzenet küldőjének XP-pontjainak lekérése a bot adatbázisából (1 üzenet, 1 pont)")
.addField(".purge <count> ", "<count> számú üzenet törlése a csatornából. (Csak megfelelő ranggal használható.)")
.addField('.minecraft' , 'Hypixel szerver státusz.')
.addField('.minecraftd <url>' , 'Minecraft szerver státusz <url>-hez.')
.addField('.nevnap', 'Mai névnap lekérése (Magyarország).')
.addField('.arfolyam', 'USD-HUF és EUR-HUF árfolyam lekérése.')
const pages = [
    pg1,
    pg2,
    pg3
];

client.on('message', msg => {
  if (msg.content === '.arfolyam') {
    leveling.AddXp(msg.member.user.id, -1)

async function arfolyam() {
    const data = await currency.getCurrency("eur-huf")

var xValues = ["Most",2.,3.,4.,5.,6.,7.];
var yValues = [data.lastValue,data.transactions.slice(-2)[0].value,data.transactions.slice(-3)[0].value,data.transactions.slice(-4)[0].value,data.transactions.slice(-5)[0].value,data.transactions.slice(-6)[0].value,data.transactions.slice(-7)[0].value];

const img1 = new ChartJsImage();
img1.setConfig ({
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgb(38,128,10)",
      borderColor: "rgb(16,69,0)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 340, max:370}}],
    }
  }

});

    const embed = new Discord.MessageEmbed()
  .setTitle(data.name)
  .setColor('#069ecc')
  .setDescription("Árfolyam.")
  .setAuthor(`${name}`)
  .addField(`Jelenlegi árfolyam:`,`${data.lastValue} HUF`)
  .addField(`Régebbi értékek`,`${data.transactions.slice(-2)[0].value} HUF`)
  .addField(`Régebbi értékek`,`${data.transactions.slice(-3)[0].value} HUF`)
  .setImage(img1.getUrl())
  msg.channel.send(embed)


  const data1 = await currency.getCurrency("usd-huf")

var xValues2 = ["Most",2.,3.,4.,5.,6.,7.];
var yValues2 = [data1.lastValue,data1.transactions.slice(-2)[0].value,data1.transactions.slice(-3)[0].value,data1.transactions.slice(-4)[0].value,data1.transactions.slice(-5)[0].value,data1.transactions.slice(-6)[0].value,data1.transactions.slice(-7)[0].value];

const img2 = new ChartJsImage();
img2.setConfig ({
  type: "line",
  data: {
    labels: xValues2,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgb(38,128,10)",
      borderColor: "rgb(16,69,0)",
      data: yValues2
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 280, max:320}}],
    }
  }
  
});

  const embed1 = new Discord.MessageEmbed()
  .setTitle(data1.name)
  .setColor('#069ecc')
  .setDescription("Árfolyam.")
  .setAuthor(`${name}`)
  .addField(`Jelenlegi árfolyam:`,`${data1.lastValue} HUF`)
  .addField(`Régebbi értékek`,`${data1.transactions.slice(-2)[0].value} HUF`)
  .addField(`Régebbi értékek`,`${data1.transactions.slice(-3)[0].value} HUF`)
  .setImage(img2.getUrl())
  msg.channel.send(embed1)
  }
arfolyam();
}
});

client.on('message', msg => {
  if (msg.content === '.billboard') {
    leveling.AddXp(msg.member.user.id, -1)
  billboardTop100.getChart((err, chart) => {
  if (err) console.log(err);
  const embed = new Discord.MessageEmbed()
  .setTitle('Billboard zenelista')
  .setColor('#fcba03')
  .setDescription("Top 3 a Billboard Top 100-ról.")
  .setAuthor(`${name}`)
  .addField(chart.songs[0].title,chart.songs[0].artist)
  .addField(chart.songs[1].title,chart.songs[1].artist)
  .addField(chart.songs[2].title,chart.songs[2].artist)
  .setImage('https://upload.wikimedia.org/wikipedia/commons/2/2b/Billboard_Hot_100_logo.jpg')
  msg.channel.send(embed)
});
 
}
});


client.on('message', msg => {
  if (msg.content.startsWith('.kor')) {
    leveling.AddXp(msg.member.user.id, -1)
  const name = msg.content.slice(4).trim()
  request(`https://api.agify.io/?name=${name}`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  const embed1 = new Discord.MessageEmbed()
  .setTitle(res.body.name)
  .setColor('#35d0e8')
  .setDescription("Életkor név alapján.")
  .setAuthor(`${name}`)
  .addField(`Név:`,`${res.body.name}`)
  .addField(`Átlagéletkor:`,`${res.body.age} év`)
  .addField(`Ennyi adat alapján:`,`${res.body.count} db`)
  msg.channel.send(embed1)
});

  }
});



client.on('message', msg => {
  if (msg.content === '.help') {
    leveling.AddXp(msg.member.user.id, -1)
  const embedPages = new DiscordPages({ 
    pages: pages, 
    channel: msg.channel, 
});

	embedPages.createPages();
}
});

//Token helye

client.login('No token for you. :-(');


