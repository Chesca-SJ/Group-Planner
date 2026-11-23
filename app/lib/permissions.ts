export const canManageContent=(role:string)=>role==='owner'||role==='admin';
export const canCreateRecord=(role:string,kind:string)=>canManageContent(role)||(role==='member'&&['deposit','wish'].includes(kind));
export const canManageRecord=(role:string,userId:string,record:any)=>canManageContent(role)||(role==='member'&&record?.author===userId&&['deposit','wish'].includes(record.kind));
