# Daily Focus

A React Native mobile app for tracking daily tasks and building a consistent routine. It runs on Android and iOS.

## Features

- Track daily progress
- Mark tasks as complete
- Add new focus tasks
- View a daily streak
- Native Android and iOS experience

## Build Locally with Fastlane

This repository now uses Fastlane for native builds. It expects native `android/` and `ios/` folders to already exist in the repo (either committed after running `expo prebuild` locally or created manually).

Install dependencies:

```bash
npm ci
```

Android (Linux/macOS/CI):

```bash
npm run build:android:fastlane
```

iOS (macOS required):

```bash
npm run build:ios:fastlane
```

See [FASTLANE.md](FASTLANE.md) for more details about signing and CI.

## Build and Upload to Sauce Labs

The workflow in [.github/workflows/build-upload-sauce.yml](.github/workflows/build-upload-sauce.yml) builds an Android APK with EAS, uploads it to Sauce Labs storage, and runs an Appium smoke test on an Android device. It runs on pushes to `main` or from **Actions > Build Expo APK and Upload to Sauce Labs > Run workflow**.

Add these repository secrets under **Settings > Secrets and variables > Actions**:

| Secret | Value |
| --- | --- |
| `EXPO_TOKEN` | Expo access token created with `eas token:create` |
| `SAUCE_USERNAME` | Sauce Labs username |
| `SAUCE_ACCESS_KEY` | Sauce Labs access key |

The workflow also keeps a downloadable APK as a GitHub Actions artifact. The uploaded Sauce Labs app identifier is based on `daily-focus.apk`; use the identifier returned by the Sauce upload response in your Appium capabilities, for example `storage:filename=daily-focus.apk`.

The smoke test is in [tests/sauce-smoke.mjs](tests/sauce-smoke.mjs). It verifies that the Daily Focus screen opens and saves a Sauce Labs screenshot.

## Project Structure

- `App.js`: Expo entry point
- `src/App.jsx`: React Native screen and task logic
- `app.json`: Android/iOS app metadata
