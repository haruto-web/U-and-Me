A Little World for Eunice ♡
A Personal, Interactive Website Made Especially for the Two of You

The project is a private online space for you and Eunice to share memories, photos, letters, and little activities, especially when you are apart.

The goal is to create something meaningful, personal, and interactive—not just a website that displays pictures and messages.

## Website structure

### 1. Accounts and welcome
There are two user accounts: yours and Eunice's. You will also have the administrator role so you can manage the website's content. Eunice can use the personal features and contribute her own memories, photos, and letters.

After signing in, you will both arrive at the home page for your shared space.

### 2. Home
The home page will contain a personal greeting, navigation, featured memories, random compliments, and shortcuts to other activities.

### 3. Our little memories
This section is your shared digital scrapbook. Both of you can upload pictures, write descriptions, add dates, and revisit your memories.

For example, after a picnic together, either of you can add pictures and write about the day.

You can keep adding to this collection over time.

### 4. Letters for you
Both of you can write personal letters for the other person. Letters can appear as interactive envelopes with prompts such as:

Instead of showing the letters immediately, you can present them as interactive envelopes.

Each envelope will have a different purpose, such as:
- Open when you're sad.
- Open when you miss me.
- Open when you need encouragement.
- Open when you can't sleep.
- Open when you need a smile.
When one of you opens an envelope, it reveals the letter.

### 5. A garden for you
This section will be an interactive virtual garden.

You'll create a digital garden filled with different flowers.

Every flower will contain a message.

For example, when Eunice clicks a sunflower, a message appears on the screen. Other flowers can reveal different messages.

You can also add animations, butterflies, and flower-blooming effects.

The purpose is to make exploring the website fun and give Eunice little reminders that she is appreciated.
### 6. Our little photobooth
This is one of the most interesting features of the project.

The virtual photobooth can let the two of you take pictures together using your own devices, even when you are in different locations.

One of you creates a photobooth room, and the other joins using a room code. Once connected, both cameras appear on screen.

Then you can start a countdown.

Three, two, one... SNAP!

The website will capture both of your photos and combine them into one picture.

You can also choose different photo frames, add stickers, create photo strips, and save the results to your personal gallery.

This feature will use WebRTC for live camera communication. Reliable use across different networks may require extra setup or a paid TURN relay.

### 7. Little surprises
This section will make the website more entertaining.

You'll create different interactive activities, including:
- Random Compliments: A button that displays a random sweet message.
- Mystery Gift: A member clicks a virtual gift box to reveal something.
- Hidden Messages: Little messages hidden throughout the website.
- Mini Quiz: Questions about your shared memories or things about you.
- Surprise Button: A button that reveals an unexpected message or animation.
You can add new surprises through your administrator dashboard.
### 8. A special page
This will be the most personal section of the website.

This page can hold a message about why you created the website for Eunice.

You can include your favorite photos, a personal letter, and a special message.

Unlike the other sections, this page doesn't need many interactive features.

Its purpose is to give her something meaningful to revisit.

### 9. Administrator dashboard

The protected admin corner lets you create, edit, and delete shared content without editing the source code every time.

The dashboard will let you:
- Add, edit, and delete memories.
- Manage memory text and dates. Photo uploads are planned separately.
- Write and manage letters for Eunice.
- Add flower messages, compliments, and surprises.
- Manage special-page text.

Eunice can add memories and write letters for you. Your administrator role lets you manage all shared text content. Members cannot yet edit or delete their own submissions.

### 10. Technology and local-only operation

The website is built with Next.js, React, TypeScript, and CSS. Supabase provides sign-in, private account roles, database policies, and shared content.

The website UI runs on your computer only; it will not be deployed publicly. Supabase is online, so the app requires an internet connection and stores account/content data in your Supabase project.

Public sign-ups are disabled; create the two accounts through Supabase Dashboard and grant your account admin access using the database setup steps. The app binds to `127.0.0.1`, which means Eunice cannot open it from her own device. Photo uploads and WebRTC will be implemented later.

See [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) to create the two accounts, initialize the database, and run the website.

### 11. What the completed website will include
1. Private sign-in for you and Eunice, with an administrator role for you.
2. A personalized home page.
3. A digital scrapbook for memories.
4. An interactive letter collection.
5. A virtual flower garden.
6. A real-time virtual photobooth.
7. An interactive surprises and mini-games section.
8. A personalized special page.
9. An administrator dashboard for managing the shared content.

### 12. The bigger picture

You're building more than a website where Eunice reads your messages.

You're building a place where the two of you can continuously collect and share experiences.

For example:
- After your next date, you can add pictures to the memories section.
- Either of you can write a letter for the other.
- You can add encouraging messages and little surprises.
- When you are far apart, you can open the photobooth and take pictures together.
The website becomes a collection of experiences you can keep building together.

My vision for the project:

"A little world where distance doesn't stop you from creating memories, where little messages can brighten someone's day, and where even the simplest moments have a place to stay."

That's what A Little World for Eunice is all about. ♡