import crypto from 'crypto';
import {prisma} from '@/lib/prisma';
export async function POST(req:Request){
  const body=await req.text();
  const sig=req.headers.get('x-razorpay-signature')||'';
  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
  if(!secret)return new Response('Webhook secret not configured',{status:503});
  const expected=crypto.createHmac('sha256',secret).update(body).digest('hex');
  if(sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return new Response('Invalid signature',{status:400});
  try{
    const e=JSON.parse(body);
    const p=e.payload?.payment?.entity;
    if(e.event==='payment.captured'&&p?.id){
      const pay=await prisma.payment.findFirst({where:{providerPaymentId:p.id}});
      if(pay){await prisma.$transaction([prisma.payment.update({where:{id:pay.id},data:{status:'PAID',raw:e}}),prisma.order.update({where:{id:pay.orderId},data:{paymentStatus:'PAID',status:'CONFIRMED'}}),prisma.orderEvent.create({data:{orderId:pay.orderId,status:'CONFIRMED',message:'Payment captured by gateway'}})]);}
    }
    if(e.event==='payment.failed'&&p?.id){
      const pay=await prisma.payment.findFirst({where:{providerPaymentId:p.id}});
      if(pay)await prisma.payment.update({where:{id:pay.id},data:{status:'FAILED',raw:e}});
    }
    return Response.json({ok:true});
  }catch{return new Response('Webhook processing failed',{status:500});}
}
