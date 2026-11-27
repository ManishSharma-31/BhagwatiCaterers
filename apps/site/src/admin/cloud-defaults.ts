// The owner's Supabase project, used only to PRE-FILL the Settings > Cloud form. It does not switch cloud mode on by itself.
// The publishable key is public by design and is safe in client code only because row-level security is on.
// It is NOT a JWT: it goes in the `apikey` header only, never in `Authorization: Bearer`.
// No service-role key and no database password belong anywhere in this repo.
export const DEFAULT_CLOUD_URL = 'https://buqfsalxyregmnxnngvi.supabase.co';
export const DEFAULT_CLOUD_KEY = 'sb_publishable_mPdfpobsxCjyJBWXRTjilw_BGSp80S_';
