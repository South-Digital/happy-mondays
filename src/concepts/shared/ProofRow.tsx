import { GoogleAdsMark, ShopifyMark, Star } from '../../components/icons'

/** §A1 proof row — "★ 5.0 on Clutch · Shopify Partner · Google Ads Partner". */
export function ProofRow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[14px] font-medium text-ink-72 ${className}`}
    >
      <span className="flex items-center gap-2">
        <Star className="text-[#F5A623]" />
        5.0 on Clutch
      </span>
      <Dot />
      <span className="flex items-center gap-2">
        <ShopifyMark className="text-[#5E8E3E]" />
        Shopify Partner
      </span>
      <Dot />
      <span className="flex items-center gap-2">
        <GoogleAdsMark className="text-[#4285F4]" />
        Google Ads Partner
      </span>
    </div>
  )
}

const Dot = () => <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink/25 sm:block" />
