import {weightedSplit,scheduleDates,allocateWeightedPlan} from './sharing';
export const fundCategories=['Everyday','Vacation','Events'] as const;
export const cents=(v:any)=>Math.round((Number(v)||0)*100);
export const pesos=(v:number)=>v/100;
export const dateISO=(d:Date)=>d.toISOString().slice(0,10);
export const localToday=()=>new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Manila'});
const validDate=(s:any)=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(+new Date(s+'T12:00:00Z'));
export function yearEnd(start:string){const d=new Date((validDate(start)?start:localToday())+'T12:00:00Z');d.setUTCFullYear(d.getUTCFullYear()+1);d.setUTCDate(d.getUTCDate()-1);return dateISO(d)}
export function weeklyDates(start:string,end:string){const dates:string[]=[];const d=new Date(start+'T12:00:00Z'),last=new Date(end+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+6);for(let i=0;i<530&&d<=last;i++,d.setUTCDate(d.getUTCDate()+7))dates.push(dateISO(d));if(!dates.length)dates.push(end);else dates[dates.length-1]=end;return dates}
export function monthlyDates(start:string,end:string){const dates:string[]=[];const a=new Date(start+'T12:00:00Z');for(let i=1;i<122;i++){const lastDay=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()+i+1,0)).getUTCDate();const d=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()+i,Math.min(a.getUTCDate(),lastDay),12));d.setUTCDate(d.getUTCDate()-1);const value=dateISO(d);if(value>=end){dates.push(end);break}dates.push(value)}return dates}
export function splitCents(total:number,count:number){if(count<1)return [];const base=Math.floor(total/count),extra=total-base*count;return Array.from({length:count},(_,i)=>base+(i<extra?1:0))}
export function allocatePlan(plan:number[],count:number){let cumulative=0;let previous=Array(count).fill(0);return plan.map(v=>{cumulative+=v;const next=splitCents(cumulative,count);const row=next.map((n,i)=>n-previous[i]);previous=next;return row})}
export function fundMath(goal:any,members:any[],deposits:any[],asOf=localToday()){
 const ids=Array.isArray(goal.participants)?goal.participants:members.map(m=>m.user);const people=ids.map((id:string)=>members.find(m=>m.user===id)||{user:id,name:'Former member'});
 const target=cents(goal.target),start=validDate(goal.start)?goal.start:validDate(goal.created)?goal.created:localToday(),end=validDate(goal.date)?goal.date:yearEnd(start),weeks=weeklyDates(start,end),months=monthlyDates(start,end);
 const planned=weeks.map((_:string,i:number)=>Number.isFinite(goal.weeklyPlan?.[i])?Math.max(0,Math.round(goal.weeklyPlan[i])):splitCents(target,weeks.length)[i]);
 const weights=people.map(()=>1);const shares=weightedSplit(target,weights);const periods=scheduleDates(goal.scheduleType||'weekly',start,end,goal);const periodicPlan=periods.map((_:string,i:number)=>Number(goal.contributionAmount)>0?cents(goal.contributionAmount)*people.length:Number.isFinite(goal.schedulePlan?.[i])?Math.max(0,Math.round(goal.schedulePlan[i])):(goal.scheduleType||'weekly')==='weekly'?planned[i]:splitCents(target,periods.length)[i]);const periodAllocation=allocateWeightedPlan(periodicPlan,weights),allocation=allocateWeightedPlan(planned,weights);const drops=deposits.filter(d=>d.goal===goal.id&&(!d.date||d.date<=asOf));const contributed=drops.reduce((a,d)=>a+cents(d.amount),0);
 const rows=people.map((person:any,i:number)=>{const paid=drops.filter(d=>(d.member||d.author)===person.user).reduce((a,d)=>a+cents(d.amount),0);const due=periodAllocation.reduce((a:number,row:number[],j:number)=>a+(periods[j]<=asOf?(row[i]||0):0),0);const delta=paid-due;return {person,periodic:periodAllocation.map((row:number[])=>row[i]),target:shares[i],paid,due,delta,remaining:Math.max(0,shares[i]-paid),status:contributionStatus(paid,due),weekly:allocation.map((row:number[])=>row[i]),monthly:splitCents(shares[i],months.length)}});
 return {periods,periodicPlan,periodAllocation,allocation,people,target,start,end,weeks,months,planned,plannedTotal:planned.reduce((a:number,b:number)=>a+b,0),rows,contributed,remaining:Math.max(0,target-contributed),unassigned:drops.filter(d=>!ids.includes(d.member||d.author)).reduce((a,d)=>a+cents(d.amount),0)};
}

// Return cents; older funds derive the preset from their saved payment plan.
export function contributionPreset(goal:any,members:any[],member?:string,asOf=localToday()){
 if(Number(goal.contributionAmount)>0)return cents(goal.contributionAmount);
 const math=fundMath(goal,members,[],asOf);
 const row=math.rows.find((r:any)=>r.person.user===member)||math.rows[0];
 const next=math.periods.findIndex((d:string)=>d>=asOf);
 return row?.periodic[next<0?Math.max(0,math.periods.length-1):next]||0;
}

export function contributionStatus(paid:number,due:number){if(paid>due)return 'Ahead';if(paid===due)return 'Enough';return due>0&&(due-paid)/due>=.5?'Critical':'Lack Funds'}
export function breakdownTotal(items:any[]){return items.reduce((sum,item)=>sum+Math.round(cents(item.unitPrice)*Number(item.quantity)),0)}
