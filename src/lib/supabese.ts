// // import { createClient } from '@supabase/supabase-js';

// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// // const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// // if (!supabaseUrl || !supabaseAnonKey) {
// //   console.error('Supabase URL或密钥未设置');
// // }

// // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // 创建一个模拟的supabase对象，用于临时替代实际的Supabase连接
// export const supabase = {
//   from: (table: string) => ({
//     select: (query?: string) => ({
//       eq: () => Promise.resolve({ data: [], error: null }),
//       single: () => Promise.resolve({ data: null, error: null }),
//       execute: () => Promise.resolve({ data: [], error: null })
//     }),
//     insert: (data: any) => Promise.resolve({ data: null, error: null }),
//     update: (data: any) => ({
//       eq: () => Promise.resolve({ data: null, error: null })
//     }),
//     delete: () => ({
//       eq: () => Promise.resolve({ data: null, error: null })
//     }),
//     order: () => ({
//       limit: () => Promise.resolve({ data: [], error: null })
//     }),
//     limit: () => Promise.resolve({ data: [], error: null })
//   }),
//   auth: {
//     signIn: () => Promise.resolve({ user: null, session: null, error: null }),
//     signOut: () => Promise.resolve({ error: null }),
//     onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
//   },
//   storage: {
//     from: (bucket: string) => ({
//       upload: () => Promise.resolve({ data: null, error: null }),
//       getPublicUrl: () => ({ data: { publicUrl: '' } })
//     })
//   }
// };