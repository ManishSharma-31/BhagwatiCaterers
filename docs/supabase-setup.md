# Supabase setup (online storage) for the owner dashboard

This is optional. The dashboard works on one phone without it.
With Supabase, all phones show the same data, and the data is safe online.
Supabase has a free plan. You need an email address. Nothing here costs money. [VERIFY free plan limits on supabase.com/pricing]

You do this once. Take your time. Ask a helper to sit with you.

## Words you will see
- **Project**: your own private database on Supabase.
- **SQL Editor**: a page where you paste commands and press Run.
- **Anon / publishable key**: a public key. It is safe in the app. It only works for people on your allowed list.
- **Secret / service_role key and database password**: NEVER paste these anywhere in the app or send them to anyone.

## Step 1. Create a project
1. Open supabase.com and sign up (free).
2. Click **New project**. Name it `bhagwati`. Choose a region close to India (for example Mumbai, `ap-south-1`). [VERIFY region name]
3. Set a database password. Write it on paper and keep it safe. You will not need it in the app.
4. Wait a few minutes until the project is ready.

(The project for Bhagwati Caterers already exists at `https://buqfsalxyregmnxnngvi.supabase.co`. If you use that one, skip to Step 2.)

## Step 2. Run the SQL
1. In the left menu click **SQL Editor**. [VERIFY menu name]
2. Click **New query**.
3. Open the file `supabase/migrations/0001_init.sql` from this project. Copy everything.
4. Paste it into the editor. Click **Run**.
5. You should see "Success". Running it twice is safe.

What it does, in short: it makes one table for all your records, a list of allowed people, and rules so only people on that list can read or write. Nobody can delete rows. "Deleting" in the app only hides a record.

## Step 3. Create your login
1. In the left menu click **Authentication**, then **Users**. [VERIFY menu names]
2. Click **Add user**, then **Create new user**. [VERIFY button names]
3. Type your email and a strong password. Tick **Auto Confirm User** if you see it. [VERIFY]
4. Write the password down safely. If you forget it, you can reset it here.

## Step 4. Put yourself on the allowed list
1. Go back to **SQL Editor**, **New query**.
2. Paste this one line. Change the email to the one from Step 3:

```sql
insert into public.allowed_users (user_id) select id from auth.users where email = 'your-email@example.com';
```

3. Click **Run**. It should say 1 row inserted. [VERIFY wording]
4. Add a second person (for example a manager) the same way: create their user in Step 3, then run the line with their email.

## Step 5. Turn off new sign-ups (important)
Supabase lets anyone sign up by default. The rules in Step 2 still keep strangers away from your data, but turn sign-ups off anyway.
1. Go to **Authentication**, then **Sign In / Providers** (or **Providers**, then **Email**). [VERIFY menu names]
2. Switch off **Allow new users to sign up**. [VERIFY]
3. Click **Save**.
The dashboard Settings page warns you if sign-ups are still open.

## Step 6. Copy the Project URL and the key
1. Go to **Project Settings**, then **API** (or **API Keys**). [VERIFY menu names]
2. Copy **Project URL**. It looks like `https://xxxx.supabase.co`.
3. Copy the **anon** key or the **publishable** key (starts with `sb_publishable_`). Do NOT copy the secret or service_role key.
4. Open the dashboard, **More**, **Settings**, **Cloud**.
5. Paste both values. (For Bhagwati Caterers they are already filled in.) Press **Connect cloud**.
6. The app restarts and asks for your email and password. Log in.

## Step 7. Move the data from the phone to the cloud
Do this on the phone that holds your data.
1. First take a backup: **Settings**, **Backup and data**, **Download backup (JSON)**. Keep the file.
2. Connect the cloud (Step 6) and log in.
3. In **Settings**, **Cloud**, press **Move my local data to the cloud**. Check the counts and confirm.
4. Open the dashboard on another phone, connect with the same project, log in. You should see the same data.
The copy on the old phone is not erased.
(Another way: on the new phone restore the JSON file from Step 1, using **Restore from a backup**, then **Merge**.)

## How backups work
- The free plan has **no automatic backups**. [VERIFY on supabase.com/pricing]
- A free project can be **paused after about 1 week without activity**. Your data stays, but you must click **Restore project** in the Supabase page. [VERIFY pause period]
- So: **every week, download a backup** (Settings, Download backup). Send the file to yourself on WhatsApp or save it in Google Drive.
- Using the dashboard every few days also keeps the project awake.
- The paid **Pro plan** adds daily backups and does not pause. [VERIFY price and features]
- Deleted records are only hidden in the database, so a developer can bring them back.

## The app works without internet
- With no internet you can still look at the last copy and make changes.
- Changes wait on your phone and upload when the internet returns. Settings, Cloud shows how many are waiting.
- If two phones change the same record, the newer change wins.
- Do not sign out or clear the browser while changes are waiting.

## If something goes wrong
- **"Wrong email or password"**: check Step 3. You can set a new password under Authentication, Users.
- **"Not allowed yet"**: you skipped Step 4, or used a different email. Run the line again with the right email.
- **Nothing loads, "No internet"**: check the internet. If the project was paused, open supabase.com, open the project, click **Restore project**. [VERIFY]
- **Changes refused by the server**: tap **Try again** in Settings, Cloud. If it keeps failing, take a backup and ask your developer.
- **Lost the phone**: log in on a new phone with your email and password. The data is in the cloud. Change your password in Supabase.
- **Forgot the password**: Authentication, Users, choose your user, send a password reset or set a new one. [VERIFY]
- **Wrong data after restore**: restore the earlier backup file with **Replace everything**.
- Never share the database password or the secret key. The dashboard never needs them.
