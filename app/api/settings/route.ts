import {prisma} from '@/lib/prisma';
import {requireAdmin} from '@/lib/auth';
export async function GET(){try{return Response.json({settings:await prisma.siteSetting.findMany()})}catch{return Response.json({settings:[]})}}
export async function PUT(req:Request){try{const u=await requireAdmin();const body=await req.json();if(!body?.key)throw new Error('key required');const setting=await prisma.siteSetting.upsert({where:{key:String(body.key)},create:{key:String(body.key),value:body.value??null},update:{value:body.value??null}});await prisma.auditLog.create({data:{userId:u!.id,action:'UPDATE',entity:'SiteSetting',entityId:setting.id,metadata:{key:setting.key}}});return Response.json({setting})}catch(e:any){return Response.json({error:e.message||'Could not update setting'},{status:400})}}
