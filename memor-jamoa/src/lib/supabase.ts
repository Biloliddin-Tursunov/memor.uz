
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.45.0';

// We attempt to get keys from environment variables.
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

/**
 * Robust Supabase Client Initialization
 * 
 * To prevent "Uncaught Error: supabaseUrl is required", we only initialize
 * the real client if keys are present. Otherwise, we provide a mock object
 * that allows the app to boot up and provides helpful developer warnings.
 */
let supabaseInstance: any;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    "⚠️ Me'mor: Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY) are missing or invalid. " +
    "Please configure them in your environment settings to enable cloud database features."
  );
  
  // A helper to create a chainable mock that resolves to empty data
  const createMockChain = () => {
    const chain: any = {
      select: () => chain,
      insert: () => chain,
      update: () => chain,
      delete: () => chain,
      upsert: () => chain,
      order: () => chain,
      eq: () => chain,
      neq: () => chain,
      gt: () => chain,
      lt: () => chain,
      gte: () => chain,
      lte: () => chain,
      like: () => chain,
      ilike: () => chain,
      is: () => chain,
      in: () => chain,
      contains: () => chain,
      containedBy: () => chain,
      range: () => chain,
      single: () => chain,
      maybeSingle: () => chain,
      limit: () => chain,
      offset: () => chain,
      // The "then" method makes this object "awaitable"
      then: (onfulfilled: any) => onfulfilled({ data: [], error: { message: "Database not connected." } }),
    };
    return chain;
  };

  supabaseInstance = {
    from: () => createMockChain(),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    channel: () => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => ({}) }) }),
      subscribe: () => ({ unsubscribe: () => ({}) }),
    }),
    removeChannel: () => {},
  };
}

export const supabase = supabaseInstance;
