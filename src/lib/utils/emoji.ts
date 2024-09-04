import { type CustomEmoji } from "emoji-picker-react/dist/config/customEmojiConfig";

export function emojiUnified2url(emojiUnified: string): string {
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${emojiUnified}.svg`;
}

export const SPECIAL_EMOJIS = [
  {
    id: "fail-a-class",
    names: ["落単"],
    imgUrl:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUqLcDsoa_vMqHK_IPFR4GoMT9RYnH6gtzw9nqHl2AfJeQI7Bm6vd2LphkvWznofSU0yXGcFCWEmO1owcCDJKqaijH4sDyK6r7gwjHUoqD-lVYxHPO9m6khg559gSY2FVv9qia_dHQPxbQ/s800/school_tani_otosu_boy.png",
  },
  {
    id: "capybara-dancing",
    names: ["ダンスカピバラ"],
    imgUrl: "https://qr.paps.jp/8o3Og",
  },
  {
    id: "capybara-bath",
    names: ["お風呂カピバラ"],
    imgUrl: "https://i.imgur.com/5TaVIlf.gif",
  },
  {
    id: "capybara-bath-2",
    names: ["お風呂カピバラ2"],
    imgUrl: "https://qr.paps.jp/fblo0",
  },
  {
    id: "capybara-munching",
    names: ["むしゃむしゃカピバラ"],
    imgUrl: "https://i.gifer.com/9ZNS.gif",
  },
] as const satisfies CustomEmoji[];
