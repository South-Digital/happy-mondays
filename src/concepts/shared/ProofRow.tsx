import { useState } from 'react'
import { GoogleAdsMark, ShopifyMark, Star } from '../../components/icons'
import { IMG } from '../../lib/assets'

/**
 * §A1 proof row — "★ 5.0 on Clutch · Shopify Partner · Google Ads Partner".
 * Type and spacing from the Figma frame (2171:641): Manrope Regular 13/22 at
 * ink 80%, an 8px icon gap and 22px between the two partner items.
 */
export function ProofRow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-[22px] gap-y-2 text-[13px] leading-[22px] text-[rgba(34,32,28,0.8)] ${className}`}
    >
      <span className="flex items-center gap-[6px]">
        <Star className="text-[#F5A623]" />
        5.0 on Clutch
      </span>

      <Dot />

      <span className="flex items-center gap-2">
        <PartnerIcon
          src={IMG.shopifyPartner}
          width={16}
          height={19}
          fallback={<ShopifyMark className="text-[#5E8E3E]" width={16} height={19} />}
        />
        Shopify Partner
      </span>

      <span className="flex items-center gap-2">
        <PartnerIcon
          src={IMG.googleAdsPartner}
          width={18}
          height={18}
          fallback={<GoogleAdsMark className="text-[#4285F4]" width={18} height={18} />}
        />
        Google Ads Partner
      </span>
    </div>
  )
}

/**
 * Renders the exported partner icon once it is in `public/images`, and the
 * placeholder mark until then — see IMG.shopifyPartner / IMG.googleAdsPartner.
 */
function PartnerIcon({
  src,
  width,
  height,
  fallback,
}: {
  src: string
  width: number
  height: number
  fallback: React.ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      style={{ width, height }}
      className="shrink-0 object-contain"
      onError={() => setFailed(true)}
    />
  )
}

const Dot = () => <span aria-hidden className="hidden h-[3px] w-[3px] rounded-full bg-ink/25 sm:block" />
