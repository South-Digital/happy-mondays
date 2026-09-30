import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { sectionReveal, usePrefersReducedMotion } from "../../lib/motion";
import { segment, settle, useSceneTimeline } from "./useSceneTimeline";
import "./signature-graphics.css";

function GoogleSymbol() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.89.6-2.03.96-3.37.96-2.61 0-4.83-1.76-5.62-4.12H3.04v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.38 13.92a6 6 0 0 1 0-3.84V7.49H3.04a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.49l3.34 2.59C7.17 7.72 9.39 5.96 12 5.96Z"/></svg>;
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>;
}
function ShoppingPreview({time}:{time:number}) {
  return <div className="sg-google-window" role="img" aria-label="Illustrative Google Shopping search for pilates grip socks, showing Lucky Honey products.">
    <div className="sg-google-search"><GoogleSymbol/><span>pilates grip socks</span><SearchIcon/></div>
    <div className="sg-google-tabs"><span>All</span><span className="selected">Shopping</span><span>Images</span><span>Videos</span></div>
    <div className="sg-shopping-label">Sponsored</div>
    <div className="sg-products">{[{image:"juliet",name:"Juliet Grip Sock"},{image:"crewstripe",name:"Crew Stripe Grip Sock"}].map((product,index)=>{
      const p=settle(segment(time,1100+index*150,1100));
      return <div className="sg-product" key={product.image} style={{opacity:p,transform:`translateY(${24*(1-p)}px)`}}>
        <img src={`/images/refinement/product-${product.image}.webp`} alt="" width="1000" height="1294" loading="lazy" decoding="async"/>
        <div><span className="sg-product-name">{product.name}</span><strong>$18.00</strong><span className="sg-merchant">Lucky Honey</span></div>
      </div>;
    })}</div>
  </div>;
}
function ShopifyPreview({time}:{time:number}) {
  const id=useId().replace(/:/g,"");
  const progress=settle(segment(time,1250,2300));
  return <div className="sg-shopify-window" role="img" aria-label="Illustrative Shopify Analytics preview, showing $12,846 in sales and 184 orders. Not client results.">
    <div className="sg-shopify-bar"><img src="/images/icon-shopify.png" width="17" height="20" alt=""/><strong>Your store</strong><span><SearchIcon/>Search</span></div>
    <div className="sg-admin-content"><div className="sg-admin-heading"><strong>Analytics</strong><span>Last 7 days</span></div>
      <div className="sg-admin-metrics" aria-hidden="true"><div><span>Total sales</span><strong>${Math.round(12846*progress).toLocaleString("en-US")}</strong><small>↗ 24.8%</small></div><div><span>Orders</span><strong>{Math.round(184*progress)}</strong><small>↗ 18.6%</small></div></div>
      <div className="sg-admin-chart" style={{opacity:settle(segment(time,850,900)),transform:`translateY(${12*(1-settle(segment(time,850,900)))}px)`}}><strong>Total sales over time</strong><svg viewBox="0 0 300 100" aria-hidden="true"><defs><clipPath id={id}><rect width={300*progress} height="100"/></clipPath></defs><path d="M0 20H300M0 55H300M0 90H300" stroke="#e9e9e9" strokeDasharray="3 4" fill="none"/><path d="M0 88C30 84 40 73 60 77S100 70 120 64S150 66 180 51S225 59 250 36S280 40 300 26" fill="none" stroke="#c3b6e8" strokeWidth="1.5" strokeDasharray="3 3"/><path d="M0 87C23 87 32 59 55 64S85 73 110 48S145 64 170 32S201 43 222 23S259 35 280 15S290 12 300 8" clipPath={`url(#${id})`} fill="none" stroke="#8063cf" strokeWidth="2.2"/></svg><div><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div></div>
    </div>
  </div>;
}
function PeoplePreview({time}:{time:number}) {
  const caption=settle(segment(time,850,1100));
  return <div className="sg-person"><img src="/images/refinement/keanu-960.webp" srcSet="/images/refinement/keanu-480.webp 480w, /images/refinement/keanu-960.webp 960w, /images/refinement/keanu-1600.webp 1600w" sizes="(max-width:1000px) 90vw, 450px" alt="Keanu Fischell speaking into a microphone" width="480" height="320" loading="lazy" decoding="async"/><div><strong style={{opacity:caption,transform:`translateY(${8*(1-caption)}px)`}}>Keanu Fischell</strong><span style={{opacity:caption}}>Founder, Happy Mondays</span></div></div>;
}
const stories=[
  {id:"google",title:"Google Ads specialists.",body:"Four years inside Google, working with retail brands. Experience that informs your campaigns and product feeds.",Graphic:ShoppingPreview},
  {id:"shopify",title:"Beyond the ad account.",body:"Product feeds, campaigns and the Shopify experience. We look at what happens before and after the click.",Graphic:ShopifyPreview},
  {id:"people",title:"A team you can reach.",body:"Speak directly with the people running your account, with regular updates on the work and what happens next.",Graphic:PeoplePreview},
] as const;
function PlatformScene({story,index}:{story:typeof stories[number];index:number}) {
  const reduced=usePrefersReducedMotion();
  const ref=useRef<HTMLDivElement>(null);
  const visible=useInView(ref,{amount:.35});
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{
    let active=true;
    const images=Array.from(ref.current?.querySelectorAll("img") ?? []);
    const cleanups:(()=>void)[]=[];
    const ready=images.map(image=>new Promise<void>(resolve=>{
      const finish=()=>{image.decode().catch(()=>{}).then(()=>resolve());};
      if(image.complete) finish();
      else {
        image.addEventListener("load",finish,{once:true});
        image.addEventListener("error",finish,{once:true});
        cleanups.push(()=>{image.removeEventListener("load",finish);image.removeEventListener("error",finish);});
      }
    }));
    Promise.all(ready).then(()=>{if(active)setLoaded(true);});
    return()=>{active=false;cleanups.forEach(cleanup=>cleanup());};
  },[]);
  const {time}=useSceneTimeline(visible,loaded,reduced,4200,60);
  const localTime=reduced?4200:Math.max(0,time-index*110);
  const backdrop=settle(segment(localTime,0,1100));
  const surface=settle(segment(localTime,340,1450));
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const progress=useSpring(scrollYProgress,{stiffness:170,damping:35,mass:.3});
  const backgroundY=useTransform(progress,[0,1],[22,-22]);
  const surfaceY=useTransform(progress,[0,1],[14,-14]);
  return <article className="sg-story">
    <div ref={ref} className={`sg-scene sg-scene--${story.id}`} data-scene-time={Math.round(time)}>
      <motion.div className="sg-scene-background" aria-hidden="true" style={{opacity:backdrop,y:reduced?0:backgroundY,scale:1.08-.08*backdrop}} />
      <motion.div className="sg-surface-depth" style={{y:reduced||story.id==="people"?0:surfaceY}}>
        <motion.div className="sg-surface" style={{opacity:surface,y:64*(1-surface),scale:.96+.04*surface}}><story.Graphic time={localTime}/></motion.div>
      </motion.div>
    </div>
    <motion.div className="sg-story-copy" initial={reduced?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:.8,delay:index*.08,ease:[.22,1,.36,1]}}><h3>{story.title}</h3><p>{story.body}</p></motion.div>
  </article>;
}
export function SignatureGraphics() {
  const reduced=usePrefersReducedMotion();
  return <section className="sg-section" aria-labelledby="sg-heading"><div className="sg-container"><motion.h2 id="sg-heading" {...sectionReveal(reduced)}>How we work.</motion.h2><div className="sg-grid">{stories.map((story,index)=><PlatformScene key={story.id} story={story} index={index}/>)}</div><p className="sg-example-note">Interface examples are illustrative. Product photography: Lucky Honey.</p></div></section>;
}
