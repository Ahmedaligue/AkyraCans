let handler = async (m, { conn, command, text }) => {
  conn.reply(m.chat, `
「 𝗔𝗦𝗞 」

❔Pertanyaan: ${m.text}
❕Jawaban: *${Math.floor(Math.random() * 1000)} ${pickRandom(['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'])} Lagi*...
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['', 'kah'].map(v => 'kapan' + v + ' <pertanyaan>')
handler.tags = ['kerang']
handler.command = /^kapan(kah)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

