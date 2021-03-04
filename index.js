/*
* ⚠️WAJIB DIBACA!!!
* MAU NGAPAIN SU JANGAN MODAL NAMA DOANK!!
* KASIH CREDIT GUA SU, GAK KASIH GA UP SC LAGI!!!
* SCRIPT FROM SHIZUKA BOT
* REMAKE OF ITSMEIKYXSEC404
* SETING²? BUKA AJA DI [ setting.json ]

* Masih Banyak Bug Di Script Ini:(
* Fix Bug? During free time!!!
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require("@adiwajshing/baileys")
const {
	listzodiak,
	aries,
	taurus,
	gemini,
	cancer,
	Leo,
	Virgo,
	Libra,
	Scorpio,
	Sagittarius,
	Capricorn,
	Aquarius,
	Pisces
} = require('./SHIZ/listzodiak')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { color, bgcolor } = require('./lib/color')
const { listmenu } = require('./SHIZ/listmenu')

const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const imgbb = require('imgbb-uploader')
const google = require('google-it')
const get = require('got')
const emojiUnicode = require('emoji-unicode')
const imageToBase64 = require('image-to-base64')
const speed = require('performance-now')
const { removeBackgroundFromImageFile } = require('remove.bg')
const brainly = require('brainly-scraper')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()

const { ZeksApi, TechApi, TobzApi, ItsApi, VthearApi } = JSON.parse(fs.readFileSync('./database/json/apikey.json')) //APIKEY BELI SENDIRI!!
const { prefix, name, instagram, yt, replySet, rdaftar, groupLimit, memberLimit } = JSON.parse(fs.readFileSync('./database/json/setting.json'))
const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
const _limit = JSON.parse(fs.readFileSync('./database/json/limit.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const bucinrandom = JSON.parse(fs.readFileSync('./database/json/bucin.json'))
const adminNumber = JSON.parse(fs.readFileSync('./database/json/admin.json'))
const anime = JSON.parse(fs.readFileSync('./database/json/anime.json'))
const blocked = JSON.parse(fs.readFileSync('./database/json/blocked.json'))
const anlink = JSON.parse(fs.readFileSync('./database/json/antilink.json'))

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:fdl Bot V3\n'//GANTI NAMA LU COK
            + 'ORG:Creator aufa;\n'//GANTI NAMA LU!!
            + 'TEL;type=CELL;type=VOICE;waid=6281281872699:+62 812-8187-2699\n'//GANTI NOMOR LU
            + 'END:VCARD'

limitt = '9996757'

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const itsmeiky = new WAConnection()
	itsmeiky.logger.level = 'warn'
	console.log(banner.string)
	itsmeiky.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('BURUAN SCAN!! FOLLOW IG @ItsmeikyXSec404'))
	})

	fs.existsSync('./Shozuka.json') && itsmeiky.loadAuthInfo('./shozuka.json')
	itsmeiky.on('connecting', () => {
		start('2', 'Shizuka !')
	})
	itsmeiky.on('open', () => {
		success('2', 'Shizuka BOT!')
	})
	await itsmeiky.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Shiz.json', JSON.stringify(itsmeiky.base64EncodedAuthInfo(), null, '\t'))

	itsmeiky.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await itsmeiky.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await itsmeiky.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*\n*intro dong biar semua nya kenal:)*\n\n*MEMBER BARU MAINAN BARU:D*`
				let buff = await getBuffer(ppimg)
				itsmeiky.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await itsmeiky.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Akhirnya beban group berkurang @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				itsmeiky.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'yellow'))
		}
	})

		itsmeiky.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	itsmeiky.on('chat-update', async (shizuka) => {
		try {
			if (!shizuka.hasNewMessage) return
              shizuka = JSON.parse(JSON.stringify(shizuka)).messages[0]
			if (!shizuka.message) return
			if (shizuka.key && shizuka.key.remoteJid == 'status@broadcast') return
			if (shizuka.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(shizuka.message)
			const from = shizuka.key.remoteJid
			const type = Object.keys(shizuka.message)[0]
			const IKYY = ["6281281872699@s.whatsapp.net"]
			const farhan = shizuka.message.conversation
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? shizuka.participant : shizuka.key.remoteJid
			pushname2 = itsmeiky.contacts[nameReq] != undefined ? itsmeiky.contacts[nameReq].vname || itsmeiky.contacts[nameReq].notify : undefined
            
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')

			body = (type === 'conversation' && shizuka.message.conversation.startsWith(prefix)) ? shizuka.message.conversation : (type == 'imageMessage') && shizuka.message.imageMessage.caption.startsWith(prefix) ? shizuka.message.imageMessage.caption : (type == 'videoMessage') && shizuka.message.videoMessage.caption.startsWith(prefix) ? shizuka.message.videoMessage.caption : (type == 'extendedTextMessage') && shizuka.message.extendedTextMessage.text.startsWith(prefix) ? shizuka.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? shizuka.message.conversation : (type === 'extendedTextMessage') ? shizuka.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const Far = args.join(' ')
			const isCmd = body.startsWith(prefix)
		
			

			mess = {
				wait: '*[ WAIT ]* ⏳Sedang Di Proses...',
				success: '*[💯] Sukses...*',
				error: {
					stick: ' *[⚠️]Gagal, Terjadi Kesalahan Pada Saat Mengkonversi Gambar Ke Sticker*',
					Iv: '*[⚠️]Maaf Link Yang Anda Kirim Tidak Valid!!*'
				},
				only: {
					group: '*[⚠️]Maaf Perintah Ini Hanya Dapat Di Gunakan Di Dalam Group!*',
					benned: '*[⚠️]Maaf Nomor Kamu Telah Di Banned Oleh Owner,Hubuni Owner Agar Membuka Banned Anda*',
					ownerG: '*[⚠️]Maaf Perintah Ini Hanya Dapat Di Gunakan Oleh Owner Group!*',
					ownerB: '*[⚠️]Maaf Perintah Ini Hanya Dapat Di Gunakan Oleh Owner Bot!* ',
					premium: '*[⚠️]Maaf Perintah Ini Hanya Dapat Di Gunakan Oleh User Premium!!*',
					userB: `[ ⚠️UNREGISTED⚠]\n\n️Hai Kak *${pushname2}* Kamu Belum Menjadi Teman Shizuka Bot V3 *${name}* \nSilahlan Daftar Dulu Yaa Dengan Cara\n\n Ketik ${prefix}daftar Itsmeiky/17`,
					admin: '*[⚠️]Maaf Perintah Ini Hanya Dapat Di Gunakan Oleh Admin Group!*',
					Badmin: '*[⚠️]Maaf Perintah Ini Hanya Bisa Di Gunakan Ketika Bot Menjadi Admin!*'
				}
			}
			
			ban = [
			
			]
			const ownerNumber = [
			"6285876125581@s.whatsapp.net"//GANTI NOMOR LU
			]
			premium = [
			"6285876125581@s.whatsapp.net","6285876125581@s.whatsapp.net"//GANTI NOMOR YAG MAU DI PREM, GABISA NYIMPEN DI DATABASE!!
			]
			
			const apakahh = [
            'Ya','Tidak','Ga tau','Mungkin','Coba Tnya Owner'
            ]
            const bisakahh = [
            'Bisa','Tidak Bisa','Ga tau','Mungkin','Coba Tnya Owner'
            ]
            const kapankahh = [
            '1 Minggu lagi','1 Bulan lagi','1 Tahun lagi','100 tahun lagi','gatau','2030','1 Jam lagi','1 Menit lagi' 
            ]
            
            const hob =[
            'Memasak','Membantu Atok','Mabar','Nobar','Sosmed an','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','cowly','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri' 
            ]
            const wa =[
            'penyayang','pemurah','Pemarah','Pemaaf','Penurut','Baik','baperan','Baik Hati','penyabar','Uwu','top deh, pokoknya','Suka Membantu' 
            ] 
            var rate = [
            `100%`,`95%`,`90%`,`85%`,`80%`,`75%`,`70%`,`65%`,`60%`,`55%`,`50%`,`45%`,`40%`,`35%`,`30%`,`25%`,`20%`,`15%`,`10%`,`5%`
            ]
            var persengayy = [
            `*4%*\n\n*Tobat Ngegay Gan:v*`,`*9%*\n\n*OTW Tobat Gan:v*`,`*17%*\n\n*Kang Coli*`,`*28%*\n\n*Buset Dah Gay🤦*`,`*34%*\n\n *Korban Tusbol*`,`*48%*\n\n*Kang Hunter Bool:v*`,`*59%*\n\n *Bahaya Ni Orang Gan*`,`*62%*\n\n*Hati" Sama Ni Orang Beneran Dah*`,`*74%*\n\n*Astagfirullah Kabur Gan🏃🌬️*`,`83%\n\n Yaallah Nak🤦`,`97%\n\nAstagfirullah🤦`,`100%\n\nKabur ae Gan Daripada Ditusbol Bool lu🏃`,`29%\n\n amann:v`,`94%\n\n Yaallah🏃`,`75%\n\nHadehh Gay🤦`,`82%\n\nMending Lu Tobat Dah🏃`,`41%\n\nSering Cari Bool Diperempatan`,`39%\n\nSering Tusbol Bool Topan🏃`
            ]
            var persenbucin = [
            `4%\n\nHadehh🤦`,`9%\n\nMasih Kecil Dah Bucin Ae`,`17%\n\nNakk Masih Kecil`,`28%\n\nYoalahh hmm`,`34%\n\nMayan Lah`,`48%\n\nGatau`,`59%\n\nBiasa Kang Bucin`,`62%\n\n Hadehhh🏃`,`74%\n\n bucen Teroosss`,`83%\n\n Sekali" kek Ga bucin Gitu`,`97%\n\nHadehh Pakboi"`,`100%\n\nHadehhh Ini Bukan Bucin Tapi Pakboi`,`29%\n\nKasian Mana Masih Muda`,`94%\n\n Dasar Pakboi`,`75%\n\n Ya Ampun`
            ]

			const botNumber = itsmeiky.user.jid
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? shizuka.participant : shizuka.key.remoteJid
			const groupMetadata = isGroup ? await itsmeiky.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const totalchat = await itsmeiky.chats.all()
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false 
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAnime = isGroup ? anime.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false 
			const isOwner = ownerNumber.includes(sender)
			const antilink = anlink.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender)
			
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				itsmeiky.sendMessage(from, teks, text, {quoted:shizuka})
			}
			const sendMess = (hehe, teks) => {
				itsmeiky.sendMessage(hehe, teks, text)
			}
			const costum = (pesan, tipe, target, target2) => {
			itsmeiky.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? itsmeiky.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : itsmeiky.sendMessage(from, teks.trim(), extendedText, {quoted: shizuka, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			const checkLimit = (sender) => {
                let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            limitCounts = limitt - lmt.limit
                            if (limitCounts <= 0) return itsmeiky.sendMessage(from,`Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, text,{ quoted: shizuka})
                            itsmeiky.sendMessage(from, limits.limitcount(limitCounts), text, { quoted : shizuka})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 1 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
                        itsmeiky.sendMessage(from, limits.limitcount(limitCounts), text, { quoted : shizuka})
                    }
                                }

           const isLimit = (sender) =>{
                      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
                let limits = i.limit
              if (limits >= limitt ) {
                  position = true
                    itsmeiky.sendMessage(from, limits.limitend(pushname2), text, {quoted: shizuka})
                    return true
              } else {
                _limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
                const obj = { id: sender, limit: 1 }
                _limit.push(obj)
                fs.writeFileSync('./database/json/limit.json',JSON.stringify(_limit))
           return false
       }
     }
     const bayarLimit = (sender, amount) => {
                let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
            }
        } 
        
        const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/json/limit.json', JSON.stringify(_limit))
            }
        }
     
     		if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			if (antilink && isGroup && isBotGroupAdmins){
            if (args.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await shizuka.inviteInfo(Farhan);
                if (!check) {
                    return
                } else {
                    reply('*[GROUP LINK DETECTOR!]*\nKamu mengirimkan link grup chat, maaf kamu segera di kick dari grup.').then(() => {
                        itsmeiky.groupRemove()
                    })
                }
            }
         }
			switch(command) {
			
		case 'join':
					if (args.length == 0) return reply(from, `maaf ,bot ini hanya bisa dimasukkan ke grup `, text)
					let linkgrup = `${body.slice(6)}`
					let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
					let chekgrup = await itsmeiky.inviteInfo(linkgrup)
					if (!islink) return reply(from, 'Maaf link group-nya salah! ', id)
					if (isOwnerBot) {
					  await itsmeiky.joinGroupViaLink(linkgrup)
					    .then(async () => {
					      itsmeiky.sendMessage(from, 'Berhasil join grup via link!', text)
					    })
					} else {
					  let cgrup = await itsmeiky.getAllGroups()
					  if (cgrup.length > groupLimit) return itsmeiky.reply(from, `Sorry, the groups is not valid `, id)
					  if (cgrup.size < memberLimit) return itsmeiky.reply(from, `Sorry, Bot wil not join if the group members do not exceed ${memberLimit} people`, id)
					  await itsmeiky.joinGroupViaLink(linkgrup)
					    .then(async () => {
					      reply('Berhasil join grup via link!')
					    })
					    .catch(() => {
					      reply('Gagal!')
					    })
					}
					break 
					
					case 'setreply':
					if (!isOwner) return reply(mess.only.ownerB)
                    itsmeiky.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					replySet = body.slice(10)
					reply(`reply berhasil di ubah menjadi : ${replySet}`)
				break 
				
				case 'grouplist':
				case 'gruplist':
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)
					itsmeiky.updatePresence(from, Presence.composing) 
					teks = `\`\`\`Ini adalah list group ${name} :\n\n\`\`\``
					no = 0
					for (let hehehe of groupId) {
						no += 1
						teks += `\`\`\`[${no.toString()}]\`\`\` @${hehehe.split('@')[0]}\n`
					}
					teks += `\n\`\`\`Total grup : ${groupId.length}\`\`\``
					itsmeiky.sendMessage(from, teks.trim(), extendedText, {quoted: shizuka})
				break 
				case 'botstat': {
            itsmeiky.updatePresence(from, Presence.composing)
            const chatIds = await itsmeiky.getAllChatIds()
            const groups = await itsmeiky.getAllGroups()
            itsmeiky.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
            break
        }
			case 'brainly':
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────────────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────────────────❉\n`
					}
					itsmeiky.sendMessage(from, teks, text, {quoted: shizuka, detectLinks: false})
                        console.log(res)
                    })
                await limitAdd(sender)
				break 
			
		case 'antilink':
					itsmeiky.updatePresence(from, Presence.composing) 
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)   
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('pilih on atau off!!')
					if (args[0] == 'on') {
						if (isSimi) return reply('Mode antilink sudah aktif')
						anlink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(anlink))
						reply(`Sukses mengaktifkan mode antilink`)
					} else if (args[0] == 'off') {
						anlink.splice(from, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(anlink))
						reply('Sukes menonaktifkan mode antilink️')
					} else {
						reply('pilih on atau off kak?')
					}
					break 
			case 'chatlist':
					itsmeiky.updatePresence(from, Presence.composing)
					var chat = await itsmeiky.chats.all()
					teks = 'This is list of chat number :\n'
					for (let all of chat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${chat.length}`
					itsmeiky.sendMessage(from, teks.trim(), extendedText, {quoted: shizuka, contextInfo: {"mentionedJid": chat}})
					break
				case 'totaluser':
					itsmeiky.updatePresence(from, Presence.composing) 
					if (!isUser) return reply(mess.only.userB)
					if (!isOwner) return reply(mess.only.ownerB)    
					teks = `╭────「 *TOTAL USER ${name}* 」\n`
					no = 0
					for (let hehehe of user) {
						no += 1
						teks += `[${no.toString()}] @${hehehe.split('@')[0]}\n`
					}
					teks += `│+ Total Pengguna : ${user.length}\n╰──────*⎿ *${name}* ⏋*────`
					itsmeiky.sendMessage(from, teks.trim(), extendedText, {quoted: shizuka, contextInfo: {"mentionedJid": user}})
					break
			case 'kepo':
			case 'nyw':
			    itsmeiky.updatePresence(from, Presence.composing)
			   if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                 if (args.length < 1) return reply (`Prameter salan\nCommand : ${prefix}daftar nama/umur/asal\n\nContoh : ${prefix}daftar Itsmeiky/17/Indonesia`)
                 reg = `{bodyslice(8)}`
                 jeneng = reg.slipt("/")[0];
                 umure = reg.split("/")[1];
                 asal = reg.split("/")[2];
                 user.push(sender)
                 ppimg = await itsmeiky.getProfilePicture(`${num.split('@')[0]}@c.us.https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`)
                 itsmeiky.sendMessage(from, ppimg, image, { quoted: shizuka, caption: '*Pendaftaran Berhasil*'})
                fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
                 break
		case 'daftar':
					itsmeiky.updatePresence(from, Presence.composing)
					if (isUser) return reply('kamu sudah terdaftar')
					if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply(`Parameter Salah\nCommand : ${prefix}daftar nama/umur\nContoh : ${prefix}daftar Itsmeiky/17`)
					reg = `${body.slice(8)}`
					jeneng = reg.split("/")[0];
					umure = reg.split("/")[1];
						user.push(sender)
			            fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
						await costum(`\`\`\`Pendaftaran berhasil dengan SN: 87Y4NG4N5K4MU8U71QC4ND44NJ9\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Nomor]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Umur]: ${umure} Tahun\`\`\`\n\`\`\`[Asal]: ${asal}\`\`\`\n\`\`\`Untuk menggunakan bot\`\`\`\n\`\`\`silahkan\`\`\`\n\`\`\`kirim ${prefix}help/menu\`\`\`\n\`\`\`\nTotal Pengguna: ${user.length} Orang\`\`\``, text, IKYY, rdaftar)
					break 
					
			/**************MENU*************/
		
			case 'help':
			case 'menu':
			case 'cmd':
			case 'shizuka':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				uptime = process.uptime()
				user.push(sender)
				myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
                var tgl = new Date();
                var day = tgl.getDate()
                  bulan = tgl.getMonth()
                var thisDay = tgl.getDay(),
                thisDay = myDays[thisDay];
                var yy = tgl.getYear()
                var year = (yy < 1000) ? yy + 1900 : yy;
                const tanggal = `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
                setTimeout( () => {
					costum(listmenu(prefix, instagram, yt, name, pushname2, user, limitt), text, IKYY, replySet)
					}, 1500)
					setTimeout( () => {
					/*itsmeiky.sendMessage(from, rules(name, uptime, tanggal, jam, prefix), text, {quoted: shizuka })
					}, 1200)
					setTimeout( () => {*/
					itsmeiky.sendMessage(from, 'Terimakasih sudah menggunakan *Shizuka Bot V3* \n\n*SEBAGAI PENGGANTI DONASI YUK SUPORT*\nFollow instagram https://instagram.com/itsmeikyxsec404', text, {quoted: shizuka})
					}, 0)
    				break
/*********END PISAH MENU***********/
			  case 'donasi':
			  case 'donate':
					itsmeiky.sendMessage(from, donasi(instagram, name), text, {quoted: shizuka})
					break
					case 'info':
					me = itsmeiky.user
					user.push(sender)
					uptime = process.uptime()
					teks = `⟩➢ *Nama Bot* : ${me.name}\n⟩➢ *Nomer Bot* : @${me.jid.split('@')[0]}\n⟩➢ *prefix* : | ${prefix} |\n⟩➢ *Total Block* : ${blocked.length}\n⟩➢ *Aktif Sejak* : ${kyun(uptime)}\n\n⟩➢ Total Pengguna: *${user.length}* User\n⟩➢ *Instagram* : https://www.instagram.com/itsmeikyxsec404\n⟩➢ *Special Thanks To* :\n⟩➢ Allah SWT \n⟩➢ Arga\n⟩➢ MahankBarBar\n⟩➢ WEM\n⟩➢ Bryan Rafly\n⟩➢ DuingZ\n⟩➢ Anang\n⟩➢ Benny Hidayat\n⟩➢Penyedia apikey\n⟩➢MyBot Team\n⟩➢User Bot`
					buffer = await getBuffer(me.imgUrl)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
			  case 'profile':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)    
					me = itsmeiky.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Anuther* : *ItsmeikyXSec404*\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Public:* OFF`
					buffer111 = await getBuffer(me.imgUrl)
					itsmeiky.sendMessage(from, buffer111, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'List Block :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					itsmeiky.sendMessage(from, teks.trim(), extendedText, {quoted: shizuka, contextInfo: {"mentionedJid": blocked}})
					break 
				case 'banlist':
				ben = '```List Banned``` :\n'
					for (let banned of ban) {
						ben += `~> @${banned.split('@')[0]}\n`
					}
					ben += `Total : ${ban.length}`
					itsmeiky.sendMessage(from, ben.trim(), extendedText, {quoted: shizuka, contextInfo: {"mentionedJid": ban}})
					break
				case 'ocr':
					if ((isMedia && !shizuka.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						const media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja gan')
					}
					await limitAdd(sender) 
					break 
				case 'gifstiker':
				case 'stiker':
				case 'sticker':
				case 's':
				case 'stickergif':
				case 'stickergift':
				case 'stikergif':
				case 'stikergift':
						if ((isMedia && !shizuka.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						const media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
						if (isLimit(sender)) return reply(limits.limitend(pushname2))
						reply(mess.wait)
						const ran= getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								itsmeiky.sendMessage(from, buff, sticker, {quoted: shizuka})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && shizuka.message.videoMessage.seconds < 11 || isQuotedVideo && shizuka.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						const media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
						const ran= getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`\`\`\`Gagal, pada saat mengkonversi ${tipe} ke stiker\`\`\``)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								itsmeiky.sendMessage(from, buff, sticker, {quoted: shizuka})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						const media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								itsmeiky.sendMessage(from, buff, sticker, {quoted: shizuka})
							})
						})
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim\nUntuk Membuat Sticker Gif Pastikan Durasi Tidak Lebih Dari 10 Detik!`)
					}
					await limitAdd(sender) 
					break 
					
				case 'img2url':
           if (!isUser) return reply(mess.only.userB)
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
					reply(mess.wait)
             var imgbb = require('imgbb-uploader')
            var encmedia  = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
            var media = await  itsmeiky.downloadAndSaveMediaMessage(encmedia)
            
            imgbb('727e7e43f6cda1dfb85d888522fd4ce1', media)
                .then(data => {
                    var caps = `「 *IMAGE TO URL* 」\n\n*╠➥  ID :* ${data.id}\n*╠➥  MimeType :* ${data.image.mime}\n*╠➥  Extension :* ${data.image.extension}\n\n*╠➥  URL :* ${data.display_url}`
                    ibb = fs.readFileSync(media)
                     itsmeiky.sendMessage(from, ibb, image, { quoted: shizuka, caption: caps })
                })
                .catch(err => {
                    throw err
                })
            await limitAdd(sender) 	
            break  

				          	case 'trigger':
				          	case 'tg':
                                        if (!isUser) return reply(mess.only.daftarB)
                                        var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !shizuka.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
                                         reply(mess.wait)
                                         owgi = await  itsmeiky.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
                                        teks = `${anu.display_url}`
                                        ranp = getRandom('.gif')
                                        rano = getRandom('.webp')
                                        anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
                                         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                                if (err) return reply(mess.error.stick)
                                                nobg = fs.readFileSync(rano)
                                                 itsmeiky.sendMessage(from, nobg, sticker, {quoted: shizuka})
                                                fs.unlinkSync(rano)
                                        })
                                    
                                             } else {
                                                 reply('Gunakan foto!')
                                          }
                                             break
                                    case 'chika':
                                    case 'ck':
            await itsmeiky.reply(from, `media sedang dikirim , tunggu sampe10-20 detik`, id)
            fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/chika/main/chika.txt')
            .then(res => res.text())
            .then(body => {
                let chika = body.split('\n')
                let chikax = chika[Math.floor(Math.random() * chika.length)]
                itsmeiky.sendFileFromUrl(from, `https://piyobot.000webhostapp.com/${chikax}.mp4`, 'chika.mp4', 'Nih Bang', id)
                .then(() => console.log('Success sending Video'))
                limitAdd(serial)
            })
            .catch(() => {
                itsmeiky.reply(from, 'Ada yang Error!', id)
            })
            break
                                    case 'wasted':
                                        if (!isUser) return reply(mess.only.userB)
                                        if (isBanned) return reply(mess.only.benned)
                                        if (isLimit(sender)) return reply(limits.limitend(pushname2))
                                        var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !shizuka.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
                                         reply(mess.wait)
                                         owgi = await  itsmeiky.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
                                        teks = `${anu.display_url}`
                                        ranp = getRandom('.png')
                                        rano = getRandom('.webp')
                                        anu1 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
                                         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                                fs.unlinkSync(ranp)
                                                if (err) return reply(mess.error.stick)
                                                nobg = fs.readFileSync(rano)
                                                 itsmeiky.sendMessage(from, nobg, sticker, {quoted: shizuka})
                                                fs.unlinkSync(rano)
                                        })
                                    
                                             } else {
                                                 reply('Gunakan foto!')
                                          }
                                          await limitAdd(sender) 
                                          break  
                        
                 case 'kalkulator':
					if (isBanned) return reply(mess.only.benned)    
				   if (!isUser) return reply(mess.only.userB)
				   if (isLimit(sender)) return reply(limits.limitend(pushname2))
				     if (args.length < 1) return reply(`[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
				    mtk = `${body.slice(12)}`
				    anu = await fetchJson(`https://api.vhtear.com/calculator?value=${mtk}&apikey=${VthearApi}`, {method: 'get'})
				    itsmeiky.sendMessage(from, `*${anu.result.data}*`, text, {quoted: shizuka})
				    await limitAdd(sender) 	
				    break 
				case 'creator':
			    case 'owner':
			    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
                     itsmeiky.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: shizuka})
                     itsmeiky.sendMessage(from, 'kenalin ya itu owner ku! jangan kau ApaApa-in Owner Ku >_-',MessageType.text, { quoted: shizuka} )
                     tod = await getBuffer(`https://i.ibb.co/pJC6CnW/IMG-20200901-WA0037.jpg`)
                     itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '*Halo Sob! Gw Ownernya Kalau Mau Tanya Tanya Chat Aja Ya Sob!, Salam kenal 🤗*'})
                     break
                 case 'fitnah':
                 if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB) 
				if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
				var gh = body.slice(8)
				mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					itsmeiky.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break

				case 'infogc':
				case 'groupinfo':
				case 'infogrup':
				case 'grupinfo':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                itsmeiky.updatePresence(from, Presence.composing)
                if (!isGroup) return reply(mess.only.group)
                ppUrl = await itsmeiky.getProfilePicture(from)
                reply(mess.wait) // leave empty to get your own
			    buffer = await getBuffer(ppUrl)
		        itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`})
                break
				case 'trendtwit':
					itsmeiky.updatePresence(from, Presence.composing) 
                     if (!isUser) return reply(mess.only.daftarB)
                     if (isLimit(sender)) return reply(limits.limitend(pushname2))
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					reply(mess.wait)
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break 
				case 'testime':
					setTimeout( () => {
					itsmeiky.sendMessage(from, 'Waktu habis:v', text, {quoted: shizuka}) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '5 Detik lagi', text, {quoted: shizuka}) // ur cods
					}, 5000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '10 Detik lagi', text, {quoted: shizuka}) // ur cods
					}, 0) // 1000 = 1s,
					break 
				case 'animecry':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry?apikey=${TobzApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply (mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, buffer, sticker, {quoted: shizuka})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'neonime':
					itsmeiky.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
                    if (!isUser) return reply(mess.only.userB)
                    if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    if (isBanned) return reply(mess.only.benned)
                    if (!isGroup) return reply(mess.only.group)
                    reply(mess.wait)
					teks = '################\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break   
				case 'wink':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://api.i-tech.id/tools/wink?key=${TechApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply (mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, buffer, sticker, {quoted: shizuka})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'imoji':
					if (args.length < 1) return reply('emojinya mana gan?')
                    if (!isUser) return reply(mess.only.userB)
                    if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = emojiUnicode(Far).trim()
					anu = await fetchJson(`https://lolhuman.herokuapp.com/api/smoji?emoji=${teks}&apikey=WEMPYGANSS`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, buffer, sticker)
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
					
					case 'animehug':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hug?apikey=${TobzApi}`, {method: 'get'})
                   if (!isUser) return reply(mess.only.userB)
                   if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   if (isBanned) return reply(mess.only.benned)
                   if (!isGroup) return reply(mess.only.group)
					if (anu.error) return reply(anu.error)
					reply(mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, buffer, sticker, {quoted: shizuka})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				case 'gruplink':
				case 'grouplink':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await itsmeiky.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    itsmeiky.sendMessage(from, yeh, text, {quoted: shizuka})
			        break
				case 'hidetag':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var value = body.slice(9)
					var group = await itsmeiky.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: shizuka
					}
					itsmeiky.sendMessage(from, options, text)
					break
					case 'hidetag50':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply(mess.only.premium)
					var value = body.slice(10)
					var group = await itsmeiky.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: shizuka
					}
					itsmeiky.sendMessage(from, options, text)
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	.then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                 .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
	                .then(() => {itsmeiky.sendMessage(from, options, text)})
					break
				case 'gantengcek':
				case 'cekganteng':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					ganteng = body.slice(12)
					const gan =['10%','30%','20%','40%','50%','60%','70%','62%','74%','83%','97%','100%','29%','94%','75%','82%','41%','39%']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : Cek Ganteng Bang *'+ganteng+'*\n\nJawaban : '+ teng +'', text, { quoted: shizuka })
					break
				case 'cantikcek':
				case 'cekcantik':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					cantik = body.slice(11)
					if (args.length < 1) return reply('Yg Mau dicek Siapa Kak??')
					const can =['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya Kaka👍','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai Cantik🐊','70% Hai Ukhty🐊','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum Ukhty🐊','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
					const tik = can[Math.floor(Math.random() * can.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : Cantik Cek Kakak *'+cantik+'*\n\nPersen Kecantikan : '+ tik +'', text, { quoted: shizuka })
					break
				case 'ban':
					itsmeiky.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
			    	if (!isPrem) return reply(mess.only.premium)	
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
			        ban = mentioned
					reply(`berhasil banned : ${ban}`)
					break
                case 'addpremium':
					if (isBanned) return reply(mess.only.benned)    
					itsmeiky.updatePresence(from, Presence.composing) 
 
					if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					premium = args[0]
					reply(`Perintah Diterima menambah User Premium : ${premium}`)
					break
					break
				case 'removeprem':
				case 'dellprem':
					if (!isOwner) return reply(mess.only.ownerB)
					rprem = body.slice(13)
					premium.splice(`${rprem}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/json/premium.json', JSON.stringify(premium))
					reply(`Berhasil Remove wa.me/${rprem} Dari User Premium`)
					break
				case 'unban':
					if (!isOwner)return reply(mess.only.ownerB)
				    if (!isPrem) return reply(mess.only.premium)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/json/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah di unban!`)
					break
				case 'block':
				 itsmeiky.updatePresence(from, Presence.composing) 
				 itsmeiky.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					itsmeiky.blockUser (`${body.slice(7)}@c.us`, "add")
					itsmeiky.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
				case 'unblock':
                    if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    itsmeiky.blockUser (`${body.slice(9)}@c.us`, "remove")
					itsmeiky.sendMessage(from, `perintah Diterima, membuka blokir ${body.slice(9)}@c.us`, text)
				    break
				    
				  case 'ownergrup':
				  case 'ownergroup':
               itsmeiky.updatePresence(from, Presence.composing) 
              options = {
          text: `Owner Group ini adalah : wa.me/${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           itsmeiky.sendMessage(from, options, text, { quoted: shizuka } )
				break
				case 'leave': 
				    if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
			    	anu = await itsmeiky.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
	                break
	            case 'getses':
                    if (!isOwner) return itsmeiky.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const sesPic = await itsmeiky.getSnapshot()
                    itsmeiky.sendFile(from, sesPic, 'session.jpg', 'Neh...', id)
                    break
				case 'setname':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                itsmeiky.groupUpdateSubject(from, `${body.slice(9)}`)
                itsmeiky.sendMessage(from, `\`\`\`✓Sukses Mengganti Nama Group Menjadi\`\`\` *${body.slice(9)}*`, text, {quoted: shizuka})
                break
                case 'setdesc':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                itsmeiky.groupUpdateDescription(from, `${body.slice(9)}`)
                itsmeiky.sendMessage(from, `\`\`\`✓Sukses Mengganti Deskripsi Group\`\`\` *${groupMetadata.subject}* Menjadi: *${body.slice(9)}*`, text, {quoted: shizuka})
                break
				case 'tts':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return itsmeiky.sendMessage(from, 'Kode bahasanya mana gan?\n Kalo Gatau Kode Bahasanya Apa Aja Ketik Saja *${prefix}bahasa*', text, {quoted: shizuka})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return itsmeiky.sendMessage(from, 'Textnya mana gan?', text, {quoted: shizuka})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan gan')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal gan:(')
							reply(mess.wait)
							itsmeiky.sendMessage(from, buff, audio, {quoted: shizuka, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender) 
					break  
				case 'translate':
				case 'translete':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				    if (args.length < 1) return itsmeiky.sendMessage(from, 'Kode Bahasanya???', text, {quoted: shizuka})
				    if (args.length < 2) return itsmeiky.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: shizuka})
				    ts = body.slice(11)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(mess.wait)
				    translate = `Text Asli: *${body.slice(11)}*\n\nHasil: *${anu.text}*`
				    itsmeiky.sendMessage(from, translate, text, {quoted: shizuka})
				   await limitAdd(sender)
				   break 
				case 'ts':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				    if (args.length < 1) return itsmeiky.sendMessage(from, 'Kode Bahasanya???', text, {quoted: shizuka})
				    if (args.length < 2) return itsmeiky.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: shizuka})
				    ts = body.slice(4)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(mess.wait)
				    ts = `Text Asli: *${body.slice(7)}*\n\nHasil: *${anu.text}*`
				    itsmeiky.sendMessage(from, ts, text, {quoted: shizuka})
				   await limitAdd(sender)
				   break 
	            case 'setpp':
	            if (isBanned) return reply(mess.only.benned)    
	            if (!isUser) return reply(mess.only.userB)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await itsmeiky.downloadAndSaveMediaMessage(shizuka)
                    await itsmeiky.updateProfilePicture (from, media)
                    reply(mess.wait)
                    reply(`\`\`\`✓Sukses Mengganti Profil Group\`\`\` *${groupMetadata.subject}*`)
                    break
                case 'apakah':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					apakah = body.slice(1)
					const apa = apakahh
					const kah = apa[Math.floor(Math.random() * apa.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'rate':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					rate = body.slice(1)
					const te = rate[Math.floor(Math.random() * rate.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'', text, { quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'watak':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					watak = body.slice(1)
					const tak = wa[Math.floor(Math.random() * wa.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'hobby':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					hobby = body.slice(1)
					const by = hob[Math.floor(Math.random() * hob.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'bisakah':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					bisakah = body.slice(1)
					const bisa = bisakahh
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'kapankah':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					kapankah = body.slice(1)
					const kapan = kapankahh
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					itsmeiky.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'truth':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?truth&apikey=xptn`, {method: 'get'})
					ttrth = `${anu.Dare}`
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					itsmeiky.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'dare':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?dare&apikey=xptn`, {method: 'get'})
					der = `${anu.Dare}`
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '*Dare*\n\n'+ der })
					await limitAdd(sender) 
					break 
                case 'speed':
                case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp 
                itsmeiky.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, { quoted: shizuka})
                    break
                case 'tagme':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
					var nom = shizuka.participant
					const tag = {
					text: `@${nom.split("@s.whatsapp.net")[0]} Tuh gua tag, kasian gaada yang tag yahahah`,
					contextInfo: { mentionedJid: [nom] }
					}
					itsmeiky.sendMessage(from, tag, text, {quoted: shizuka})
					break
         case 'lirik':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                reply(mess.wait)
					teks = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${teks}`, {method: 'get'})
					reply('Lirik dari lagu '+teks+' adalah :\n\n'+anu.result.lirik)
					await limitAdd(sender) 
					break 

                case 'bugreport':
                case 'report':
                     const bug = body.slice(5)
                      if (pesan.length > 300) return itsmeiky.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: shizuka})
                        var nomor = shizuka.participant
                       teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    itsmeiky.sendMessage(NomerOwner, options, text, {quoted: shizuka})
                    reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
                    break
              case 'request':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                     const pesann = body.slice(8)
                      if (pesan.length > 300) return itsmeiky.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: shizuka})
                        var nomor = shizuka.participant
                       const teks2 = `*[REQUEST]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`

                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    itsmeiky.sendMessage('6289649480997@s.whatsapp.net', options, text, {quoted: shizuka})
                    reply('Request telah di laporkan ke owner BOT, request  yang dapat membebani owner tidak akan ditanggapi.')
                    break
				case 'meme':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: '.......'})
					await limitAdd(sender)
					break 
				case 'memeindo':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					memein = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${ZeksApi}`)
					buffer = await getBuffer(memein.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: '.......'})
					await limitAdd(sender)
					break 
				case 'ssweb':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Urlnya mana gan?')
					teks = `${body.slice(7)}`
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					ssweb = await getBuffer(anu.gambar)
					itsmeiky.sendMessage(from, ssweb, image, {quoted: shizuka})
					await limitAdd(sender)
					break 
				case 'nsfwloli':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://api.shizukaa.xyz/neko?apikey=itsmeiky633`, {method: 'get'})
						buffer = await getBuffer(res.neko)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwblowjob':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://api.shizukaa.xyz/pussy?apikey=itsmeiky633`, {method: 'get'})
						buffer = await getBuffer(res.result)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwneko':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://api.shizukaa.xyz/neko?apikey=itsmeiky633`, {method: 'get'})
						buffer = await getBuffer(res.neko)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'nsfwtrap':
				    try {
				    if (isBanned) return reply(mess.only.benned)    
				    if (!isUser) return reply(mess.only.userB)
				    if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://api.shizukaa.xyz/pussy?apikey=itameiky633`, {method: 'get'})
						buffer = await getBuffer(res.result)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'randomhentai':
				case 'hentai':
				    try {
					if (isBanned) return reply(mess.only.benned)    
			    	if (!isUser) return reply(mess.only.userB)
					if (!isPrem) return reply(mess.only.premium)
						if (!isNsfw) return reply('❌ *NSFW MATI* ❌')
						res = await fetchJson(`https://api.shizukaa.xyz/randomimage?apikey=itsmeiky633`, {method: 'get'})
						bufferxx = await getBuffer(res.result)
						itsmeiky.sendMessage(from, bufferxx, image, {quoted: shizuka, caption: 'hentai teros'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				case 'hilih':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Teksnya mana gan?')
					anu = await fetchJson(`https://api.i-tech.id/tools/hilih?key=${TechApi}&kata=${body.slice(7)}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'chord':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Mau Nyari Chord Lagu Apa??')
					tels = body.slice(7)
					anu = await fetchJson(`https://api.vhtear.com/chordguitar?apikey=${VthearApi}&query=${tels}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
                case 'infogempa':
                                        anu = await fetchJson(`https://api.shizukaa.xyz/infogempa?apikey=itsmeiky633`, {method: 'get'})
                                        if (isBanned) return reply(mess.only.benned)
                                        if (!isUser) return reply(mess.only.userB)
                                        if (anu.error) return reply(anu.error)
                                        hasil = `*Tempat* : ${anu.result}\n*Saran* : ${anu.saran}`
                                        itsmeiky.sendMessage(from, hasil, text, {quoted:shizuka})

                                        break
                case 'kucing':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kucing`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(anu));
					nishizuka =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nishizuka)
					itsmeiky.sendMessage(from, pok, image, { quoted: shizuka , caption: 'meong🐈'})
					await limitAdd(sender) 
					break 


/*
* ====only grup fitur anime====>
*/
              case 'anime':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=${TobzApi}`, {method: 'get'})
					reply(mess.wait)
					pok = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, pok, image, { quoted: shizuka , caption: 'nihhh'})
					await limitAdd(sender) 
					break  
				case 'anishizukaiss':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					anp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=${TobzApi}`, {method: 'get'})
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, buffer, sticker, {quoted: shizuka})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
				case 'naruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Naruto`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					itsmeiky.sendMessage(from, nye, image, { caption: 'naruto!!', quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'minato':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Minato`, {method: 'get'})
					min = JSON.parse(JSON.stringify(anu));
					ato =  min[Math.floor(Math.random() * min.length)];
					nye = await getBuffer(ato)
					itsmeiky.sendMessage(from, nye, image, { caption: 'minato!!', quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'boruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Boruto`, {method: 'get'})
					bor = JSON.parse(JSON.stringify(anu));
					uto =  bor[Math.floor(Math.random() * bor.length)];
					nye = await getBuffer(uto)
					itsmeiky.sendMessage(from, nye, image, { caption: 'boruto!!', quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'hinata':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Hinata`, {method: 'get'})
					hina = JSON.parse(JSON.stringify(anu));
					ta =  hina[Math.floor(Math.random() * hina.length)];
					nye = await getBuffer(ta)
					itsmeiky.sendMessage(from, nye, image, { caption: 'hinata!!', quoted: shizuka })
					await limitAdd(sender)
					break 
				case 'sasuke':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sasuke`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					itsmeiky.sendMessage(from, nye, image, { caption: 'sasuke!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'sakura':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sakura`, {method: 'get'})
					sak = JSON.parse(JSON.stringify(anu));
					kura =  sak[Math.floor(Math.random() * sak.length)];
					nye = await getBuffer(kura)
					itsmeiky.sendMessage(from, nye, image, { caption: 'sakura!!', quoted: shizuka })
					await limitAdd(sender) 
					break 

				case 'kaneki':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kaneki`, {method: 'get'})
					kan = JSON.parse(JSON.stringify(anu));
					eki =  kan[Math.floor(Math.random() * kan.length)];
					nye = await getBuffer(eki)
					itsmeiky.sendMessage(from, nye, image, { caption: 'kaneki!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'toukachan':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+touka`, {method: 'get'})
					tou = JSON.parse(JSON.stringify(anu));
					ka =  tou[Math.floor(Math.random() * tou.length)];
					nye = await getBuffer(ka)
					itsmeiky.sendMessage(from, nye, image, { caption: 'toukachan!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'rize':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+rize`, {method: 'get'})
					ri = JSON.parse(JSON.stringify(anu));
					ze =  ri[Math.floor(Math.random() * ri.length)];
					nye = await getBuffer(ze)
					itsmeiky.sendMessage(from, nye, image, { caption: 'rize chan!!', quoted: shizuka })
					await limitAdd(sender) 	
					break 
				case 'akira':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+akira`, {method: 'get'})
					ak = JSON.parse(JSON.stringify(anu));
					ara =  ak[Math.floor(Math.random() * ak.length)];
					nye = await getBuffer(ara)
					itsmeiky.sendMessage(from, nye, image, { caption: 'akira chan!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'itori':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+itori`, {method: 'get'})
					it = JSON.parse(JSON.stringify(anu));
					ori =  it[Math.floor(Math.random() * it.length)];
					nye = await getBuffer(ori)
					itsmeiky.sendMessage(from, nye, image, { caption: 'itori chan!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'kurumi':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+karumi`, {method: 'get'})
					kur = JSON.parse(JSON.stringify(anu));
					imi =  kur[Math.floor(Math.random() * kur.length)];
					nye = await getBuffer(imi)
					itsmeiky.sendMessage(from, nye, image, { caption: 'kurumi chan!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
				case 'miku':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isAnime) return reply(' *Harus Mengaktifkan Mode Anime* ')
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+miku`, {method: 'get'})
					mi = JSON.parse(JSON.stringify(anu));
					ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					itsmeiky.sendMessage(from, nye, image, { caption: 'miku chan!!', quoted: shizuka })
					await limitAdd(sender) 
					break 
// akhir fitur anime

				case 'anjing':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(anu));
					nishizuka =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nishizuka)
					itsmeiky.sendMessage(from, pok, image, { quoted: shizuka })
					await limitAdd(sender) 
					break 
                case 'resepmasakan':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                reply(mess.wait)
                   anu = await fetchJson(`https://api.vhtear.com/resepmasakan?query=${body.slice(12)}&apikey=${VthearApi}`, {method: 'get'})
                   buff = await getBuffer(anu.result.image)
                   resep = `*${anu.result.title}*\n${anu.result.desc}\n\n*BAHAN² YG DIPERLUKAN*\n${anu.result.bahan}\n\n*CARA MASAKNYA*\n${anu.result.cara}`
                   itsmeiky.sendMessage(from, buff, image, {quoted: shizuka, caption: resep})
                   await limitAdd(sender) 
                   break 
               case 'cersex':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (!isPrem) return reply(mess.only.premium)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                   anu = await fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${VthearApi}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   sex = await getBuffer(anu.result.image)
                   reply (mess.wait)
                   cerita = `• *Judul:* ${anu.result.judul}\n\n${anu.result.cerita}`
                   itsmeiky.sendMessage(from, sex, image, {quoted: shizuka, caption: cerita})
                   await limitAdd(sender) 
                   break    
               case 'pornhub':
			   if (isBanned) return reply(mess.only.benned)    
			   if (!isPrem) return reply(mess.only.premium)
			   if (!isUser) return reply(mess.only.userB)
			   if (isLimit(sender)) return reply(limits.limitend(pushname2))
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(9)
                    anu = await fetchJson(`https://api.arugaz.my.id/api/media/pornhub/search?query=${teks}`, {method: 'get'})
                    teks = `===============\n`
                    for (let bokep of anu.result) {
                    teks += `Title: ${bokep.title}\nAktor: ${bokep.author}\nViewers: *${bokep.views}*\nDurasi: ${bokep.duration}\nLink: ${bokep.link}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break  
			     	
			     case 'xxx':
			   if (isBanned) return reply(mess.only.benned)    
			   if (!isUser) return reply(mess.only.userB)
			   if (!isPrem) return reply(mess.only.premium)
			   if (isLimit(sender)) return reply(limits.limitend(pushname2))
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(5)
                    anu = await fetchJson(`https://api.vhtear.com/xxxsearch?query=${teks}&apikey=${VthearApi}`, {method: 'get'})
                    teks = `===============\n`
                    for (let bokep of anu.result) {
                    teks += `• Title: ${bokep.data.title}\n• Durasi: ${bokep.data.durasi}\n• Link: ${bokep.data.url}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break 

				case 'fb':
				  itsmeiky.updatePresence(from, Presence.composing)
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('www.facebook.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/fbdl?url=${args[0]}&apiKey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					itsmeiky.sendMessage(from, '[ WAIT ] Sedang Diproses\n\nLinknya Only Google Gan Biar Bisa Didownload', text, {quoted: shizuka})
					efbe = `Title: *${anu.title}*\nSize: *${anu.filesize}\nDipublikasikan Pada: *${anu.published}*`
					tefbe = await getBuffer(anu.thumb)
					itsmeiky.sendMessage(from, tefbe, image, {quoted: shizuka, caption: efbe})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: shizuka, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break 
			
			case 'insta':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply(mess.error.lv)
				    anu = await fetchJson(`https://api.i-tech.id/dl/igdl?key=${TechApi}&link=${args[0]}`, {method: 'get'})
				    insta = getBuffer(anu.result.url)
				    reply(mess.wait)
				    itsmeiky.sendMessage(from, insta, {quoted: shizuka})
				    await limitAdd(sender) 
				    break  
				    
				case 'instastory':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				instor = `${body.slice(12)}`
				anu = await fetchJson(`https://api.i-tech.id/dl/story?key=${TechApi}&username=${instor}`, {method: 'get'})
				buff = await getBuffer(anu.result.url)
				itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
				await limitAdd(sender)
				break
			    case 'developer':
                case 'kontakdeveloper':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                itsmeiky.sendMessage(from, developer(prefix), text, { quoted: shizuka })
                tod = await getBuffer(`https://i.ibb.co/pJC6CnW/IMG-20200901-WA0037.jpg`)
                itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '*Jangan lupa follow Instagram Owner Aku🙈 : @itsmeikyxsec404*'})
                break
			case 'hekerbucin':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/bacotanhacker?apikey=${ItsApi}`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break 

			case 'quotedilan':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/bacotandilan?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break
				case 'doraemon':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/quotedoraemon?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break
				case 'katabijakv2':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/quotebijak?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break
				case 'bucin':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/bucin?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break
			case 'quoteilham':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB) 
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://api.shizukaa.xyz/bacotanilham?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break
				case 'ytsearch':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Yang mau di cari apa?')
					reply(mess.wait)
					anu = await fetchJson(`https://api.shizukaa.xyz/ytsearch?apikey=itsmeiky633&q=${body.slice(10)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result.video) {
						teks += `\`\`\`Title\`\`\` : *${i.title}*\n\`\`\`Link\`\`\` : *https://youtu.be/${i.id}*\n\`\`\`Published\`\`\` : *${i.published}*\n\`\`\`Duration\`\`\` : *${i.duration}*\n\`\`\`Viewers: \`\`\`*${i.views}*\n\`\`\`Description:\`\`\` *${i.description}*\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break 
				case 'film':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Mau Cari Film Apa?')
					reply(mess.wait)
				anu = await fetchJson(`https://api.vhtear.com/downloadfilm?judul=${body.slice(6)}&apikey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					film = `• Judul: *${anu.result.judul}*\n• Resolusi: *${anu.result.resolusi}*\n• Link Download: *${anu.result.urlDownload}*\n`
					itsmeiky.sendMessage(from, film, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'tiktok':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('vt')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${args[0]}&apikey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.video)
					itsmeiky.sendMessage(from, buffer, video, {quoted: shizuka})
					await limitAdd(sender)
					break 
				case 'tiktokstalk':
					try {
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
						if (args.length < 1) return itsmeiky.sendMessage(from, 'Usernamenya mana gan?', text, {quoted: shizuka})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					await limitAdd(sender) 
					break  
				case 'wp':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (args.length < 1) return reply('teks nya mana om')
					teksj = body.slice(4)
					reply(mess.wait)
					anwu = await fetchJson(`https://api.vhtear.com/walpaper?query=${teksj}&apikey=${VthearApi}`, {method: 'get'})
					bufferx = await getBuffer(anwu.result.LinkImg)
					itsmeiky.sendMessage(from, bufferx, image, {quoted: shizuka})
					break
//creator
				case 'nulis':
				case 'tulis':
				  itsmeiky.updatePresence(from, Presence.composing)
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (args.length < 1) return reply(`${name} Harus Nulis Apa Kak??`)
			reply(mess.wait)
					tulis = body.slice(7)
				  nama = tulis.split("/")[0];
					kelas = tulis.split("/")[1];
					isi = tulis.split("/")[2];
					nulis = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`, {method: 'get'})
					itsmeiky.sendMessage(from, nulis, image, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'happymod':
                                        toby = body.slice(10)
                                        if (isLimit(sender)) return reply(limits.limitend(pushname2))
                                        if (isBanned) return reply(mess.only.benned)
                                        if (args.length < 1) return reply(`game yang mau di cari apa kak? \nContoh : ${prefix}happymod pubg`)
                                        if (!isUser) return reply(mess.only.userB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${toby}&apikey=BotWeA`, {method: 'get'})
                                        hepi = anu.result[0]
                                        buffer = await getBuffer(hepi.image)
                                        teks = `➣ *HAPPY MOD* \n➣ Title : ${hepi.title} \n➣ Size : ${hepi.size} \n➣ Version : ${hepi.version} \n➣ Root : ${hepi.root} \n➣ Purchase : ${hepi.purchase} \n  ➣ Price : ${hepi.price} \n  ➣ Link : ${hepi.link} \n  â””â”€ â Download : ${hepi.download} `
                                        itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: teks})
                                        break
                                        case 'moddroid':
                                        if (isLimit(sender)) return reply(limits.limitend(pushname2))
                                        if (isBanned) return reply(mess.only.benned)
                                        if (args.length < 1) return reply(`game yang mau di cari apa kak? \nContoh : ${prefix}happymod pubg`)
                                        if (!isUser) return reply(mess.only.userB)
		                             	data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=BotWeA`)
		                            	hepi = data.result[0] 
		                            	teks = `*Nama*: ${data.result[0].title}\n*publisher*: ${hepi.publisher}\n*mod info:* ${hepi.mod_info}\n*size*: ${hepi.size}\n*latest version*: ${hepi.latest_version}\n*genre*: ${hepi.genre}\n*link:* ${hepi.link}\n*download*: ${hepi.download}`
		                            	buff = await getBuffer(hepi.image)
		                            	asu.sendMessage(from, buff, image, {quoted: tod, caption: `${teks}`})
		                            	break
				case 'ttp':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('*Textnya mana om?*')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(5).trim()
					anu = await fetchJson(`https://api.vhtear.com/textmaker?text=${teks}&apiKey=${VthearApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					reply(mess.wait)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						bufferhgf = fs.readFileSync(rano)
						itsmeiky.sendMessage(from, bufferhgf, sticker, {quoted: shizuka})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break  
					
				case 'slide':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('*Textnya mana gan?*')
					teks = `${body.slice(7)}`
					atytyd = await getBuffer(`https://api.vhtear.com/slidingtext?text=${teks}&apikey=${VthearApi}`, {method: 'get'})
					reply(mess.wait)
					itsmeiky.sendMessage(from, atytyd, video, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'cparty':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					part = body.slice(8)
					reply(mess.wait)
					bufferu = await getBuffer(`https://api.vhtear.com/partytext?text=${part}&apikey=${VthearApi}`, {method: 'get'})
					itsmeiky.sendMessage(from, bufferu, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cshadow':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					shad = body.slice(9)
					reply(mess.wait)
					ssha = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/photooxy/shadowtext?text=${shad}`)
					itsmeiky.sendMessage(from, ssha, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cminion':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					minio = body.slice(9)
					reply(mess.wait)
					minn = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/miniontext?text=${minio}`)
					itsmeiky.sendMessage(from, minn, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cneon':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					nneoo = body.slice(7)
					reply(mess.wait)
					nooe = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/neontext?text=${nneoo}`)
					itsmeiky.sendMessage(from, nooe, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cneongreen':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					grre = body.slice(12)
					reply(mess.wait)
					gree = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/greenneontext?text=${grre}`)
					itsmeiky.sendMessage(from, gree, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cneon2':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					duadua = body.slice(8)
					reply(mess.wait)
					duaa = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/neonwithgalaxytext?text=${duadua}`)
					itsmeiky.sendMessage(from, duaa, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'c3d':
					if (args.length < 1) return reply(mess.blank)
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					dimen = body.slice(5)
					reply(mess.wait)
					tigaa = await getBuffer(`https://api-anoncybfakeplayer.herokuapp.com/textpro/3dgradientstext?text=${dimen}`)
					itsmeiky.sendMessage(from, tigaa, image, {caption: 'Nih kak', quoted: shizuka})
					await limitAdd(sender) 
					break 

/*********HACK MENU**********/

                    case 'animesaran':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					
					qute = await getBuffer(`https://i.ibb.co/F7y89KS/images-2021-01-06-T011202-662.jpg`)
					itsmeiky.sendMessage(from, qute, image, { quoted: shizuka, caption: animesaran() })
					break
					case 'darkfb':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, darkfb(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
					case 'fbcheker':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, fbcheker(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
					case 'hackfb':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, hackfb(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
                    case 'bruteforcefb':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, bruteforcefb(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
                    case 'toolsphishing':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, toolsphishing(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
                    case 'socialfishv2':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, socialfishv2(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
                    case 'terkeytermux':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, terkeytermux(prefix), text, { quoted: shizuka })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    itsmeiky.sendMessage(from, tod, image, { quoted: shizuka, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
                    case 'virtex':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					itsmeiky.sendMessage(from, virtex(prefix) , text, { quoted: shizuka })
					break
					case 'sendvir':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					                     
                 itsmeiky.sendMessage(from, sendvir(prefix) , text, { quoted: shizuka })
					break
                    case 'hackingmenu':
                    case 'hackmenu':
                    case 'tools': 
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    itsmeiky.sendMessage(from, hackingmenu(prefix), text, { quoted: shizuka })
                    break

/*********AKHIR HACK MENU**********/

					case 'croman':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                roman = `${body.slice(8)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/romancetext?text=${roman}&apikey=${VthearApi}`, {method: 'get'})
                     itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
                  await limitAdd(sender) 
                  break 
					case 'clove':
					  if (!isUser) return reply(mess.only.userB)
					  if (isBanned) return reply(mess.only.benned)
					  if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					 love = `${body.slice(7)}`
					 buff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${love}&apikey=${VthearApi}`, {method: 'get'})
					 itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
					 await limitAdd(sender)
					 break 
				case 'cmwolf':
					  if (!isUser) return reply(mess.only.userB)
					  if (isBanned) return reply(mess.only.benned)
					  if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					 mwolf = `${body.slice(8)}`
					 anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${mwolf}&apikey=${TobzApi}`, {method: 'get'})
					 cmwolf = await getBuffer(anu.result)
					 itsmeiky.sendMessage(from, cmwolf, image, {quoted: shizuka})
					 await limitAdd(sender)
					 break  
				case 'cml':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					cml = `${body.slice(5)}`
					cml1 = cml.split("/")[0];
					cml2 = cml.split("/")[1];
					buffer = await getBuffer(`https://api.vhtear.com/logoml?hero=${cml1}&text=${cml2}&apikey=${VthearApi}`, {method: 'get'})
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'cpubg':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					cpubg = `${body.slice(7)}`
					cpubg1 = cpubg.split("/")[0];
					cpubg2 = cpubg.split("/")[1];
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${cpubg1}&text2=${cpubg2}&apikey=${TobzApi}`, {method: 'get'})
					cpubg = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, cpubg, image, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'csky':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					sky = `${body.slice(6)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/skytext?text=${sky}&apikey=${ZeksApi}`, {method: 'get'})
					gools7 = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, gools7, image, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cwooden':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					wood = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/woodentext?text=${wood}&apikey=${ZeksApi}`, {method: 'get'})
					gools6 = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, gools6, image, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'ccrossfire':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					cf = `${body.slice(12)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/crosslogo?text=${cf}&apikey=${ZeksApi}`, {method: 'get'})
					gools5 = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, gools5, image, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'cflower':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					flower = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/flowertext?text=${flower}&apikey=${ZeksApi}`, {method: 'get'})
					gools3 = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, gools3, image, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				    case 'listzodiak':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					
					itsmeiky.sendMessage(from, listzodiak(prefix) , text, { quoted: shizuka })
					break
				    case 'zodiak':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
	if (args.length === 0) {
	itsmeiky.sendMessage(from, listzodiak(), text)
	} else if (args.includes('aries')) {
	itsmeiky.sendMessage(from, aries(), text)
	} else if (args.includes('taurus')) {
	itsmeiky.sendMessage(from, taurus(), text)
	} else if (args.includes('gemini')) {
	itsmeiky.sendMessage(from, gemini(), text)
	} else if (args.includes('cancer')) {
	itsmeiky.sendMessage(from, cancer(), text)
	} else if (args.includes('leo')) {
	itsmeiky.sendMessage(from, Leo(), text)
	} else if (args.includes('virgo')) {
	itsmeiky.sendMessage(from, Virgo(), text)
	} else if (args.includes('libra')) {
	itsmeiky.sendMessage(from, Libra(), text)
	} else if (args.includes('scorpio')) {
	itsmeiky.sendMessage(from, Scorpio(), text)
	} else if (args.includes('sagittarius')) {
	itsmeiky.sendMessage(from, Sagittarius(), text)
	} else if (args.includes('capricorn')) {
	itsmeiky.sendMessage(from, Capricorn(), text)
	} else if (args.includes('aquarius')) {
	itsmeiky.sendMessage(from, Aquarius(), text)
	} else if (args.includes('pisces')) {
	itsmeiky.sendMessage(from, Pisces(), text)
	}
	break
				case 'cnaruto':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					naruto = `${body.slice(9)}`
					if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					anu = await fetchJson(`https://api.zeks.xyz/api/naruto?text=${naruto}&apikey=${ZeksApi}`, {method: 'get'})
					gools4 = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, gools4, image, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'tahta':
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (isBanned) return reply(mess.only.benned)
                tahta = `${body.slice(7)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/hartatahta?text=${tahta}&apikey=${VthearApi}`, {method: 'get'})
                     itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
                  await limitAdd(sender) 
                  break  
                 case 'cbpink':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                bpink = `${body.slice(8)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${bpink}&apikey=${VthearApi}`, {method: 'get'})
                     itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
                  await limitAdd(sender)
                  break  
                  case 'cthunder':
                if (!isUser) return reply(mess.only.userB)
                if (isBanned) return reply(mess.only.benned)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                thunder = `${body.slice(10)}`
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buff = await getBuffer(`https://api.vhtear.com/thundertext?text=${thunder}&apikey=${VthearApi}`, {method: 'get'})
                     itsmeiky.sendMessage(from, buff, image, {quoted: shizuka})
                  await limitAdd(sender) 
                  break 

			    case 'quotemaker':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					gh = `${body.slice(12)}`
					quote = gh.split("/")[0];
					wm = gh.split("/")[1];
					bg = gh.split("/")[2];
					const pref = `Usage: \n${prefix}quotemaker teks/watermark/theme\n\nEx :\n${prefix}quotemaker ini contoh/bicit/random`
					if (args.length < 1) return reply(pref)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break   
           case 'waifu':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/waifu?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'randombts':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/randombts?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'randomexo':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/randomexo?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'blackpink':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/blackpink?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'imageislamic':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/wpislamic?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'imagecyberspace':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/wpcyberspace?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'imagegame':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/wpgame?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'loli':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/randomloli?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'imagemountain':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/wpmountain?apikey=tsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
           case 'husbu':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/husbu?apikey=itsmeiky633`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break
				case 'cglitch':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    hm = `${body.slice(8)}`
                    text1 = hm.split("/")[0];
                    text2 = hm.split("/")[1];                    
                    glitch = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${text1}&text2=${text2}&apikey=${VthearApi}`, {method: 'get'})
                    itsmeiky.sendMessage(from, glitch, image, {quoted: shizuka, caption: 'nih gan'})
			     	await limitAdd(sender) 
			     	break 
                case 'cphlogo':
                if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					gh = `${body.slice(9)}`
					gbl1 = gh.split("/")[0];
					gbl2 = gh.split("/")[1];
					if (args.length < 1) return reply('Teksnya mana gan?')
					buffer = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${gbl1}&text2=${gbl2}&apikey=${VthearApi}`, {method: 'get'})
					itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka})
					await limitAdd(sender) 
					break 

//akhir kreator
			    case 'jarak':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    jarak = `${body.slice(7)}`
			    ja = jarak.split("/")[0];
			    rak = jarak.split("/")[1];
			    anu = await fetchJson(`https://api.vhtear.com/distance?from=${ja}&to=${rak}&apikey=${VthearApi}`, {method: 'get'})
			    itsmeiky.sendMessage(from, `${anu.result.data}`, text, {quoted: shizuka})
			    await limitAdd(sender) 
			    break  
			    case 'infoalamat':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://api.vhtear.com/infoalamat?query=${body.slice(12)}&apikey=${VthearApi}`, {method: 'get'})
			        itsmeiky.sendMessage(from, `${anu.result.data}`, text, {quoted: shizuka})
			        await limitAdd(sender) 
			        break 
			    case 'tinyurl':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/tinyurl?url=${body.slice(9)}&apikey=${TobzApi}`)
			        tinyurl = `${anu.result}`
			        reply(tinyurl)
			        await limitAdd(sender) 
			        break 
			    case 'infonomor':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(10)}`)
			        infonomor = `*nomor* \n${anu.nomor} *international* \n${anu.international}`
			        reply(infonomor)
			        await limitAdd(sender) 
			        break 
			   case 'igstalk':
                    if (isBanned) return reply(mess.only.benned)    
   					if (!isUser) return reply(mess.only.userB)
   					if (isLimit(sender)) return reply(limits.limitend(pushname2))
                        anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${body.slice(9)}&apiKey=${VthearApi}`, {method: 'get'})
                     buffer = await getBuffer(anu.Profile_pic)
                     reply(mess.wait)
                     hasil = `「 *INSTAGRAM STALKER* 」\n\n• Link: https://www.instagram.com/${anu.Username}\n• Fullname : ${anu.Name}\n• Following : ${anu.Jumlah_Followers}\n• Followers : ${anu.Jumlah_Following}\n• Jumlah Postingan: ${anu.Jumlah_Post}\n• Bio : ${anu.Biodata}`
                    itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: hasil})
                    await limitAdd(sender) 
                    break 
			    case 'mimpi':
			    if (isBanned) return reply(mess.only.benned)
			        if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (!isUser) return reply(mess.only.userB)
			    reply(mess.wait)
			        anu = await fetchJson(`https://api.shizukaa.xyz/artimimpi?apikey=itsmeiky633&q=belanja`, {method: 'get'})
			        mimpi = `Arti Mimpi *${body.slice(7)}* Adalah:\n${anu.result}`
			        itsmeiky.sendMessage(from, mimpi, text, {quoted: shizuka})
			        await limitAdd(sender) 
			       	break 
				case 'quotes':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/quotes`, {method: 'get'})
					quotes = `Quotes Dari: *${anu.result.by}*\n\n\n*${anu.result.quote}*`
					itsmeiky.sendMessage(from, quotes, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'fakta':
				if (isBanned) return reply(mess.only.benned)   
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
					anu = await fetchJson(`https://api.shizukaa.xyz/fakta?apikey=itsmeiky633`, {method: 'get'})
					fakta = `Faktanya: *${anu.result}*`
					itsmeiky.sendMessage(from, fakta, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'katabijak':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.shizukaa.xyz/bijak?apikey=itsmeiky633`, {method: 'get'})
					katabijak = `Kata Bijak: *${anu.result}*`
					itsmeiky.sendMessage(from, katabijak, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 

			case 'profiltiktok':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(14)}`)
			        tiktok = await getBuffer(anu.result)
              itsmeiky.sendMessage(from, tiktok, image, {quoted: shizuka})
			        await limitAdd(sender) 
			        break 
		    case 'darkjokes':
				itsmeiky.updatePresence(from, Presence.composing) 
				 if (isBanned) return reply(mess.only.benned)    
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait)
				 data = fs.readFileSync('./BRYAN/drak.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 darkjokes = await getBuffer(randKey.result)
                 itsmeiky.sendMessage(from, darkjokes, image, {quoted: shizuka, caption: '\`\`\`NIH BANG\`\`\`'})
				await limitAdd(sender) 
				break  
	   case 'coli':
				itsmeiky.updatePresence(from, Presence.composing) 
				 if (isBanned) return reply(mess.only.benned)    
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait)
				 data = fs.readFileSync('./BRYAN/bokep.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 bokep = await getBuffer(randKey.result)
                 itsmeiky.sendMessage(from, bokep, image, {quoted: shizuka, caption: '\`\`\`NGEBOKEP TROS\`\`\`'})
				await limitAdd(sender) 
				break  
			case 'katailham':
				 if (isBanned) return reply(mess.only.benned) 
				 if (isLimit(sender)) return reply(limits.limitend(pushname2))				    
				if (!isUser) return reply(mess.only.userB)
				anu = await fetchJson(`https://api.shizukaa.xyz/bacotanilham?apikey=${ItsApi}`, {method: 'get'})
				kata = anu.result
				itsmeiky.sendMessage(from, kata, text, {quoted: shizuka})
				await limitAdd(sender)
				break 
				
			case 'katacinta':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {method: 'get'})
				katacin = `*${anu.result}*`
				itsmeiky.sendMessage(from, katacin, text, {quoted: shizuka})
				await limitAdd(sender) 
				break  
				
			case 'pasangan':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				pa = `${body.slice(10)}`
				sa = pa.split("/")[0];
				ngan = pa.split("/")[1];
				anu = await fetchJson(`https://api.vhtear.com/primbonjodoh?nama=${sa}&pasangan=${ngan}&apikey=${VthearApi}`, {method: 'get'})
				itsmeiky.sendMessage(from, `${anu.result.hasil}`, {quoted: shizuka})
			await limitAdd(sender) 
			break 

			case 'persengay':
			case 'gaypersen':
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('tag temanmu!')
				rate = body.slice(11)
				const kl = persengayy[Math.floor(Math.random() * persengayy.length)]
				itsmeiky.sendMessage(from, 'Persen Gay: *'+rate+'*\n\nJawaban : '+kl+'', text, { quoted: shizuka })
				await limitAdd(sender) 
				break  

			case 'pbucin':
			case 'persenbucin':
			case 'bucinpersen':
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				if (args.length < 1) return reply('Mana Nama?')
				rate = body.slice(8)
				const pbucin = persenbucin[Math.floor(Math.random() * persenbucin.length)]
				itsmeiky.sendMessage(from, 'Persen Bucin Kak: *'+rate+'*\n\nJawaban : '+ pbucin +'', text, { quoted: shizuka })
				await limitAdd(sender) 
				break 
		    case 'map':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
                anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                buffer = await getBuffer(anu.gambar)
                itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: `${body.slice(5)}`})
				await limitAdd(sender) 
				break 
				case 'url2img':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Tipenya apa gan?')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('Urlnya mana gan?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/wallpaper2?tipe=${args[0]}&url=${args[1]}&apiKey=WEMPYGANSS`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					url2img = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, url2img, image, {quoted: shizuka})
					await limitAdd(sender)
					break 
			    case 'tagall':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\nwa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`╔═══✪ Tag By *${pushname2}* ✪══`+ teks +'╚═══〘 Shizuka Bot V3 〙═══', members_id, true)
					break
			    case 'mentionall':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = '\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`╔══〘  *${body.slice(12)}*  〙✪══`+teks+'╚═〘 Shizuka Bot V3 〙', members_id, true)
					break
			    case 'kbbi':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    reply(mess.wait)
					if (args.length < 1) return reply('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					await limitAdd(sender)
					break 
					case 'grup':
					case 'gc':
					case 'group':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`\`\`\`✓Sukses Membuka Group\`\`\` *${groupMetadata.subject}*`)
						itsmeiky.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`\`\`\`✓Sukses Menutup Group\`\`\` *${groupMetadata.subject}*`)
						itsmeiky.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
				case 'say':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://anuz.herokuapp.com/api/bapakfont?kata=${body.slice(6)}`, {method: 'get'})
					reply(anu.result)
					await limitAdd(sender) 
					break 
				case 'artinama':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(6)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					await limitAdd(sender) 
					break 
				case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await itsmeiky.chats.all()
					itsmeiky.setMaxListeners(25)
					for (let _ of anu) {
						itsmeiky.deleteChat(_.jid)
					}
					reply(`\`\`\`Sukses delete all chat Shizuka Bot V3\`\`\``)
					break
                                case 'bcgc':
                    if (!isOwner) return reply("perintah ini hanya dapat di gunakan oleh owner ${name}")
					itsmeiky.updatePresence(from, Presence.composing) 
					if (args.length < 1) return reply('teksnya mana?')
					if (isMedia && !shizuka.message.videoMessage || isQuotedImage) {
				        if (!isGroup) return reply(mess.only.group)
				    	if (!isGroupAdmins) return reply(mess.only.admin)
				    	if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						bcgc = await itsmeiky.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							itsmeiky.sendMessage(_.jid, bcgc, image, {caption: `*「 BROADCAST GROUP BY ${pushname2} 」*\n\n*Group* : ${groupName}\n*Pada Jam* :${jam}\n\n${name}\n\n${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `*「 BROADCAST GROUP BY ${pushname2} 」*\n\n*Group* : ${groupName}\n${name}\n*Pada Jam*: ${jam}WIB\n\n${body.slice(6)}`)
						}
						reply('Suksess broadcast group')
					}
					break
				case 'bc':
					if (!isOwner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await itsmeiky.chats.all()
					if (isMedia && !shizuka.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						bc = await itsmeiky.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							itsmeiky.sendMessage(_.jid, bc, image, {caption: `[ Izin Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ *Shizuka Bot V3 BROADCAST* ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
				case 'add':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add siapa??')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara Gan')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						itsmeiky.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
			    case 'kick':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (shizuka.message.extendedTextMessage === undefined || shizuka.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						itsmeiky.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						itsmeiky.groupRemove(from, mentioned)
					}
					break
				case 'edotense':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (shizuka.message.extendedTextMessage === undefined || shizuka.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, di edotense :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						itsmeiky.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, di edotense : @${mentioned[0].split('@')[0]}`, mentioned, true)
						itsmeiky.groupRemove(from, mentioned)
					}
					break
				case 'promote':
				case 'pm':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (shizuka.message.extendedTextMessage === undefined || shizuka.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, anda menjdi admin :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						itsmeiky.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
						itsmeiky.groupMakeAdmin(from, mentioned)
					}
					break
				case 'delete':
					case 'del':
			 		case 'd':
		    		if (isBanned) return reply(mess.only.benned)    
			    	if (!isUser) return reply(mess.only.userB)
					itsmeiky.deleteMessage(from, { id: shizuka.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
			    case 'demote':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (shizuka.message.extendedTextMessage === undefined || shizuka.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, anda tidak menjadi admin :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						itsmeiky.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, Menurunka : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
						itsmeiky.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'listadmins':
				case 'listadmin':
				case 'adminlist':
				case 'adminslist':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (!isQuotedSticker) return reply(' reply stickernya gan')
					encmedia = JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' Gagal, pada saat mengkonversi sticker ke gambar ')
						buffer = fs.readFileSync(ran)
						itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: 'nihhh'})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break 
				case 'simi':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Textnya mana kak?')
					teks = `{$body.slice(6)}`
					anu = await fetchJson(`https://api.i-tech.id/tools/simi?key=${TechApi}&lang=id&kata=${teks}`, {method: 'get'})
					if (anu.error) return reply('Simi ga tau kak')
					simii = `*${anu.result}`
					itsmeiky.sendMessage(from, simii, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'simih':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./database/json/simi.json', JSON.stringify(samih))
						reply(`\`\`\`Sukses mengaktifkan mode simi di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						samih.splice(from, 1)
						fs.writeFileSync('./database/json/simi.json', JSON.stringify(samih))
						reply(`\`\`\`✓Sukes menonaktifkan mode simi di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
			    case 'nsfw':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isNsfw) return reply('Mode nsfw sudah aktif')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply(`\`\`\`✓Sukses mengaktifkan mode nsfw di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply(`\`\`\`✓Sukes menonaktifkan mode nsfw di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
				case 'modeanime':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isAnime) return reply('Mode anime sudah aktif')
						anime.push(from)
						fs.writeFileSync('./database/json/anime.json', JSON.stringify(anime))
						reply(`\`\`\`✓Sukses mengaktifkan mode anime di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						anime.splice(from, 1)
						fs.writeFileSync('./database/json/anime.json', JSON.stringify(anime))
						reply(`\`\`\`✓Sukes menonaktifkan mode anime di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break
				case 'welcome':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isWelkom) return reply('Udah aktif gan')
						welkom.push(from)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply(`\`\`\`✓Sukses mengaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply(`\`\`\`✓Sukses menonaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On untuk mengaktifkan, Off untuk menonaktifkan')
					}
					break 
				case 'caklontong':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.shizukaa.xyz/caklontong?apikey=itsmeiky633`, {method: 'get'})
					caklontong = `*${anu.pertanyaan}*`
					setTimeout( () => {
					itsmeiky.sendMessage(from, '*➸ Jawaban :* '+anu.jawaban+ '\n\n• Penjelasan: *'+ anu.keterangan+'*', text, {quoted: shizuka}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, caklontong, text, {quoted: shizuka}) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
		         case 'babi':
                    const gshizuka = await itsmeiky.getGroupMembersId(groupId)
                    let gmik = gshizuka[Math.floor(Math.random() * gshizuka.length)]
                    const mmkk = `YANG PALING BABI DISINI ADALAH @${gmik.replace(/@c.us/g, '')}`
                    itsmeiky.sendTextWithMentions(dari, mmkk, id)
                    break
				case 'tebakgambar':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.shizukaa.xyz/tebakgambar?apikey=itsmeiky633`, {method: 'get'})
					bufferkkk = await getBuffer(anu.img_url)
					setTimeout( () => {
					itsmeiky.sendMessage(from, '*➸ Jawaban :* '+anu.jawaban, text, {quoted: shizuka}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: shizuka }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break  
				case 'family100':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.vhtear.com/family100&apikey=${VthearApi}`, {method: 'get'})
					family = `*${anu.result.soal}*`
					setTimeout( () => {
					itsmeiky.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: shizuka}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					itsmeiky.sendMessage(from, family, text, {quoted: shizuka }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
				case 'tafsir':
					if (isBanned) return reply(mess.only.benned)
					if (!isUser) return reply(mess.only.userB)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
					tafsir = `${body.slice(8)}`
					taf = tafsir.split("/")[0];
					sir = tafsir.split("/")[1];
					anu = await fetchJson(`https://api.quran.sutanlab.id/surah/${taf}/${sir}`, {method: 'get'})
					const {ta} = `${anu.data}`
					tafsi = `Tafsir Q.S. ${ta.surah.name.transliteration.id} : ${sir}\n\n${ta.text.arab}\n\n_${ta.text.translation.id}\n\n${ta.tafsir.id.long}`
					itsmeiky.sendMessage(from, tafsi, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'clone':
				if (isBanned) return reply(mess.only.benned)    
				if (!isOwner) return reply(mess.only.OwnerB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (shizuka.message.extendedTextMessage === undefined || shizuka.message.extendedTextMessage === null) return reply('Tag gan')
					mentioned = shizuka.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await itsmeiky.getProfilePicture(id)
						buffer = await getBuffer(pp)
						itsmeiky.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break
				case 'setpref':
				case 'setprefix':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi :「* ${prefix} *」`)
					break
				case 'wait':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if ((isMedia && !shizuka.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo : shizuka
						media = await itsmeiky.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							itsmeiky.sendMessage(from, res.video, video, {quoted: shizuka, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					await limitAdd(sender) 
					break 
					
			case 'quran':
			 if (isBanned) return reply(mess.only.benned)    
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					itsmeiky.sendMessage(from, quran, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
	case 'infocuaca':
	 if (isBanned) return reply(mess.only.benned)    
     if (!isUser) return reply(mess.only.userB)
     if (isLimit(sender)) return reply(limits.limitend(pushname2))
     if (args.length < 1) return reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca Banyuwangi', text)
     reply(mess.wait)
            tempat = `${body.slice(11)}`
            weather = await fetchJson('https://videfikri.com/api/cuaca/?daerah='+ tempat, {method: 'get'})
            if (weather.error) {
             reply(from, weather.error, text)
            } else {
             itsmeiky.sendMessage(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desc}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, text, {quoted: shizuka})
            }
            await limitAdd(sender)
            break 

         case 'pinterest':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply(mess.search)
					pinte = body.slice(11)
					anu = await fetchJson(`https://api.vhtear.com/pinterest?query=${pinte}&apikey=${VthearApi}`, {method: 'get'})
					reply(mess.wait)
					var pin = JSON.parse(JSON.stringify(anu.result));
					var trest =  pin[Math.floor(Math.random() * pin.length)];
					pinehg = await getBuffer(trest)
					itsmeiky.sendMessage(from, pinehg, image, { caption: '*Pinterest*\n\n*Hasil Pencarian : '+pinte+'*', quoted: shizuka })
					break
					
		case 'jadwalsholat':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					if (args.length < 1) return reply('Masukan nama daerah!!')
					sholat = `${body.slice(14)}`
					anu = await fetchJson(`https://api.vhtear.com/jadwalsholat?daerah=${sholat}&apiKey=${VthearApi}`, {method: 'get'})
					reply(mess.wait)
					if (anu.result) return reply(anu.result)
					jsol = `Jadwal sholat di *${sholat}* hari ini adalah\n\n➸ *Subuh :* ${anu.Subuh} WIB\n*➸ Dzuhur :* ${anu.Dzuhur} WIB\n*➸ Ashar :* ${anu.Ashar} WIB\n*➸ Maghrib :* ${anu.Maghrib} WIB\n*➸ Isya :* ${anu.Isya} WIB`
					itsmeiky.sendMessage(from, jsol, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
            case 'jadwaltv':
                if (isBanned) return reply(mess.wait.benned)
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if (args.length < 1)return reply('Nama Channelnya??')
                reply(mess.wait)
                jadwaltv = `${body.slice(10)}`
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltv?ch=${jadwaltv}`, {method: 'get'})
                jtv = `${anu.result}`
                itsmeiky.sendMessage(from, jtv, text, {quoted: shizuka})
                await limitAdd(sender)
               	break  
                
           case 'jadwaltvnow':
                if (isBanned) return reply(mess.wait.benned)
                if (!isUser) return reply(mess.only.userB)
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltvnow`, {method: 'get'})
                tvnow = `Jadwal Tv Sekarang Pada Jam : *${anu.result.jam}* Adalah: \n *${anu.result.jadwalTV}`
                itsmeiky.sendMessage(from, tvnow, text, {quoted: shizuka})
                await limitAdd(sender) 
                break 

// premium user
         case 'joox':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=${TobzApi}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 infomp3 = `「 *JOOX* 」\n\n*• Judul* : ${anu.result.judul}\n*• Album* : ${anu.result.album}\n*• Dipublikasi* : ${anu.result.dipublikasi}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer(anu.result.thumb)
                 reply(mess.wait)
                buff = await getBuffer(anu.result.mp3)
                itsmeiky.sendMessage(from, bufferddd, image, {quoted: shizuka, caption: infomp3})
                itsmeiky.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: shizuka})
                await limitAdd(sender) 
                break  
                
          case 'snack':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPrem) return reply(mess.only.premium)
				if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('sck')) return reply(mess.error.Iv)
                anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/sckdown?url=${args[0]}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 sck = `「 *SNACK VIDEO DOWNLOADER* 」\n\n*• Format:* ${anu.format}\n*• Size:* ${anu.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer('https://raw.githubusercontent.com/FarhanXCode7/termux-bot-wa/main/src/glitchtext.png')
                 reply(mess.wait)
                buff = await getBuffer(anu.result)
                itsmeiky.sendMessage(from, bufferddd, image, {quoted: shizuka, caption: sck})
                itsmeiky.sendMessage(from, buff, video, {mimetype: 'video/mp4', filename: `${anu.format}.mp4`, quoted: shizuka})
                await limitAdd(sender) 
                break  
                
             case 'ytmp4':
    				if (isBanned) return reply(mess.only.benned)    
    				if (!isPrem) return reply(mess.only.premium)
    				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('youtu.be')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://api.shizukaa.xyz/ytmp4?apikey=${ItsApi}&url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					ytt = `「 *YOUTUBE MP4 DOWNLOADER* 」\n\n• Title : *${anu.title}*\n• *Size:* ${anu.filesize}\n• *Deskripsi:* ${anu.desc}\n\n Tunggu Sebentar 1 menit Mungkin Agak Lama Karna Mendownload Video`
					buff = await getBuffer(anu.thumb)
					reply(mess.wait)
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buff, image, {quoted: shizuka, caption: ytt})
					itsmeiky.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: shizuka, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break 

				case 'ytmp3':
					if (isBanned) return reply(mess.only.benned)    
					if (!isPrem) return reply(mess.only.premium)
					if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://api.shizukaa.xyz/ytmp3?apikey=${ItsApi}&url=${args[0]}&apiKey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `「 *YOUTUBE MP3 DOWNLOADER* 」\n\n• Title : *${anu.title}*\n• *Size:* ${anu.filesize}\n*• Deskripsi:* ${anu.desc}\n\n Tunggu Sebentar 1 menit Mungkin Agak Lama Karna Mendownload Video`
					buff = await getBuffer(anu.thumb)
					reply(mess.wait)
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buff, image, {quoted: shizuka, caption: teks})
					itsmeiky.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: shizuka})
					await limitAdd(sender) 
					break 

           case 'playmp3':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                reply(mess.wait)
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `「 *PLAY MP3* 」\n*• Judul:* ${anu.result.title}\n*• Source:* ${anu.result.source}\n*• Ukuran:* ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: infomp3})
                itsmeiky.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: shizuka})
                await limitAdd(sender) 
                break 

         case 'play':   
	            if (isBanned) return reply(mess.only.benned) 
				if (!isUser) return reply(mess.only.userB)
                reply(mess.wait)
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${anu.result.title}\nSource : ${anu.result.source}\nUkuran : ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                itsmeiky.sendMessage(from, buffer, image, {quoted: shizuka, caption: infomp3})
                itsmeiky.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: shizuka})
                await limitAdd(sender)
                break
                
           case 'asupan':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
		     	if (isLimit(sender)) return reply(limits.limitend(pushname2))
                reply(mess.wait)
                anu = await fetchJson(`https://api.shizukaa.xyz/asupan?apikey=itsmeiky633`)
                asup = await getBuffer(anu.result)
                itsmeiky.sendMessage(from, asup, video, {mimetype: 'video/mp4', filename: `asupan_bangsa.mp4`, quoted: shizuka, caption: 'Asupannya Tuan:v'})
                await limitAdd(sender) 
                break 

// Akhir Fitur Premium 

				case 'wiki':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
                    if (args.length < 1) return reply('teks nya mana om?')
                    reply(mess.wait)
                   wiki = `${body.slice(6)}`
                    anu = await fetchJson(`https://api.shizukaa.xyz/wiki?apikey=${ItsApi}&q=${wiki}`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    wikii = `${anu.result}`
                    itsmeiky.sendMessage(from, wikii, text, {quoted: shizuka})
                   await limitAdd(sender) 
                   break  
                   
               case 'pastebin':
                   if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
				paste = `${body.slice(10)}`
                   anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/pastebin?text=${paste}`, {method: 'get'})
                   itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
                   await limitAdd(sender) 				
                   break 
	       case 'smule':
	       if (isBanned) return reply(mess.only.benned)
	       if (!isPrem) return reply(mess.only.premium)
				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('c-ash.smule')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/smule?link=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n\n Tunggu Sebentar 1 menit Mungkun Agak Lama Karna Mendownload Video`
					thumb = await getBuffer(anu.thumb)
					itsmeiky.sendMessage(from, thumb, image, {quoted: shizuka, caption: teks})
					buffer = await getBuffer(anu.result)
					itsmeiky.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: shizuka, caption: 'Nih Gan'})
					await limitAdd(sender) 	
					break  
		case 'bpfont':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			bp = `${body.slice(8)}`
			anu = await fetchJson(`https://api.terhambar.com/bpk?kata=${bp}`, {method: 'get'})
			reply (anu.text)
			await limitAdd(sender) 
			break  
		case 'spamsms':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			sms = `${body.slice(9)}`
			nomer = sms.split("/")[0];
			jumlah = sms.split("/")[1];
			anu = await fetchJson(`https://api.shizukaa.xyz/spamsms?apikey=${ItsApi}&no=${body.slice(10)}&jum=${jumlah}`, {method: 'get'})
			itsmeiky.sendMessage(from, `${anu.logs}`, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
		case 'spamcall':
			if (isBanned) return reply(mess.only.benned)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (!isUser) return reply(mess.only.userB)
			call = `${body.slice(11)}`
			anu = await fetchJson(`https://api.shizukaa.xyz/spamcall?apikey=${ItsApi}&nohp=${call}`, {method: 'get'})
			itsmeiky.sendMessage(from, `${anu.result.logs}`, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
		case 'spamgmail':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			spam = `${body.slice(10)}`
			anu = await fetchJson(`https://videfikri.com/api/spamemail/?email=${spam}&subjek=PT.PLN&pesan=Silahkan%20bayar%20tagihan%20listrik%20Anda`, {method: 'get'})
			itsmeiky.sendMessage(from, `${anu.result.log_lengkap}`, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
		case 'quransurah':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			reply(mess.wait)
			surah = `${body.slice(12)}`
			anu = await fetchJson(`https://api.zeks.xyz/api/quran?no=${surah}&apikey=${ZeksApi}`)
			quran = `Surah Al-Qur\`an Nomer: *${surah}*\nSurah: *${anu.surah}*\nDiturunkan Dikota: *${anu.type}*\nJumlah Ayat: *${anu.jumlah_ayat}*\n\n*${anu.ket}\n=============================\n`
			for (let surah of anu.ayat) {
			quran += `${surah.number}\n${surah.text}\n${surah.translation_id}\n=====================\n`
			}
			reply(quran.trim())
			await limitAdd(sender) 
			break 
		case 'bitly':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			link = `${body.slice(7)}`
			anu = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${link}&apikey=${TobzApi}`, {method: 'get'})
			bitly = `${bitlyy.result}`
			itsmeiky.sendMessage(from, anu, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
			case 'textstyle':
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			reply(mess.wait)
			style = `${body.slice(11)}`
			anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/fancytext?text=${style}`, {method: 'get'})
			reply (anu.result)
			await limitAdd(sender) 
			break  
			case 'pantun':
			if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/pantun`, {method: 'get'})
			itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
			
		case 'jamdunia':
		if (isLimit(sender)) return reply(limits.limitend(pushname2))
			if (isBanned) return reply(mess.only.benned)
			if (!isUser) return reply(mess.only.userB)
			reply(mess.wait)
		 jamdunia = `${body.slice(10)}`
			anu = await fetchJson(`https://api.i-tech.id/tools/jam?key=${TechApi}&kota=${jamdunia}`, {method: 'get'})
			wtime = `*${anu.timezone}*\n*${anu.date}*\n*${anu.time}*`
			itsmeiky.sendMessage(from, wtime, text, {quoted: shizuka})
			await limitAdd(sender) 
			break  
			
		 case 'tomp3':
                if (isBanned) return reply(mess.only.benned)    
                if (isLimit(sender)) return reply(limits.limitend(pushname2))
			    if (isPrem) return reply(mess.only.premium)
				if (!isUser) return reply(mess.only.userB)
                	itsmeiky.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('_*Reply Video nya Gan!*_')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await itsmeiky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
						bufferlkj = fs.readFileSync(ran)
						itsmeiky.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: shizuka})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break 

				case 'setppbot':
					if (!isOwner) return reply(mess.only.owner)
				    itsmeiky.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(shizuka).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await itsmeiky.downloadAndSaveMediaMessage(enmedia)
					await itsmeiky.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya🙂')
					break

          /*******Fitur Defacer*******/

				case 'dorking':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				reply(mess.wait)
				dork = `${body.slice(9)}`
					anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${dork}`, {method: 'get'})
					hasil = `${anu.result}`
					itsmeiky.sendMessage(from, hasil, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'encode64':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encode64 = `${body.slice(10)}`
				anu = await fetchJson(`https://api.i-tech.id/hash/bs64?key=${TechApi}&type=encode&string=${encode64}`, {method: 'get'})
				itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break 
				case 'decode64':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decode64 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs64?key=${TechApi}&type=decode&string=${decode64}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'decode32':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=${TechApi}&type=decode&string=${decode32}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'encode32':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=${TechApi}&type=decode&string=${encode32}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'encbinary':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encbinary = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?encode=${encbinary}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'decbinary':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decbin = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?decode=${decbin}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'encoctal':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				encoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/base64/?decode=${encoc}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender)
					break  
				case 'decoctal':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				decoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/base64/?encode=${decoc}`, {method: 'get'})
					itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
					await limitAdd(sender) 
					break  
				case 'becrypt':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
				becry = `${body.slice(10)}`
				anu = await fetchJson(`https://api.i-tech.id/hash/bcrypt?key=${TechApi}&string=${becry}`, {method: 'get'})
				itsmeiky.sendMessage(from, `${anu.result}`, text, {quoted: shizuka})
				await limitAdd(sender) 
				break 
					case 'hashidentifier':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
					  hash = `${body.slice(16)}`
					  anu = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/hash-identifier?hash=${hash}`)
					  hasilhash = `Tipe: *${anu.hash_type}*\nChar Tipe: *${anu.char_type}*`
					  itsmeiky.sendMessage(from, hasilhash, text, {quoted: shizuka})
					  await limitAdd(sender)
					  break 
// akhir encrypt & decrypt Fitur

			case 'googleimage':
				   itsmeiky.updatePresence(from, Presence.composing) 
 
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)
					if (!isPublic) return reply(mess.only.publikG)
				   if (args.length < 1) return reply('Apa yang mau dicari kak?')
					goo = body.slice(7)
					anu = await fetchJson(`https://api.vhtear.com/googleimg?query=${goo}&apikey=${VthearApi}`, {method: 'get'})
					reply(mess.wait)
				    var pol = JSON.parse(JSON.stringify(anu.result.result_search));
                    var tes2 =  pol[Math.floor(Math.random() * pol.length)];
					pint = await getBuffer(tes2)
					itsmeiky.sendMessage(from, pint, image, { caption: '*Google Image*\n\n*Hasil Pencarian : '+goo+'*', quoted: shizuka })
					break
			case 'google':
                const googleQuery = body.slice(8)
               if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isLimit(sender)) return reply(limits.limitend(pushname2))
                if(googleQuery == undefined || googleQuery == ' ') return reply(`*Hasil Pencarian : ${googleQuery}* tidak ditemukan`)
                google({ 'query': googleQuery }).then(results => {
                let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
                for (let i = 0; i < results.length; i++) {
                    vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                }
                    reply(vars)
                }).catch(e => {
                    console.log(e)
                    itsmeiky.sendMessage(from, 'Google Error : ' + e);
                })
                await limitAdd(sender) 
                break 
                
                case 'addbucin':
                    if (!isOwner) return reply(mess.only.owner)
				    huu = body.slice(10)
						bucinrandom.push(huu)
						fs.writeFileSync('./database/json/bucin.json', JSON.stringify(bucinrandom))
						reply(`Sukses, Kata \n*${huu}*\n Telah Ditambahkan ke database`)
						break
                    case 'quotebucin':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
                    hasil = bucinrandom[Math.floor(Math.random() * (bucinrandom.length))]
                    itsmeiky.sendMessage(from, '"'+hasil+'*', text, {quoted: shizuka})
                    await limitAdd(sender)
                    break

				default:
					if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Maaf Kak *${pushname2}*, Command *${prefix}${command}* Tidak Terdaftar Di Dalam *${prefix}menu!*`)
                  }
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[Shizuka Bot V3]','Yellow'), 'Command Tidak Terdaftar', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'yellow'))
		}
	})
}
starts()


/*
* THANGKS TO :
* Benny Hidayat
* DuingZ
* BRYAN RAFLY
* Naufal
* Tobz
* MAHANKBARBAR
* Mamat
* DAN SELURUH MEMBER MYBOT TEAM!!
*/