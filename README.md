# QuickTask
A simplistic but clean task manager for web, iOS, and Android.

## Set-up

1. Clone repo

   ```bash
   git clone https://github.com/nathanmandell99/QuickTask
   cd QuickTask
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

From here, press `w` in the CLI to open the web version. To view the app
version, it is simplest to use [Expo Go](https://expo.dev/go), which can be installed from
the App Store or the Play Store. Once Expo Go is installed, open it
and select "Scan QR Code." Scan the QR code printed on the CLI after
having completed step 3, and QuickTask will be opened. Note that
the mobile device running Expo Go must be connected to the same
WiFi network as the system running `npx expo start`.

## Use

1. **Create Task:** The application starts off without any tasks. To
create a task, press "New Task" at the bottom of the screen, then
fill in a task title (required) and a short description (optional,
cannot exceed 100 characters). Once these are filled in, press "Create
Task." You will be returned to the task list and the new task will
appear.

2. **Mark Task Complete**: A task can be marked complete by tapping/clicking
on the checkbox. It will be moved to the "Completed" section.
Note that a complete task can also be moved back to the "Tasks"
section by tapping/clicking on the checkbox again.

3. **Delete Task:** To delete a task, simply press the "Delete"
button to the right of the task title/description. This can be done
regardless of whether a task is marked as complete or not.

## Third-Party Libraries

`react-native-safe-area-context` was used to guarantee proper layout
handling.
