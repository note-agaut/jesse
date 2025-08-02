// Demo post data for DiscoverTab

const usernames = [
  "chef_mila",
  "james_bond",
  "vlog_sam",
  "art_amy",
  "tech_guru",
  "nature_ella",
  "music_mike",
  "travel_tim",
  "book_lisa",
  "movie_max",
  "sports_sue",
  "gamer_gary",
  "fashion_fay",
  "pet_pam",
  "foodie_fred",
  "diy_dan",
  "carla_coder",
  "plant_paul",
  "history_hank",
  "comic_carl",
];

const captions = [
  "Just made the best 5-minute pasta with roasted garlic a...",
  "Exploring the city lights at night 🚶‍♂🌃",
  "Trying out a new recipe today!",
  "Reading a good book in the park.",
  "Weekend getaway to the lake.",
  "Caught in the rain, but loving it.",
  "New art project in progress.",
  "Sunset over the mountains.",
  "Coffee break with friends.",
  "Early morning run by the beach.",
  "Shooting this in Lagos was surreal.",
  "My new favorite playlist!",
  "DIY project success!",
  "Look at this adorable puppy!",
  "Just finished a marathon!",
  "Coding all night long.",
  "My plant collection is growing!",
  "History is fascinating.",
  "Comic books and chill.",
  "Movie night with friends.",
];

const videoUrls = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Change: Every other post is a video
export const discoverPosts = Array.from({ length: 80 }, (_, i) => {
  const isVideo = i % 2 === 0; // <-- Change this line
  const username = usernames[i % usernames.length];
  const caption = captions[i % captions.length];
  const likes = `${getRandomInt(1, 99)}.${getRandomInt(0, 9)}K`;
  if (isVideo) {
    const videoIndex = i % videoUrls.length;
    return {
      id: i + 1,
      type: "video",
      username,
      avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
      video: videoUrls[videoIndex],
      caption,
      likes,
    };
  }
  return {
    id: i + 1,
    type: "image",
    username,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    bgImage: `https://picsum.photos/id/${100 + (i % 30)}/400/600`,
    caption,
    likes,
  };
});
