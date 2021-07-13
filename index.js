
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('TESZTOLDAL \n BOOBINATOR 2 - Discord bot \n Meghívható: https://discord.com/api/oauth2/authorize?client_id=863072664863768606&permissions=8&scope=bot'));
app.listen(port, () => console.log(`A program a következő portszámot kapta:${port}`)); 

//BOT KÓD KEZDÉSE

//Külső függvénykönyvtárak
const parser = require('rss-url-parser')
const rf = require('reddit-image-fetcher')
const covid = require('corona-info');
const weather = require('weather-api-data');
const Discord = require('discord.js');
const client = new Discord.Client();

//Inicializáláskor fut le
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.user.setActivity(".help", {type: "PLAYING"});
    
});



//Mém parancs
client.on('message', msg => {
  if (msg.content === '.meme') {

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
  const RandomHub = require('random-hub').RandomHub;
  const hub = new RandomHub();
  const embed = new Discord.MessageEmbed()
    .setColor('#0d09e3')
    .setTitle("NSFW GIF")
    .setAuthor("Boobinator")
    .setImage(hub.getRandomHub('real'))
    msg.reply(embed)
  }
});

//RSS olvasó parancs (parser után RSS url)
client.on('message', msg => {
  if (msg.content === '.rss') {

async function RSS() {

  const data = await parser('https://telex.hu/rss')
  var feed = data[0]
  const embed = new Discord.MessageEmbed()
    .setColor('#00ffb6')
    .setTitle(feed.title)
    .setAuthor("RSS")
    .addField("Link",feed.link)
    msg.reply(embed)

  var feed1 = data[1]
  const embed1 = new Discord.MessageEmbed()
    .setColor('#00ffb6')
    .setTitle(feed1.title)
    .setAuthor("RSS")
    .addField("Link",feed1.link)
    msg.reply(embed1)

     var feed2 = data[2]
  const embed2 = new Discord.MessageEmbed()
    .setColor('#00ffb6')
    .setTitle(feed2.title)
    .setAuthor("RSS")
    .addField("Link",feed2.link)
    msg.reply(embed2)
};

RSS();
  
  }
});

//Covid adatok parancs
client.on('message', msg => {
  if (msg.content === '.covid') {

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


client.on('message', msg => {
  if (msg.content === '.help') {
const embed = new Discord.MessageEmbed()
.setTitle("Command List")
.setDescription("Parancsok listája. Prefixum: .")
.setAuthor("Boobinator")
.addField(".help", "Ezen útmutató lekérése")
.addField(".porn", "Véletlenszerű NSFW GIF lekérése")
.addField(".joke", "Véletlenszerű vicc az adatbázisból (bővítés alatt)")
.addField(".weather", "Budapesti időjárás lekérése")
.addField(".covid", "Covid információk a világra és országunkra vonatkozóan.")
.addField(".coin", "Egy pénz véletlen feldobása.")
.addField(".meme", "Egy Véletlenszerű Reddit mém lekérése.")
.addField(".rss", "A telex.hu híroldal RSS-híreinek lekérése.")
msg.reply(embed)
  }
});

//Ehhez ne nyúlj hozzá, ha kedves az életed

client.on('message', msg => {
  if (msg.content === '.weather') {

async function getWeather() {
    const data = await weather.loction('Budapest');
    const embed = new Discord.MessageEmbed()
  .setTitle("Budapesti időjárás")
  .setColor('#0c9417')
  .setDescription("with weather-api-data (JS)")
  .setAuthor("Boobinator")
  .addField('Hőmérséklet', data.current.temp_c + 'C°')
  .addField('Idő', data.location.localtime)
    msg.reply(embed)
}
getWeather();
}
});

//Token helye

client.login('ODYzMDcyNjY0ODYzNzY4NjA2.YOhlDg.6Zh6WJFPbZtCtdjPRzCSNs_zubo');


