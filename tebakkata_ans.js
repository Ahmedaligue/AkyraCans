const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teka/i.test(m.quoted.contentText)) return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        if (['.tekaa', '𝐁𝐀𝐍𝐓𝐔𝐀𝐍🔎', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkata[id][2]
            await this.sendButton(m.chat, `*Jawaban BENAR⭕*\n🎁Prize +${this.tebakkata[id][2]} XP`, '❦ʀᴇɴ-ʙᴏᴛ', '𝐌𝐀𝐈𝐍 𝐋𝐀𝐆𝐈🔂', '.tebakkata', m)
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Jawaban HAMPIR BENAR*`)
        else m.reply(`*Jawaban SALAH❌*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
