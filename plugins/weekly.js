let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn }) => {
    let wm = global.botwm
    let user = global.db.data.users[m.sender]
    let _timers = (604800000 - (new Date - user.lastweekly))
    let timers = clockString(_timers) 
    if (new Date - user.lastweekly > 604800000) {
    let str = `+20000 money 💹\n+3 Legendary crate 🧰\n+50 String 🕸️\n+20 Iron ⛓️\n+10 Gold 🪙`
        conn.send2Button(m.chat, str, wm, '𝐂𝐋𝐀𝐈𝐌', '.claim', '𝐌𝐎𝐍𝐓𝐇𝐋𝐘', '.monthly',m)
        conn.reply(str)
        user.money += 200000
        user.legendary += 30
        user.iron += 20
        user.emas += 10
        user.string += 50
        user.lastweekly= new Date * 1
    } else {
        let buttons = button(`silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi`, user)
        conn.sendMessage(m.chat, buttons, MessageType.buttonsMessage, { quoted: m })
    }
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i
handler.level = 10
handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

let botol = global.botwm
function button(teks, user) {
    const buttons = []
    
    let claim = new Date - user.lastclaim > 86400000
    let monthly = new Date - user.lastmonthly > 2592000000
    let weekly = new Date - user.lastweekly > 604800000
    console.log({claim, monthly, weekly})
    
    if (monthly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/monthly'}, type: 1})
    if (weekly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/weekly'}, type: 1})
    if (claim) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/claim'}, type: 1})
    if (buttons.length == 0) throw teks
    
    const buttonMessage = {
        contentText: teks,
        footerText: `${botol}`,
        buttons: buttons,
        headerType: 1
    }
    
    return buttonMessage
}
