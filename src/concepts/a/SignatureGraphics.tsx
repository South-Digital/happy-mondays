import { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { sectionReveal, usePrefersReducedMotion } from "../../lib/motion";
import { segment, settle, useSceneTimeline } from "./useSceneTimeline";
import "./signature-graphics.css";

function GoogleSymbol() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.89.6-2.03.96-3.37.96-2.61 0-4.83-1.76-5.62-4.12H3.04v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.38 13.92a6 6 0 0 1 0-3.84V7.49H3.04a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.49l3.34 2.59C7.17 7.72 9.39 5.96 12 5.96Z"/></svg>;
}
function JourneyIcon({ kind }: { kind: "feed" | "ads" | "store" | "checkout" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">{kind === "feed" ? <><rect x="5" y="4" width="14" height="16" rx="4"/><path d="M8 9h8M8 13h8M8 17h4"/></> : kind === "ads" ? <><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></> : kind === "store" ? <><path d="m4 10 2-6h12l2 6M5 12v8h14v-8M9 20v-6h6v6"/><path d="M4 10c0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0"/></> : <><rect x="4" y="6" width="16" height="13" rx="4"/><path d="M4 10h16m-12 5h4"/></>}</svg>;
}

type GraphicProps = { time: number; onReady: () => void };
function DiscoveryGraphic({ time, onReady }: GraphicProps) {
  const enter = settle(segment(time, 150, 1600));
  const reveal = settle(segment(time, 1900, 1100));
  return <>
    <div className="sg-photo-haze" aria-hidden="true" />
    <div className="sg-catalogue-shadow" />
    <div className="sg-catalogue-back sg-catalogue-back--far" style={{ transform: `translate(-50%, -50%) rotate(${10 * enter}deg)` }} />
    <div className="sg-catalogue-back" style={{ transform: `translate(-50%, -50%) rotate(${-10 * enter}deg)` }} />
    <div className="sg-catalogue" style={{ opacity: enter, transform: `translate(-50%, calc(-50% + ${16 * (1 - enter)}px)) rotate(-3deg)` }}>
      <div className="sg-catalogue-photo"><img src="/images/product-studies/jewellery-1122.webp" srcSet="/images/product-studies/jewellery-640.webp 640w, /images/product-studies/jewellery-1122.webp 1122w, /images/product-studies/jewellery-1600.webp 1600w" sizes="(max-width: 1000px) 60vw, 300px" alt="Gold earrings from the illustrative product collection" width="640" height="800" loading="lazy" decoding="async" onLoad={event => { event.currentTarget.decode().catch(() => {}).then(onReady); }} onError={onReady}/></div>
      <div className="sg-catalogue-caption"><span>THE EVERYDAY COLLECTION</span><strong>Made to be found.</strong><div className="sg-feed-lines"><i/><i/><i/></div></div>
    </div>
    <div className="sg-search-glass" style={{ opacity: reveal, transform: `translateY(${14 * (1 - reveal)}px)` }}><GoogleSymbol/><div><small>A better product feed</small><span>Ready for the right search.</span></div><span className="sg-ready-dot"/></div>
    <span className="sg-scene-caption" style={{ opacity: reveal }}>Good data. Beautifully presented.</span>
  </>;
}

const nodes = [{kind:"feed",label:"Product feed",x:72,y:106},{kind:"ads",label:"Google Ads",x:308,y:106},{kind:"store",label:"Your store",x:72,y:283},{kind:"checkout",label:"Checkout",x:308,y:283}] as const;
function ConnectedGraphic({ time }: GraphicProps) {
  const id = useId().replace(/:/g, "");
  const progress = settle(segment(time, 550, 3400));
  return <>
    <div className="sg-orbit-aura"/>
    <svg className="sg-network" viewBox="0 0 380 400" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={`${id}-track`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#cbd9cd"/></linearGradient><filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#526554" floodOpacity=".12"/></filter></defs>
      <g fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}>
        <path d="M72 106C72 195 308 194 308 283M308 106C308 195 72 194 72 283" stroke={`url(#${id}-track)`} strokeWidth="13"/>
        <path d="M72 106C72 195 308 194 308 283M308 106C308 195 72 194 72 283" stroke="#729487" strokeOpacity=".35" strokeWidth="1" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/>
      </g>
      <ellipse cx="190" cy="202" rx="63" ry="56" fill="#536d4c" opacity=".045"/>
    </svg>
    {nodes.map((node,index) => { const show = settle(segment(time, 200 + index * 320, 850)); return <div key={node.kind} className={`sg-network-node sg-network-node--${node.kind}`} style={{left:`${node.x/380*100}%`,top:`${node.y/400*100}%`,opacity:show,transform:`translate(-50%, calc(-50% + ${10*(1-show)}px))`}}><span><JourneyIcon kind={node.kind}/></span><small>{node.label}</small></div> })}
    <div className="sg-core" style={{opacity:settle(segment(time,1000,1300)),transform:`translate(-50%, -50%) scale(${.92 + .08*settle(segment(time,1000,1300))})`}}><div><img src="/images/icon-shopify.png" width="27" height="33" alt=""/><span>Connected<br/><strong>by design.</strong></span></div></div>
    <span className="sg-scene-caption">Every part working together.</span>
  </>;
}
function PeopleGraphic({ time, onReady }: GraphicProps) {
  const enter = settle(segment(time, 200, 1400));
  const update = settle(segment(time, 1900, 1100));
  const heights = [8,14,22,12,28,36,23,15,30,41,28,19,33,24,14,31,38,23,12,25,17,9];
  return <>
    <div className="sg-people-haze"/>
    <div className="sg-person-frame" style={{ opacity:enter, transform:`translate(-50%, calc(-50% + ${18*(1-enter)}px)) rotate(3deg)` }}>
      <img src="/images/refinement/keanu-960.webp" srcSet="/images/refinement/keanu-480.webp 480w, /images/refinement/keanu-960.webp 960w, /images/refinement/keanu-1600.webp 1600w" sizes="(max-width: 1000px) 80vw, 340px" alt="Keanu Fischell, founder of Happy Mondays" width="480" height="320" loading="lazy" decoding="async" onLoad={event => { event.currentTarget.decode().catch(() => {}).then(onReady); }} onError={onReady}/>
      <div className="sg-person-name"><strong>Keanu Fischell</strong><span>Founder, Happy Mondays</span></div>
    </div>
    <div className="sg-update-glass" style={{ opacity:update, transform:`translateY(${14*(1-update)}px)` }}><div className="sg-update-heading"><span className="sg-ready-dot"/><span>Your weekly update</span><small>From your strategist</small></div><div className="sg-wave" aria-hidden="true">{heights.map((height,index)=><i key={index} style={{height: `${height}px`,transform:`scaleY(${.18+.82*settle(segment(time,2200+index*45,650))})`}}/>)}</div><p>A familiar face. A clear next step.</p></div>
  </>;
}
const stories = [
  {id:"discovery",title:"An eye for what matters.",body:"Four years inside Google. Senior expertise in the details that help great products find the right people.",Graphic:DiscoveryGraphic},
  {id:"connected",title:"The whole picture.",body:"Your product feed, campaigns and Shopify experience. Considered together, from first search to checkout.",Graphic:ConnectedGraphic},
  {id:"people",title:"People you get to know.",body:"Direct contact with the people doing the work. Clear updates, thoughtful decisions and a shared next step.",Graphic:PeopleGraphic},
] as const;
function SignatureScene({ story }: { story: typeof stories[number] }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref,{amount:.5});
  const [loaded, setLoaded] = useState(story.id === "connected");
  const {time} = useSceneTimeline(visible,loaded,reduced,4600,60);
  return <article className="sg-story"><div ref={ref} className={`sg-scene sg-scene--${story.id}`} data-scene-time={Math.round(time)}><story.Graphic time={time} onReady={() => setLoaded(true)}/></div><div className="sg-story-copy"><h3>{story.title}</h3><p>{story.body}</p></div></article>;
}
export function SignatureGraphics() {
  const reduced = usePrefersReducedMotion();
  return <section className="sg-section" aria-labelledby="sg-heading" data-motion={reduced ? "reduce" : "full"}><div className="sg-container"><motion.div className="sg-heading" {...sectionReveal(reduced)}><p>THE HAPPY MONDAYS APPROACH</p><h2 id="sg-heading">Considered details.<br/><span>A different kind of partnership.</span></h2></motion.div><div className="sg-grid">{stories.map(story=><SignatureScene key={story.id} story={story}/>)}</div></div></section>;
}
