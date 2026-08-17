Fastlane build instructions

This project is configured to build native artifacts using Fastlane.

Prerequisites:
- Ensure the native `android/` and `ios/` folders are present in the repository (Fastlane runs against the native projects). Create native projects using the React Native CLI or commit existing native projects.
- Install dependencies (Node, Ruby, CocoaPods for iOS, Android SDK for Android) and Fastlane.

Android build (from repo root):
```bash
npm ci
npm run build:android:fastlane
```

iOS build (macOS required):
```bash
npm ci
npm run build:ios:fastlane
```

Notes:
- For Android signing, place your keystore in a secure location and configure `android/gradle.properties` or environment variables as documented in the CI workflow.
- For iOS, configure provisioning and signing (the iOS Fastlane lane includes a `match` placeholder; configure `match` or provide certificates/profiles manually).

Fastlane files were added under `android/fastlane` and `ios/fastlane` as starting points. Adjust schemes, package names, and match/keystore settings before running on CI.
