// Demo data for suggested accounts, up to 50 entries

import { videosDemoData } from "../features/videos/VideosDemoData";

const baseAccounts = [
  ...videosDemoData.map((v, i) => ({
    username: v.user.handle,
    name: v.user.name,
    avatar: v.user.avatar,
    mutuals: v.mutualComments,
  })),
  {
    username: "jane_doe",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    mutuals: [],
  },
  {
    username: "johnny_tech",
    name: "Johnny Tech",
    avatar: "https://i.pravatar.cc/150?img=2",
    mutuals: ["jane_doe"],
  },
  {
    username: "dev.mary",
    name: "Mary Dev",
    avatar: "https://i.pravatar.cc/150?img=3",
    mutuals: ["mark_z", "alex99", "lucy", "emma", "john", "daniel", "sarah"],
  },
];

// Fill up to 50 accounts with mock data
export const suggestedAccountsData = Array.from({ length: 50 }, (_, i) => {
  if (i < baseAccounts.length) return baseAccounts[i];
  return {
    username: `user${i + 1}`,
    name: `User ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    mutuals:
      i % 3 === 0 ? ["jane_doe"] : i % 5 === 0 ? ["johnny_tech", "emma"] : [],
  };
});
