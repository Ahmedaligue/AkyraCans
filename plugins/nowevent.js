let handler = async m => m.reply(`
*〘 RAMADHAN EVENT ☪️ 〙*

*🚫 Event Closed*

*📆Tanggal Main Event*
     *20 Maret - Selasa 3 Mei*

*Hari Puncak 31 Maret🌋*
`.trim()) // Tambah sendiri kalo mau
handler.help = ['nowevent'] 
handler.tags = ['rpg'] 
handler.command = /^(nowevent)$/i

module.exports = handler