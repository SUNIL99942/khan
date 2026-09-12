import { cookies } from 'next/headers'; import { SignJWT, jwtVerify } from 'jose'; import bcrypt from 'bcryptjs'; import { prisma } from './prisma';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'development-only-change-me');
export async function hashPassword(p:string){return bcrypt.hash(p,12)}
export async function verifyPassword(p:string,h:string){return bcrypt.compare(p,h)}
export async function setSession(user:{id:string,role:string}){const token=await new SignJWT({sub:user.id,role:user.role}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret); const c=await cookies(); c.set('atoz_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7});}
export async function clearSession(){const c=await cookies();c.set('atoz_session','',{httpOnly:true,expires:new Date(0),path:'/'})}
export async function getSession(){try{const c=await cookies();const token=c.get('atoz_session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,secret);return payload.sub?{id:String(payload.sub),role:String(payload.role)}:null}catch{return null}}
export async function requireUser(){const s=await getSession();if(!s)throw new Error('UNAUTHORIZED');return prisma.user.findUnique({where:{id:s.id}})}
export async function requireAdmin(){const s=await getSession();if(!s||s.role!=='ADMIN')throw new Error('FORBIDDEN');return prisma.user.findUnique({where:{id:s.id}})}
