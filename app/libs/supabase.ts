import { createClient } from "@supabase/supabase-js";

const supabaseUrl =  "https://qzshmynxqurocpdkljqr.supabase.co";
const supabaseKey = "sb_publishable_HUMbM1dETCJBwlP7meMxZA_JiN7LzvB";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;