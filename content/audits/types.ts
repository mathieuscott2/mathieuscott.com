export type AuditFile = {iv: string; tag: string; data: string};
export type AuditBundle = {v: number; kdf: string; salt: string; files: Record<string, AuditFile>};
