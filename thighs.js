let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ')
  if (!args) throw 'Masukkan Parameter'
  m.reply('Sedang Diproses...')
  let res = `https://api.lolhuman.xyz/api/random/nsfw/animethighss?apikey=AryaKey`
  conn.sendFile(m.chat, res, 'thighs.jpg', `wangy wangy wangy`, m, false)
}
handler.help = ['thighs'].map(v => v + ' ')
handler.tags = ['hentai']

handler.command = /^(thighs)$/i

module.exports = handler