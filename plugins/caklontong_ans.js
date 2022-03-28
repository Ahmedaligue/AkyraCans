const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*calo/i.test(m.quoted.contentText)) return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    if (!(id in this.caklontong)) return m.reply('Soal Itu Telah Berakhir, Mau Main Lagi\n#caklontong')
    if (['.calo', 'Bantuan', ''].includes(m.text)) return !0
    if (m.quoted.id == this.caklontong[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            db.data.users[m.sender].exp += this.caklontong[id][2]
            await this.sendButton(m.chat, `*Jawaban BENAR⭕*\n🎁Prize +${this.caklontong[id][2]} XP\n${json.deskripsi}`, '❦ʀᴇɴ-ʙᴏᴛ', '𝐌𝐀𝐈𝐍 𝐋𝐀𝐆𝐈🔂', '.caklontong', m)
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Jawaban HAMPIR BENAR*`)
        else m.reply(`*Jawaban SALAH❌*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
