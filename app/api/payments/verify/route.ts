import crypto from 'crypto';
import {requireUser} from '@/lib/auth';
import {prisma} from '@/lib/prisma';
export async function POST(req:Request){
  try{
    const u=await requireUser();
    const {orderId,razorpay_order_id,razorpay_payment_id,razorpay_signature}=await req.json();
    const o=await prisma.order.findFirst({where:{id:orderId,userId:u!.id},include:{payment:true}});
    if(!o||!o.payment||o.payment.providerOrderId!==razorpay_order_id)throw new Error('Payment order mismatch');
    const secret=process.env.RAZORPAY_KEY_SECRET;if(!secret)throw new Error('Payment gateway is not configured');
    const expected=crypto.createHmac('sha256',secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if(expected!==razorpay_signature)throw new Error('Invalid payment signature');
    await prisma.$transaction([
      prisma.payment.update({where:{orderId},data:{providerPaymentId:razorpay_payment_id,status:'PAID'}}),
      prisma.order.update({where:{id:orderId},data:{paymentStatus:'PAID',status:'CONFIRMED'}}),
      prisma.orderEvent.create({data:{orderId,status:'CONFIRMED',message:'Payment verified'}})
    ]);
    return Response.json({ok:true});
  }catch(e:any){return Response.json({error:e.message||'Verification failed'},{status:400});}
}
