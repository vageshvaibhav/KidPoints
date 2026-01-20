
# Google Play Store Submission Guide (Android)

## 1. Privacy Policy Template
Apple and Google require a URL. Use this text on a free hosting site:
> **Privacy Policy for KidPoints**
> KidPoints does not collect, store, or share any personal user data. All information (children's names, point balances, and history) is stored locally on the user's device. We do not use cookies or tracking.
> Contact: [Your Email]

## 2. Play Console Data Safety Answers
When asked about Data Collection, choose these exactly:
- **Does your app collect or share any of the required user data types?** No.
- **Is all of the user data collected by your app encrypted in transit?** N/A.
- **Do you provide a way for users to request that their data be deleted?** Yes.

## 3. Play Store "Target Audience"
Because this app is for families:
- Select age groups: **5 and under, 6-8, 9-12**.
- Answer "Yes" to **"Could your store listing unintentionally appeal to children?"** (Since it's a family app, Google expects this).
- You must comply with the **Families Policy**.

## 4. Technical Build Commands
```bash
# Clean build
npm run build
npx cap copy
npx cap sync android
npx cap open android
```
In Android Studio:
1. Open `Variables.gradle` -> Ensure `minSdkVersion` is 22+.
2. Open `AndroidManifest.xml` -> Ensure `android:fullBackupContent="true"`.
