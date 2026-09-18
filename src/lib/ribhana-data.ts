import clutch from "@/assets/p-clutch.jpg";
import vase from "@/assets/p-vase.jpg";
import necklace from "@/assets/p-necklace.jpg";
import throwImg from "@/assets/p-throw.jpg";

export const productImages = { clutch, vase, necklace, throw: throwImg };

export type PersonaRow = { id: string; label: string; items: string[] };
export type PersonaStep = {
  slug: string;
  headline: string;
  category: string;
  rows: PersonaRow[];
};

export const personaSteps: PersonaStep[] = [
  {
    slug: "fashion",
    category: "fashion",
    headline: "When I'm dressing the part…",
    rows: [
      {
        id: "everyday",
        label: "Everyday and basics",
        items: ["Zara", "H&M", "LC Waikiki", "Adidas", "Barraserb"],
      },
      {
        id: "occasion",
        label: "Occasion and statement",
        items: ["Mango", "Massimo Dutti", "Nike", "XC Collective"],
      },
      { id: "active", label: "Activewear", items: ["Gymara"] },
      { id: "shoes", label: "Shoes", items: ["Aldo", "Skechers", "Charles & Keith"] },
      {
        id: "jewellery",
        label: "Jewellery and accessories",
        items: [
          "Nazhandbags",
          "Waqtun",
          "Nora Elbatran Jewellery",
          "Topaz Accessories",
        ],
      },
    ],
  },
  {
    slug: "beauty",
    category: "beauty",
    headline: "When I'm treating myself…",
    rows: [
      {
        id: "skincare",
        label: "Skincare and makeup",
        items: [
          "Sephora",
          "The Body Shop",
          "Nivea",
          "Capixy",
          "Sheglam",
          "Torriden",
          "Godly Pride",
        ],
      },
      {
        id: "fragrance",
        label: "Fragrance",
        items: ["Jo Malone", "Bath & Body Works", "Rituals"],
      },
      {
        id: "wellness",
        label: "Wellness and self-care",
        items: ["GNC", "Dove", "Vichy", "Adams for Men", "Evolve Way Supplements"],
      },
    ],
  },
  {
    slug: "artisan",
    category: "artisan",
    headline: "When I want something with a story…",
    rows: [
      {
        id: "home-pieces",
        label: "Handmade home pieces",
        items: ["Pottery", "Woven textiles", "Glasswork"],
      },
      {
        id: "artisan-jewellery",
        label: "Jewellery and accessories",
        items: ["Silver jewellery", "Beaded pieces", "Leather goods"],
      },
      {
        id: "textiles",
        label: "Textiles and embroidery",
        items: ["Hand embroidery", "Natural dyes", "Upcycled fabric"],
      },
    ],
  },
  {
    slug: "home",
    category: "home",
    headline: "When I'm setting the scene at home…",
    rows: [
      {
        id: "furniture",
        label: "Furniture and decor",
        items: ["IKEA", "AMM Home", "The Plant Shop", "Maramzy"],
      },
      {
        id: "kitchen",
        label: "Kitchen and dining",
        items: ["IKEA", "Tefal", "Stonia", "KitchenKey"],
      },
      {
        id: "bedding",
        label: "Bedding and textiles",
        items: ["IKEA", "Cotton linens", "Seggada EG"],
      },
      { id: "books", label: "Books and hobbies", items: ["Hadeerz"] },
    ],
  },
];

export const priorityOptions = [
  "Best deals",
  "Top quality",
  "Ethical and sustainable",
  "Best reviews",
];

export type Product = {
  id: string;
  name: string;
  retailer: string;
  price: number;
  wasPrice?: number;
  rating: number;
  image: string;
  reasoning: string;
};

export const matches: Product[] = [
  {
    id: "clutch",
    name: "Hand-embroidered linen clutch",
    retailer: "Nazhandbags",
    price: 1240,
    wasPrice: 1650,
    rating: 4.8,
    image: clutch,
    reasoning: "Cheapest of 6 sellers carrying it, and the maker is small-batch.",
  },
  {
    id: "necklace",
    name: "Crescent silver pendant",
    retailer: "Nora Elbatran Jewellery",
    price: 890,
    rating: 4.6,
    image: necklace,
    reasoning: "Matches the understated silver pieces you hearted, hallmarked 925.",
  },
  {
    id: "vase",
    name: "Speckled stoneware vase",
    retailer: "Maramzy",
    price: 640,
    wasPrice: 780,
    rating: 4.9,
    image: vase,
    reasoning: "Reviews across 3 sites agree the glaze survives daily use.",
  },
  {
    id: "throw",
    name: "Handwoven cotton throw",
    retailer: "Seggada EG",
    price: 1100,
    rating: 4.5,
    image: throwImg,
    reasoning: "Natural dyes and a workshop that publishes its wages.",
  },
];

export const feed: Product[] = [...matches, ...matches].map((p, i) => ({
  ...p,
  id: `${p.id}-${i}`,
}));

export type Persona = {
  id: string;
  name: string;
  relation: string;
  initials: string;
  importantDate?: string;
  tags: string[];
};

export const seedPeople: Persona[] = [
  {
    id: "nour",
    name: "Nour",
    relation: "Sister",
    initials: "N",
    importantDate: "Birthday · 2 Nov",
    tags: ["Handmade", "Neutral tones", "Silver over gold"],
  },
];

export const giftSuggestions = [
  {
    id: "g-clutch",
    name: "Hand-embroidered linen clutch",
    retailer: "Nazhandbags",
    price: 1240,
    rating: 4.8,
    image: clutch,
    reasoning:
      "You mentioned she kept photographing the embroidery stalls in Khan el-Khalili.",
  },
  {
    id: "g-necklace",
    name: "Crescent silver pendant",
    retailer: "Nora Elbatran Jewellery",
    price: 890,
    rating: 4.6,
    image: necklace,
    reasoning: "She only ever wears silver — this is hallmarked, not plated.",
  },
  {
    id: "g-vase",
    name: "Speckled stoneware vase",
    retailer: "Maramzy",
    price: 640,
    rating: 4.9,
    image: vase,
    reasoning: "Her new flat is bare and she joked about 'needing one nice thing'.",
  },
];

export const tips = [
  "Did you know? I can watch a price and nudge you when it drops.",
  "Did you know? Send me a link and I'll condense every review into one verdict.",
  "Did you know? I keep taste notes per person, so gifting gets faster each time.",
];

export const comparables = [
  { name: "Speckled stoneware vase, medium", price: 590 },
  { name: "Hand-thrown ceramic jug", price: 720 },
  { name: "Matte glaze bud vase", price: 480 },
];

export type VendorListing = {
  id: string;
  title: string;
  price: number;
  status: "draft" | "live";
  image: string;
};

export const seedListings: VendorListing[] = [
  {
    id: "l1",
    title: "Woven cotton throw, natural dye",
    price: 1100,
    status: "live",
    image: throwImg,
  },
  {
    id: "l2",
    title: "Beaded brass earrings",
    price: 420,
    status: "draft",
    image: necklace,
  },
];

export const money = (n: number) => `E£${n.toLocaleString("en-EG")}`;
