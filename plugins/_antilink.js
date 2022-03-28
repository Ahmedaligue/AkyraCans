let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
    await conn.sendButton(m.chat, `*LINK GROUP TERDETEKSI BOT📡*${isBotAdmin ? '' : '\n\n*Bot Tidak Bisa Mengeluarkan Member Karen Bot Bukan Admin!!!*'}\n\nKetik *.off antilink* Untuk Mematikan Fitur Ini${opts['restrict'] ? '' : '\nketik #on restrict supaya bisa kick'}`, '❦ʀᴇɴ-ʙᴏᴛ', 'Matikan Antilink', ',0 antilink', m)
    //if (global.opts['restrict']) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
//    }
  }
  return true
}

module.exports = handler
