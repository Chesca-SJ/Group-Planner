import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const circles = sqliteTable('circles', {id:text('id').primaryKey(),name:text('name').notNull(),owner:text('owner').notNull(),invite:text('invite').notNull()});
export const members = sqliteTable('members', {id:text('id').primaryKey(),circle:text('circle').notNull(),user:text('user').notNull(),name:text('name').notNull(),role:text('role').notNull().default('member')});
export const records = sqliteTable('records', {id:text('id').primaryKey(),circle:text('circle').notNull(),kind:text('kind').notNull(),data:text('data').notNull(),author:text('author').notNull(),version:integer('version').notNull().default(1),deleted:text('deleted')});

export const history = sqliteTable('history',{id:text('id').primaryKey(),circle:text('circle').notNull(),actor:text('actor').notNull(),action:text('action').notNull(),record:text('record').notNull(),kind:text('kind').notNull(),title:text('title').notNull(),created:text('created').notNull()});
export const preferences = sqliteTable('preferences',{id:text('id').primaryKey(),circle:text('circle').notNull(),user:text('user').notNull(),data:text('data').notNull()});
export const plannerAccounts = sqliteTable('planner_accounts',{id:text('id').primaryKey().notNull(),username:text('username').notNull(),usernameKey:text('username_key').notNull().unique(),passwordHash:text('password_hash').notNull(),salt:text('salt').notNull(),recoveryHash:text('recovery_hash'),created:integer('created').notNull()});
export const plannerSessions = sqliteTable('planner_sessions',{tokenHash:text('token_hash').primaryKey().notNull(),accountId:text('account_id').notNull().references(()=>plannerAccounts.id,{onDelete:'cascade'}),expires:integer('expires').notNull()});
export const plannerAuthLimits = sqliteTable('planner_auth_limits',{key:text('key').primaryKey().notNull(),count:integer('count').notNull().default(0),expires:integer('expires').notNull()});
