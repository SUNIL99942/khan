export type Tracking={status:string;awb?:string;trackingUrl?:string;events:{status:string,message:string,at:string}[]};
export async function trackShipment(awb:string):Promise<Tracking>{
 if(!process.env.SHIPROCKET_EMAIL||!process.env.SHIPROCKET_PASSWORD) return {status:'CONFIG_REQUIRED',awb,events:[]};
 const login=await fetch('https://apiv2.shiprocket.in/v1/external/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:process.env.SHIPROCKET_EMAIL,password:process.env.SHIPROCKET_PASSWORD})});
 if(!login.ok) throw new Error('Shipping provider authentication failed'); const {token}=await login.json();
 const r=await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${encodeURIComponent(awb)}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'}); if(!r.ok) throw new Error('Tracking lookup failed'); const data=await r.json(); const d=data?.tracking_data; return {status:d?.shipment_status||'UNKNOWN',awb,trackingUrl:d?.track_url,events:(d?.shipment_track_activities||[]).map((x:any)=>({status:x['sr-status-label']||x.status||'Update',message:x.activity||'',at:x.date||''}))};
}
