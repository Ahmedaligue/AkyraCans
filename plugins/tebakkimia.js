let fetch = require('node-fetch')

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (id in conn.tebakkimia) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkimia[id][0])
        throw false
    }
    let res = await fetch(global.API('http://zekais-api.herokuapp.com', '/tebakunsur'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    if (json.status != 200) throw json
    let caption = `
「 𝗧𝗘𝗕𝗔𝗞 𝗞𝗜𝗠𝗜𝗔 」\n
📑Nama Unsur Dari Lambang *${json.simbol}* Adalah...

⏱️Timeout ${(timeout / 1000).toFixed(2)} Detik
🔎Ketik ${usedPrefix}teki Untuk Bantuan
🎁Prize: ${poin} XP
`.trim()
    conn.tebakkimia[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkimia[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.name}*`, conn.tebakkimia[id][0])
            delete conn.tebakkimia[id]
        }, timeout)
    ]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

module.exports = handler