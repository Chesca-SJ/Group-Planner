import {invalidateSession} from '../lib/accounts';
export async function GET(req:Request){await invalidateSession(req.headers.get('cookie')||'');return new Response(null,{status:303,headers:{Location:'/login?logged_out=1','Set-Cookie':'gp_session=; Path=/; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age=0','Cache-Control':'no-store'}})}
