
# How to use SaveCarousel as an iOS Extension

Since SaveCarousel is a web application, you can easily integrate it into your iPhone's sharing menu using the **Shortcuts** app. This allows you to share an Instagram post directly to SaveCarousel without copying and pasting manually.

## Step 1: Create the Shortcut

1. Open the **Shortcuts** app on your iPhone.
2. Tap the **+** (plus) icon in the top right to create a new shortcut.
3. Tap **Add Action** and search for **"Open URLs"**. Select it.
4. Tap on the input field (it usually says "URL") and choose **Shortcut Input**.
5. Tap on **"Receive Any"** (or just "Input") at the top right (iOS 15+) or tap the info "i" icon to enable "Show in Share Sheet".
    - Make sure **"Receive What's on Screen"** or **"URLs"** is selected.
    - Set it to accept **URLs**.
6. Now, tap back on the action where it says **"Open Input"**. We need to construct a specific URL.
7. Instead of just opening the "Input", we need to open your app URL.
    - Search for **"URL"** action and add it *before* "Open URLs".
    - In the URL field, type: 
      `https://your-deployed-url.com/?url=`
    - Then tap the keyboard variable bar or "Select Variable" and choose **Shortcut Input**.
    - The final URL field should look like: `https://your-deployed-url.com/?url=` + `[Shortcut Input]`.
8. Change the **"Open URLs"** action to open the **URL** variable you just created in step 7.
9. Name your shortcut **"Save Carousel"** and give it an icon.

## Step 2: Use It

1. Open **Instagram**.
2. Go to a carousel post.
3. Tap **Share**.
4. Tap **"Share to..."** or scroll down to find your **"Save Carousel"** shortcut in the list.
5. Tap it.
6. The browser will open **SaveCarousel** with the link already pasted!
7. Just tap **Download**.

---

## Technical Details

The web application is configured to listen for a `?url=` query parameter.
- `src/components/Hero.tsx` checks for `searchParams.get('url')`.
- If found, it automatically pre-fills the input field.

**Note:** For this to work on your phone, you must first deploy the application (e.g., to Vercel) so you have a public `https://...` link. `localhost` will not work on your phone unless you are on the same Wi-Fi and use your computer's local IP address (e.g., `http://192.168.1.5:3000/?url=...`).
