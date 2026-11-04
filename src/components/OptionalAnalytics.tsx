import Script from "next/script";
export default function OptionalAnalytics(){
 const id=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
 if(!id||!/^G-[A-Z0-9]+$/.test(id)) return null;
 return <>
  <Script src={"https://www.googletagmanager.com/gtag/js?id="+id} strategy="afterInteractive"/>
  <Script id="ga4-initialize" strategy="afterInteractive">
    {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',"+JSON.stringify(id)+",{anonymize_ip:true});"}
  </Script>
 </>;
}
