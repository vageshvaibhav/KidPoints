
# Apple App Store Submission Secrets

To get **KidPoints** approved by Vagesh Vaibhav on the first try, you must follow these Xcode-specific instructions precisely.

## 1. Preparing for Xcode
Ensure you have a Mac with Xcode 15+ installed.
```bash
# Compile and open in Xcode
npx cap add ios
npx cap sync ios
npx cap open ios
```

## 2. Xcode Configuration (Mandatory)
Apple will reject the app if these are not set:
- **Bundle ID**: Ensure it is `com.vageshvaibhav.kidpoints`.
- **Signing**: Under the "Signing & Capabilities" tab, select your "Team". Apple requires an active Developer Program membership ($99).
- **Icons**: You must provide a 1024x1024 "App Icon" in the `Assets.xcassets` folder. Use the Flaticon icon in `manifest.json` as a source.
- **Launch Screen**: Apple prefers a simple logo centered on a solid background.

## 3. Submission Secrets
When filling out the App Store Connect form:
- **Reviewer Account**: Under "App Review Information", check "Sign-in required" is **OFF**. In the "Notes" section, write: *"This app is a family utility that uses local-on-device storage. No user accounts are required to test the core features."*
- **App Category**: Lifestyle > Education.
- **Content Rights**: Select "This app does not contain third-party content."
- **Privacy Policy URL**: Provide a simple GitHub Pages link to the text in your app's "Legal" section.

## 4. Final Approval Check
Apple Reviewers are strict about web-like behaviors. This build includes:
- `user-select: none` to prevent the "magnifying glass" on text.
- `env(safe-area-inset-top)` to avoid the notch/island.
- `overflow: hidden` on the body to prevent the "overscroll white space".

**You are now ready. Upload to TestFlight and submit for review!**
