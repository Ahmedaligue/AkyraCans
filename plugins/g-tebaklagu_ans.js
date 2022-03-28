const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.text)) return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu)) return m.reply('*Sesi Itu Sudah Berakhir*')
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        if (/^.*cek$/i.test(m.text)) return !0
        if (m.text.toLowerCase() == json.judul.toLowerCase()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            await this.sendButton(m.chat, `*Jawaban BENAR⭕*\n🎁Prize +${this.tebaklagu[id][2]} XP`, wm, '𝐌𝐀𝐈𝐍 𝐋𝐀𝐆𝐈🔂', '.tebaklagu', m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) m.reply(`*Jawaban HAMPIR BENAR*`)
        else m.reply(`*Jawaban SALAH❌*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler