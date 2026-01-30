#!/usr/bin/env node
/**
 * Update Maklowicz stops with exact YouTube timestamps from transcript analysis
 * + Reorder Day 1 stops to match video order
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

// Video order matches transcript analysis
const updates = [
  // Day 1 - Ep 260 - Valletta (0XsoarB0dhQ)
  // Reorder: Valletta intro → Barrakka → Palace → Restaurants → Cathedral
  { location_name: "Valletta - Old Town",       timestamp_start: "40",   order_in_day: 1 },
  { location_name: "Upper Barrakka Gardens",     timestamp_start: "425",  order_in_day: 2 },
  { location_name: "Grand Master's Palace",      timestamp_start: "700",  order_in_day: 3 },
  { location_name: "Valletta Restaurants",        timestamp_start: "922",  order_in_day: 4 },
  { location_name: "St. John's Co-Cathedral",    timestamp_start: "1867", order_in_day: 5 },

  // Day 2 - Ep 261 - Birgu & Gozo (-twfeQBhjcY)
  { location_name: "Birgu (Vittoriosa)",          timestamp_start: "79"   },
  { location_name: "St. Paul's Bay",              timestamp_start: "679"  },
  { location_name: "Gozo Ferry Terminal (Cirkewwa)", timestamp_start: "1048" },
  { location_name: "Citadella (Gozo)",            timestamp_start: "1364" },
  { location_name: "Gozo - Victoria (Rabat)",     timestamp_start: "1567" },

  // Day 3 - Ep 262 - Rabat & Mdina (4lWogQhHrwA)
  { location_name: "Rabat",                       timestamp_start: "32"   },
  { location_name: "Pastizzi Shop in Rabat",      timestamp_start: "335"  },
  { location_name: "St. Paul's Catacombs",        timestamp_start: "701"  },
  { location_name: "Mdina - The Silent City",     timestamp_start: "926"  },
  { location_name: "Restaurant in Rabat",         timestamp_start: "1964" },
  { location_name: "Mdina by Night",              timestamp_start: "2570" },
];

async function main() {
  console.log("⏱️  Updating Maklowicz timestamps...\n");

  for (const { location_name, ...fields } of updates) {
    const url = `${SUPABASE_URL}/rest/v1/maklowicz_stops?location_name=eq.${encodeURIComponent(location_name)}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(fields),
    });
    if (!res.ok) {
      console.log(`  ❌ ${location_name}: ${res.status} ${await res.text()}`);
    } else {
      console.log(`  ✅ ${location_name} → t=${fields.timestamp_start}s`);
    }
  }

  console.log("\n✅ All timestamps updated!");
}

main().catch(console.error);
