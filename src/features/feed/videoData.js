const sampleVideos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
];

const videoData = [
  {
    videoUrl: sampleVideos[0],
    avatar: "https://i.pravatar.cc/40?img=1",
    username: "mary_jones",
    time: "2d",
    caption:
      "This is a sample caption for the video. It can be quite long, so let's see how it handles text overflow and expansion.",
    soundtrack: "Pray For Me - The Weeknd",
    soundtrackThumb: "https://i.pravatar.cc/40?img=11",
    likes: "12.3K",
    comments: "347",
  },
  {
    videoUrl: sampleVideos[1],
    avatar: "https://i.pravatar.cc/40?img=2",
    username: "john_doe",
    time: "1d",
    caption: "Exploring the city with friends! #adventure #citylife",
    soundtrack: "Blinding Lights - The Weeknd",
    soundtrackThumb: "https://i.pravatar.cc/40?img=12",
    likes: "8.1K",
    comments: "210",
  },
  ...Array.from({ length: 18 }).map((_, i) => ({
    videoUrl: sampleVideos[i % sampleVideos.length],
    avatar: `https://i.pravatar.cc/40?img=${3 + i}`,
    username: `user_${3 + i}`,
    time: `${3 + i}h`,
    caption: `Sample video #${3 + i} with a unique caption for demo purposes.`,
    soundtrack: `Demo Track #${3 + i}`,
    soundtrackThumb: `https://i.pravatar.cc/40?img=${21 + i}`,
    likes: `${(Math.random() * 10 + 1).toFixed(1)}K`,
    comments: `${Math.floor(Math.random() * 500)}`,
  })),
];

export default videoData;
