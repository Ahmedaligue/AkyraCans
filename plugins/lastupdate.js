let handler = async m => m.reply(`
❗Information Update on 20


➕ New Features
➖ Features Removed
☑️ Features Fixed



📑Owner's Message
Updatenya Baru 50%, Soalnya Owner Lagi Banyak Tugas Numpuk, Maaf Ya Kawan² Dan Lanjut Besok Aja Updatenya;-;


➕ #sendkontak
➕ #balas
➕ #bonk @user
➕ #fitnahstatus
➕ #kataanime
➕ #notstonk
➕ #stonk
➕ #paling
➕ #cat
➕ #dog
➕ #memesub
➕ #pikachu
➕ #smule
➕ #sr
➕ #suitpvp
➕ #tutorialrpg


➖ Blank


☑️ #fb
☑️ #igstalk
☑️ #detik
☑️ #kompas
☑️ #tribun
☑️ #liputan6
☑️ #jalantikus
☑️ #quotes
☑️ #ssweb
☑️ #textpro
☑️ #judulanime




「 February 20 」
`.trim()) // Tambah sendiri kalo mau
handler.help = ['last20'] 
handler.tags = ['info'] 
handler.command = /^(last20)$/i

module.exports = handler