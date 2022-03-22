let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.sendButton(m.chat, `🔎 Tidak Ada Absen Berlangsung!`, wm , '𝐌𝐔𝐋𝐀𝐈 𝐀𝐁𝐒𝐄𝐍', `${usedPrefix}mulaiabsen`, m)
        throw false
    }

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `├◪ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
💌 Tanggal: ${date}
${conn.absen[id][2]}
╭───[ 𝗔𝗕𝗦𝗘𝗡𝗧 𝗟𝗜𝗦𝗧 ]
├✧ *Total: ${absen.length} ✧*
${list}
╰────···──────`.trim()
    await conn.send2Button(m.chat, caption, wm, '𝐀𝐁𝐒𝐄𝐍', `${usedPrefix}absen`, '𝐇𝐀𝐏𝐔𝐒', `${usedPrefix}hapusabsen`, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i
handler.register = true
module.exports = handler

let wm = global.botwm