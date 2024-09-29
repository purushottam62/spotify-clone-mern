import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import { Song } from "./models/song.model.js";
import dotenv from "dotenv";
import { configDotenv } from "dotenv";
dotenv.config({
  path: "../.env",
});

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI, DB_NAME);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST :${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("database connection error", error);
    process.exit(1);
  }
};
connectDB();
let allSongs = [
  {
    songNameOfSongs: "hawayein",
    filePath: "songs/hawayein.mp3",
    coverPath: "images/hawayein.jpg",
    duration: "04:50",
  },
  {
    songNameOfSongs: "baarish ban jana",
    filePath: "songs/baarish ban jaana.mp3",
    coverPath: "images/baarish ban jana.jpg",
    duration: "03:20",
  },
  {
    songNameOfSongs: "paanchi bole",
    filePath: "songs/paanchi bole.mp3",
    coverPath: "images/paanchi bole.jpg",
    duration: "04:19",
  },
  {
    songNameOfSongs: "deewane ham nhi hote",
    filePath: "songs/deewane hum nhi hote.mp3",
    coverPath: "images/deewane ham nhi hote.jpg",
    duration: "03:44",
  },
  {
    songNameOfSongs: "hari sakhi mangal gao ri",
    filePath: "songs/hari sakhi mangal gao ri.mp3",
    coverPath: "images/hari sakhi magal gao ri.jpg",
    duration: "05:42",
  },
  {
    songNameOfSongs: "khairyat",
    filePath: "songs/khairyiat.mp3",
    coverPath: "images/khairyat.jpg",
    duration: "04:40",
  },
  {
    songNameOfSongs: "paisa hai toh",
    filePath: "songs/paisa hai toh.mp3",
    coverPath: "images/paisa hai toh.jpg",
    duration: "03:08",
  },
];
let oldSongs = [
  {
    songNameOfSongs: " aakhir tumhe aana hai",
    filePath: "old_songs/aakhir tumhe aana hai.mp3",
    coverPath: "old_songs_images/aakhir tumhe aana hai.jpeg",
    duration: "04:59",
  },
  {
    songNameOfSongs: " aankhein khuli",
    filePath: "old_songs/aankhein khuli.mp3",
    coverPath: "old_songs_images/mohabattein.jpeg",
    duration: "07:02",
  },
  {
    songNameOfSongs: " are are are",
    filePath: "old_songs/are are are.mp3",
    coverPath: "old_songs_images/are are.jpeg",
    duration: "05:35",
  },
  {
    songNameOfSongs: " bholi si surat",
    filePath: "old_songs/bholi si surat.mp3",
    coverPath: "old_songs_images/are are.jpeg",
    duration: "04:15",
  },
  {
    songNameOfSongs: " bole chudiyan",
    filePath: "old_songs/bole chudiyan.mp3",
    coverPath: "old_songs_images/kabhi khushi kabhi gham.jpeg",
    duration: "06:48",
  },
  {
    songNameOfSongs: " chalte chalte",
    filePath: "old_songs/chalte chalte.mp3",
    coverPath: "old_songs_images/mohabattein.jpeg",
    duration: "07:38",
  },
  {
    songNameOfSongs: " dil to pagal hai",
    filePath: "old_songs/dil to pagal hai.mp3",
    coverPath: "old_songs_images/are are.jpeg",
    duration: "05:36",
  },
  {
    songNameOfSongs: " ek duje ke vaste",
    filePath: "old_songs/ek duje ke vaste.mp3",
    coverPath: "old_songs_images/are are.jpeg",
    duration: "03:26",
  },
  {
    songNameOfSongs: " humko humise chura lo",
    filePath: "old_songs/humko humsie chura lo.mp3",
    coverPath: "old_songs_images/mohabattein.jpeg",
    duration: "07:58",
  },
  {
    songNameOfSongs: " kabhi khushi kabhi gham",
    filePath: "old_songs/kabhi khushi kabhi gham.mp3",
    coverPath: "old_songs_images/kabhi khushi kabhi gham.jpeg",
    duration: "07:52",
  },
  {
    songNameOfSongs: " le gyi ",
    filePath: "old_songs/le gayi.mp3",
    coverPath: "old_songs_images/are are.jpeg",
    duration: "05:41",
  },
  {
    songNameOfSongs: " neele neel ambar par ",
    filePath: "old_songs/neele neele ambar par.mp3",
    coverPath: "old_songs_images/neele neele ambar par.jpeg",
    duration: "05:20",
  },
  {
    songNameOfSongs: " soni soni",
    filePath: "old_songs/soni soni.mp3",
    coverPath: "old_songs_images/mohabattein.jpeg",
    duration: "07:54",
  },
  {
    songNameOfSongs: " suraj hua maddham",
    filePath: "old_songs/suraj hua maddham.mp3",
    coverPath: "old_songs_images/kabhi khushi kabhi gham.jpeg",
    duration: "07:07",
  },
  {
    songNameOfSongs: " yeh ladka hai allah",
    filePath: "old_songs/yeh ladka hai allah.mp3",
    coverPath: "old_songs_images/kabhi khushi kabhi gham.jpeg",
    duration: "05:27",
  },
  {
    songNameOfSongs: " zinda rehti hai mohabattein",
    filePath: "old_songs/zinda rehti hai mohabbatein.mp3",
    coverPath: "old_songs_images/mohabattein.jpeg",
    duration: "02:23",
  },
];
let romanticSongs = [
  {
    songNameOfSongs: "Apna Bana Le",
    filePath: "romantic songs/apna bana le.mp3",
    coverPath: "romantic song images/apna bana le.jpeg",
    duration: "04:00",
  },
  {
    songNameOfSongs: "Bolna Mahi Bolna",
    filePath: "romantic songs/bolna mahi.mp3",
    coverPath: "romantic song images/bolna mahi.jpeg",
    duration: "03:30",
  },
  {
    songNameOfSongs: "Dekha Tenu Pehli Baar",
    filePath: "romantic songs/dekha tenu pehli baar.mp3",
    coverPath: "romantic song images/dekha tenu.jpeg",
    duration: "04:50",
  },
  {
    songNameOfSongs: "Dil Meri Na Sune",
    filePath: "romantic songs/dil meri na sune.mp3",
    coverPath: "romantic song images/genius.jpeg",
    duration: "03:20",
  },
  {
    songNameOfSongs: "Enni Soni",
    filePath: "romantic songs/enni soni.mp3",
    coverPath: "romantic song images/enni soni.jpeg",
    duration: "03:20",
  },
  {
    songNameOfSongs: "Heeriye",
    filePath: "romantic songs/heeriye.mp3",
    coverPath: "romantic song images/heeriye.jpeg",
    duration: "04:19",
  },
  {
    songNameOfSongs: "Kaise hua",
    filePath: "/romantic songs/kaise hua.mp3",
    coverPath: "romantic song images/kabir singh.jpeg",
    duration: "03:44",
  },
  {
    songNameOfSongs: "Maan Meri Jaan",
    filePath: "romantic songs/maan meri jaan.mp3",
    coverPath: "romantic song images/maan meri jaan.jpeg",
    duration: "03:00",
  },
  {
    songNameOfSongs: "Musafir",
    filePath: "romantic songs/musafir.mp3",
    coverPath: "romantic song images/musafir.jpeg",
    duration: "03:30",
  },
  {
    songNameOfSongs: "Saudebaazi",
    filePath: "romantic songs/saudebaazi.mp3",
    coverPath: "romantic song images/saudebaazi.jpeg",
    duration: "04:30",
  },
  {
    songNameOfSongs: "Samjhawan",
    filePath: "romantic songs/samjhaawaan.mp3",
    coverPath: "romantic song images/samjhawaan.jpeg",
    duration: "04:00",
  },
  {
    songNameOfSongs: "Satranga",
    filePath: "romantic songs/satranga.mp3",
    coverPath: "romantic song images/satranga.jpeg",
    duration: "04:30",
  },
  {
    songNameOfSongs: "Soulmate",
    filePath: "romantic songs/soulmate.mp3",
    coverPath: "romantic song images/soulmate.jpeg",
    duration: "03:00",
  },
  {
    songNameOfSongs: "Tera Fitoor",
    filePath: "romantic songs/tera fitoor.mp3",
    coverPath: "romantic song images/genius.jpeg",
    duration: "04:00",
  },
  {
    songNameOfSongs: "Tujhe Kitna Chahne Lage",
    filePath: "romantic songs/tujhe kitna chahne.mp3",
    coverPath: "romantic song images/kabir singh.jpeg",
    duration: "04:50",
  },
  {
    songNameOfSongs: "Ve Haaniya",
    filePath: "romantic songs/ve haaniya.mp3",
    coverPath: "romantic song images/ve haaniya.jpeg",
    duration: "03:30",
  },
  {
    songNameOfSongs: "Raanjhana Ve",
    filePath: "romantic songs/raanjhaan ve.mp3",
    coverPath: "romantic song images/ranhaana ve.jpeg",
    duration: "04:00",
  },
  {
    songNameOfSongs: "Pal Pal Dil Ke Paas",
    filePath: "romantic songs/pal pal dil ke paas.mp3",
    coverPath: "romantic song images/dil ke paas.jpeg",
    duration: "04:50",
  },
  {
    songNameOfSongs: "Photo",
    filePath: "romantic songs/photo.mp3",
    coverPath: "romantic song images/lukka chuppi.jpeg",
    duration: "04:00",
  },
  {
    songNameOfSongs: "Roke Na Roke",
    filePath: "romantic songs/roke na roke.mp3",
    coverPath: "romantic song images/badri ki dulhania.jpeg",
    duration: "03:30",
  },
];
const seedSongs = async () => {
  // Insert songs
  await Song.insertMany(oldSongs);
  await Song.insertMany(romanticSongs);

  console.log("Songs inserted successfully");

  // Disconnect from MongoDB
  mongoose.connection.close();
  console.log("Disconnected from MongoDB");
};

// Run the script
seedSongs();
