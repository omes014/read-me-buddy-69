import { Bookmark, Heart, Star } from "lucide-react";
import { money, type Product } from "@/lib/ribhana-data";
import { useStore } from "@/lib/store";
import { ReasoningTag } from "./ui";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggleSaved, isSaved } = useStore();
  const wished = isSaved("wishlist", product.id);
  const faved = isSaved("favorites", product.id);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow duration-200 hover:shadow-lift">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={816}
        height={816}
        className="aspect-square w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="display text-base leading-snug text-foreground">{product.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.retailer}</p>
          </div>
          <div className="flex gap-1">
            <IconToggle
              active={wished}
              label="Save to wishlist"
              onClick={() => toggleSaved("wishlist", product)}
            >
              <Bookmark className="size-4" strokeWidth={2} fill={wished ? "currentColor" : "none"} />
            </IconToggle>
            <IconToggle
              active={faved}
              label="Favourite"
              onClick={() => toggleSaved("favorites", product)}
            >
              <Heart className="size-4" strokeWidth={2} fill={faved ? "currentColor" : "none"} />
            </IconToggle>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-primary">{money(product.price)}</span>
          {product.wasPrice ? (
            <span className="text-xs text-muted-foreground line-through">
              {money(product.wasPrice)}
            </span>
          ) : null}
          <span className="ml-auto flex items-center gap-1 text-xs text-subtle-foreground">
            <Star className="size-3 fill-current text-primary" />
            {product.rating}
          </span>
        </div>
        <ReasoningTag>You'll like this: {product.reasoning}</ReasoningTag>
      </div>
    </article>
  );
}

function IconToggle({
  active,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "grid size-9 place-items-center rounded-full border transition-all duration-150 active:scale-90",
        active
          ? "animate-pop border-primary bg-primary-fill text-primary"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function GridCard({ product }: { product: Product }) {
  const { toggleSaved, isSaved } = useStore();
  const faved = isSaved("favorites", product.id);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={816}
          height={816}
          className="aspect-square w-full object-cover"
        />
        <button
          type="button"
          aria-label="Favourite"
          onClick={() => toggleSaved("favorites", product)}
          className={cn(
            "absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/70 backdrop-blur transition-all active:scale-90",
            faved ? "animate-pop text-primary" : "text-foreground/70",
          )}
        >
          <Heart className="size-4" fill={faved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-2.5">
        <p className="truncate text-xs text-subtle-foreground">{product.name}</p>
        <p className="mt-0.5 text-sm font-semibold text-primary">{money(product.price)}</p>
      </div>
    </div>
  );
}
