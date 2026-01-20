
# KidPoints: Go-Live Master Checklist

Follow this checklist to move from this development environment to the App Stores.

## Phase 1: Accounts & Identity
- [ ] Create Google Play Console Account ($25 one-time).
- [ ] Create Apple Developer Account ($99/year).
- [ ] Reserve the name "KidPoints" on both stores.
- [ ] Ensure Bundle ID `com.vageshvaibhav.kidpoints` is consistent everywhere.

## Phase 2: Branding Assets
- [ ] **App Icon:** 1024x1024 PNG (No transparency for iOS).
- [ ] **Android Feature Graphic:** 1024x500 PNG.
- [ ] **Screenshots:** 
    - At least 4 Phone screenshots (1242 x 2688 px).
    - At least 2 Tablet screenshots (2048 x 2732 px).

## Phase 3: Android Build (Priority)
1. Run `npx cap add android`.
2. Run `npx cap sync android`.
3. Open Android Studio: `npx cap open android`.
4. Update `versionCode` in `build.gradle` to `1`.
5. **Build > Generate Signed Bundle** (.aab).
6. Upload to Google Play Console.

## Phase 4: Apple Build
1. Run `npx cap add ios`.
2. Run `npx cap sync ios`.
3. Open Xcode: `npx cap open ios`.
4. Set "Team" in Signing & Capabilities.
5. **Product > Archive**.
6. **Distribute App** via App Store Connect.

## Phase 5: Submission Questionnaire
- [ ] **Content Rating:** Select "Everyone" / "Low Maturity".
- [ ] **Data Safety:** Declare NO data is collected (everything is LocalStorage).
- [ ] **Target Audience:** Select Ages 5-12.
- [ ] **Privacy Policy:** Link to your hosted policy (Template in android_deployment_guide.md).
