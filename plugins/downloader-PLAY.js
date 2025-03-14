import axios from 'axios';

const handler = async (m, { command, args,conn,belz, reply }) => {
  if (!args.length) return m.reply("يرجى إدخال رابط يوتيوب لتحميل الصوت.");
m.reply(wait);

  let url = args[0];
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) return m.reply("يرجى إدخال رابط يوتيوب صالح.");

  try {
    let response = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`);
    let { status, data } = response.data;

    if (!status) return m.reply("فشل التحميل. تأكد من صحة الرابط وحاول مرة أخرى.");

    await conn.sendMessage(m.chat, {
      audio: { url: data.dl },
      mimetype: 'audio/mpeg',
      fileName: `${data.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    m.reply("حدث خطأ أثناء جلب الملف.");
  }
};

handler.command = ['ytmp3'];

export default handler;