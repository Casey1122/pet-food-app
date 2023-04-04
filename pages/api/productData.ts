export interface Product {
  id: number;
  category: string;
  type?: string;
  part?: string;
  name_en: string;
  name_tc: string;
  price: number;
  gram: number;
}

export const productData: Product[] = [
  {
    id: 1,
    category: "Freeze-dried",
    name_en: "Freeze Dried Salmons Fillets",
    name_tc: "凍乾三文魚",
    price: 68,
    gram: 40,
  },
  {
    id: 2,
    category: "Freeze-dried",
    name_en: "Freeze Dried Minnows",
    name_tc: "凍乾原條小魚",
    price: 68,
    gram: 40,
  },
  {
    id: 3,
    category: "Freeze-dried",
    name_en: "Freeze Dried Horse Meats",
    name_tc: "凍乾馬肉",
    price: 78,
    gram: 40,
  },
  {
    id: 4,
    category: "Freeze-dried",
    name_en: "Freeze Dried Crocodile Meats",
    name_tc: "凍乾鱷魚肉",
    price: 78,
    gram: 40,
  },
  {
    id: 5,
    category: "Freeze-dried",
    name_en: "Freeze Dried Ostrich Meats",
    name_tc: "凍乾鴕鳥肉",
    price: 78,
    gram: 40,
  },
  {
    id: 6,
    category: "Freeze-dried",
    name_en: "Freeze Dried Venison Jerky",
    name_tc: "凍乾鹿肉",
    price: 78,
    gram: 40,
  },
  {
    id: 7,
    category: "Air-dried",
    type: "fish",
    part: "meat",
    name_en: "Crocodile Jerky",
    name_tc: "鱷魚肉乾",
    price: 108,
    gram: 70,
  },
  {
    id: 8,
    category: "Air-dried",
    type: "venison",
    part: "meat",
    name_en: "Venison Jerky",
    name_tc: "鹿肉",
    price: 78,
    gram: 80,
  },
  {
    id: 9,
    category: "Air-dried",
    type: "kangaroo",
    part: "meat",
    name_en: "Kangaroo Jerky",
    name_tc: "袋鼠肉乾",
    price: 68,
    gram: 80,
  },
  {
    id: 10,
    category: "Air-dried",
    type: "horse",
    part: "meat",
    name_en: "Horse Jerky Dices",
    name_tc: "馬肉粒",
    price: 78,
    gram: 50,
  },
  {
    id: 11,
    category: "Air-dried",
    type: "horse",
    part: "meat",
    name_en: "Horse Jerky",
    name_tc: "馬肉片",
    price: 68,
    gram: 50,
  },
  {
    id: 12,
    category: "Air-dried",
    type: "horse",
    part: "meat",
    name_en: "Horse Jerky & Offal",
    name_tc: "馬肉及內臟片",
    price: 68,
    gram: 50,
  },
  {
    id: 13,
    category: "Air-dried",
    type: "kangaroo",
    part: "tendon",
    name_en: "Venison Tendons",
    name_tc: "鹿筋",
    price: 78,
    gram: 100,
  },
  {
    id: 14,
    category: "Air-dried",
    type: "kangaroo",
    part: "tendon",
    name_en: "Kangaroo Tendons",
    name_tc: "袋鼠筋",
    price: 88,
    gram: 70,
  },
  {
    id: 15,
    category: "Air-dried",
    type: "horse",
    part: "tendon",
    name_en: "Horse Tendons Slice",
    name_tc: "馬筋細切",
    price: 78,
    gram: 50,
  },
  {
    id: 16,
    category: "Air-dried",
    type: "horse",
    part: "tendon",
    name_en: "Horse Neck Tendons",
    name_tc: "馬頸筋",
    price: 78,
    gram: 50,
  },
  {
    id: 17,
    category: "Air-dried",
    type: "horse",
    part: "tendon",
    name_en: "Horse Tendons",
    name_tc: "原條馬筋條",
    price: 78,
    gram: 50,
  },
  {
    id: 18,
    category: "Air-dried",
    type: "horse",
    part: "tendon",
    name_en: "Horse Ears",
    name_tc: "原隻馬耳",
    price: 68,
    gram: 50,
  },
  {
    id: 19,
    category: "Air-dried",
    type: "bull",
    part: "tendon",
    name_en: "Beef Bully Sticks",
    name_tc: "牛根條",
    price: 88,
    gram: 50,
  },
  {
    id: 20,
    category: "Others",
    type: "fish",
    part: "bones",
    name_en: "Shark Cartilage Powder",
    name_tc: "鯊魚軟骨粉",
    price: 108,
    gram: 50,
  },
];
