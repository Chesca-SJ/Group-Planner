// Compatibility export used by the existing circle API. Identity now comes only from a planner session.
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {accountFromCookies} from './lib/accounts';
export type ChatGPTUser={userId:string;displayName:string;email:string;fullName:string|null};
export async function getChatGPTUser():Promise<ChatGPTUser|null>{const h=await headers();return accountFromCookies(h.get('cookie')||'')}
export async function requireChatGPTUser(returnTo:string){const user=await getChatGPTUser();if(user)return user;redirect(chatGPTSignInPath(returnTo))}
export function chatGPTSignInPath(returnTo:string){return '/login?return_to='+encodeURIComponent(returnTo.startsWith('/')&&!returnTo.startsWith('//')?returnTo:'/')}
export function chatGPTSignOutPath(){return '/logout'}
