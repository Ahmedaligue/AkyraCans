const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*ao/i.test(m.quoted.contentText)) return !0
    this.asahotak = this.asahotak ? this.asahotak : {}
    if (!(id in this.asahotak)) return m.reply('Soal Itu Telah Berakhir, Main Lagi\n#asahotak')
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        if (['.ao', 'Bantu', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.DATABASE.data.users[m.sender].exp += this.asahotak[id][2]
            await this.sendButton(m.chat, `𝗝𝗮𝘄𝗮𝗯𝗮𝗻 𝗕𝗘𝗡𝗔𝗥⭕ \n🎁Hadiah +${this.asahotak[id][2]} XP`, '🎀𝚁𝚒𝚔𝚔𝚊 𝙱𝙾𝚃', 'Main Lagi🔂', '.asahotak', m)
            clearTimeout(this.asahotak[id][3])
            delete this.asahotak[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Jawaban HAMPIR BENAR*`)
        else m.reply(`𝗝𝗮𝘄𝗮𝗯𝗮𝗻 𝗦𝗔𝗟𝗔𝗛❌`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
