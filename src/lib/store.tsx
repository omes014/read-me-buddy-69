import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { seedListings, seedPeople, type Persona, type Product, type VendorListing } from "./ribhana-data";

type Draft = {
  material?: string;
  story?: string;
  audience: string[];
  price?: number;
  title: string;
  description: string;
  tags: string[];
  photos: number;
};

type State = {
  language: "en" | "ar";
  intent: "self" | "gift";
  subInterests: string[];
  brandFavorites: string[];
  priorities: string[];
  compare: boolean;
  query: string;
  wishlist: Product[];
  favorites: Product[];
  people: Persona[];
  listings: VendorListing[];
  draft: Draft;
};

type Store = State & {
  set: <K extends keyof State>(key: K, value: State[K]) => void;
  toggleIn: (key: "subInterests" | "brandFavorites" | "priorities", value: string) => void;
  toggleSaved: (key: "wishlist" | "favorites", product: Product) => void;
  isSaved: (key: "wishlist" | "favorites", id: string) => boolean;
  addPerson: (p: Persona) => void;
  patchDraft: (patch: Partial<Draft>) => void;
  publishDraft: (image: string) => void;
};

const emptyDraft: Draft = {
  audience: [],
  title: "Speckled stoneware vase, hand-thrown",
  description:
    "Thrown on the wheel and finished in a matte speckled glaze, so no two come out the same. Heavy enough to hold a full bunch of stems without tipping. Fired for daily use, not just the shelf.",
  tags: ["Handmade", "Ceramic", "Neutral", "Gifting"],
  photos: 0,
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    language: "en",
    intent: "self",
    subInterests: [],
    brandFavorites: [],
    priorities: [],
    compare: false,
    query: "",
    wishlist: [],
    favorites: [],
    people: seedPeople,
    listings: seedListings,
    draft: emptyDraft,
  });

  const value = useMemo<Store>(
    () => ({
      ...state,
      set: (key, val) => setState((s) => ({ ...s, [key]: val })),
      toggleIn: (key, val) =>
        setState((s) => ({
          ...s,
          [key]: s[key].includes(val) ? s[key].filter((x) => x !== val) : [...s[key], val],
        })),
      toggleSaved: (key, product) =>
        setState((s) => ({
          ...s,
          [key]: s[key].some((p) => p.id === product.id)
            ? s[key].filter((p) => p.id !== product.id)
            : [...s[key], product],
        })),
      isSaved: (key, id) => state[key].some((p) => p.id === id),
      addPerson: (p) => setState((s) => ({ ...s, people: [...s.people, p] })),
      patchDraft: (patch) => setState((s) => ({ ...s, draft: { ...s.draft, ...patch } })),
      publishDraft: (image) =>
        setState((s) => ({
          ...s,
          listings: [
            {
              id: `l${s.listings.length + 1}`,
              title: s.draft.title,
              price: s.draft.price ?? 650,
              status: "live",
              image,
            },
            ...s.listings,
          ],
          draft: emptyDraft,
        })),
    }),
    [state],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
