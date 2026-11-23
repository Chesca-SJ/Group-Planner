import {env} from 'cloudflare:workers';
const encoder=new TextEncoder();
export const SESSION_COOKIE='gp_session';
export function readCookie(value:string,name:string){return value.split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'='))?.slice(name.length+1)||''}
export function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),v=>v.toString(16).padStart(2,'0')).join('')}
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value))),v=>v.toString(16).padStart(2,'0')).join('')}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-256'},key,256);return Array.from(new Uint8Array(bits),v=>v.toString(16).padStart(2,'0')).join('')}
export function equalHash(a:string,b:string){if(a.length!==b.length)return false;let difference=0;for(let i=0;i<a.length;i++)difference|=a.charCodeAt(i)^b.charCodeAt(i);return difference===0}
function sessionTokens(cookies:string){return cookies.split(';').map(v=>v.trim()).filter(v=>v.startsWith(SESSION_COOKIE+'=')).map(v=>v.slice(SESSION_COOKIE.length+1)).filter(v=>/^[a-f0-9]{64}$/.test(v))}
export async function accountFromCookies(cookies:string){for(const token of sessionTokens(cookies)){const account:any=await env.DB!.prepare('SELECT a.id,a.username FROM planner_sessions s JOIN planner_accounts a ON a.id=s.account_id WHERE s.token_hash=? AND s.expires>?').bind(await digest(token),Date.now()).first();if(account)return {userId:account.id,displayName:account.username,email:'',fullName:account.username}}return null}
export function sessionCookie(token:string,remember:boolean){return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=None; Partitioned${remember?'; Max-Age=2592000':''}`}
export async function invalidateSession(cookies:string){for(const token of sessionTokens(cookies))await env.DB!.prepare('DELETE FROM planner_sessions WHERE token_hash=?').bind(await digest(token)).run()}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin&&origin===new URL(req.url).origin}
