import { createPastDate } from "./helpers.js";

const storage = {
  keywordData: [
    { id: 1, keyword: "1300" },
    { id: 2, keyword: "7700" },
    { id: 3, keyword: "9100" },
  ],

  historyData: [],

  productData: [
    {
      id: 1,
      name: "1300",
      busStop: ["힐스테이트레이크송도2차(201동)", "힐스테이트레이크송도1차입구","송담초등학교","e편한세상정문","랜드마크시티센트럴더샵"],
      percent: [100,80,60,40,20],
      bookMark: false,

    },
    {
      id: 2,
      name: "1301",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      percent: [100,80,60],
      bookMark:false,
    },
    {
      id: 3,
      name: "1302",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      percent: [100,80,60],
      bookMark:false,
    },
    {
      id: 4,
      name: "1601",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      percent: [100,80,60],
      bookMark:false,
    },
    {
      id: 5,
      name: "7700",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bookMark:false,
    },
    {
      id: 6,
      name: "9100",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bookMark:false,
    },
    {
      id: 7,
      name: "9200",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bookMark:false,
    },
  ],
};

export default storage;
