let axios = require("axios")

let handler = async(m, { conn, usedPrefix, command }) => {

 axios.get(`https://leyscoders-api.herokuapp.com/api/katailham?apikey=MIMINGANZ`).then((res) => {
   let hasil = `${res.data.result}`

    conn.sendButton(m.chat, hasil, wm, '𝐖𝐎𝐑𝐃 𝐎𝐅 𝐈𝐍𝐒𝐏𝐈𝐑𝐀𝐓𝐈𝐎𝐍', `${usedPrefix + command}`, m)
	})
}
handler.help = ['kata'].map(v => v + 'ilham')
handler.tags = ['quotes']
handler.command = /^(katailham)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler

let wm = global.botwm