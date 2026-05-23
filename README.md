# Daystack 🧘 Radical Minimalist Focus Tracker

> **Blazing fast. 100% Private. Offline-First.**

## Core Concept

A minimal, single-page tracker for both daily habits and one-off tasks.

- **Recurring Tasks**: Added in the **Recurring** tab. These form your daily "pool" and reset every morning (un-done and un-struck) so you can do them again.
- **One-off Tasks**: Added in the **For Today** tab. These are temporary items that stay in your list until they are marked **Done**.
- **Midnight Reset**: Every day at midnight, completed one-off tasks are deleted, while recurring tasks are automatically restored to the "For Today" list.

---

## Core Values

1. 🌿 **Radical Minimalism**: No bloat, no complex menus. Single-file architecture for maximum clarity.
2. 🚀 **Blazing Speed**: Instant interactions and a load time of **0.01ms**.
3. 🔐 **Data Ownership**: No cloud servers. Your tasks stay on your drive via the **File System Access API**.
4. 🔌 **Offline-First**: Designed to work 100% offline with zero external requests.
5. ✨ **Premium UX**: Professional glassmorphic design with heart-melting micro-animations.
6. 🧠 **Intentional Flow**: Intelligently handles the difference between **habits** (recurring) and **goals** (one-off).
7. 🧘 **Focus Hierarchy**: Organize tasks into collapsible groups to clear mental clutter.

---

## Key Features

- ✨ **Premium Design**: Modern, clean, glassmorphic UI with smooth micro-animations.
- 📁 **Pro File Handling**: Overwrites existing files using the File System Access API (no duplicate downloads!).
- ⌨️ **Power User Shortcuts**: Press `Ctrl + S` to save instantly, and `Esc` to close settings or inputs.
- 💾 **Persistence**: Active file handle is saved in IndexedDB; it remembers your file even after a refresh.
- 🔄 **Smart Reset**: Automatically distinguishes between daily habits and one-off tasks. Now operates in real-time (no refresh needed at midnight) and intelligently refreshes imported legacy data.
- 🔁 **Interactive Toggle**: Click the `↻` icon on any task to switch between Recurring and One-off.
- ⏰ **Reset Countdown**: Live "Next Reset" timer in the header shows exactly when the pool will refresh.
- 🧘 **Zen Breath**: A beautiful, rhythmic water ripple background effect that pulses from the center, making the entire app feel alive and calm.
- 🌙 **Dark Mode**: Sleek dark theme that persists across sessions.
- 🌓 **Dynamic Theme**: Automatically switches between light and dark mode based on the time of day (Default).
- ⚙️ **Settings Modal**: Redesigned premium glassmorphic panel with sticky navigation and enhanced aesthetics for effortless control.
- ✏️ **Inline Editing**: Double-click any task, subtask, or group to rename it in-place.
- ☁️ **Smart Cloud Sync**: Dedicated `☁↑` (Push) and `☁↓` (Fetch) buttons in the header for total control. Performs an intelligent conflict check before every sync to prevent data loss.
- 🚀 **Blazing Fast**: Single-page architecture with zero external dependencies.
- 📱 **Hyper-Compact UI**: Utilities (Save/Load) and the Reset Timer are integrated into the search and group bars. Features an adaptive mobile layout that intelligently prioritizes space for controls on small screens.
- ↕️ **Master Toggle**: Expand or collapse all groups in a tab with a single click.
- 🧘 **Group Hierarchy**: Distinct, tinted group headers with clear visual separation for better structure.
- 💓 **The Heartbeat**: A silent 1-minute engine that powers all real-time logic (Reset, Auto-Save, Zen Breath, and Focus Pings).
- ✨ **Interactive Onboarding**: New users are guided by a premium, glassmorphic tour that highlights core features and helps create the first task.
- 📱 **Touch Gestures**: Full mobile support for renaming via **Double-Tap** or **Long-Press** on any task or group.
- 🔔 **Single-File Notifications**: Seamless browser notifications on Desktop and Phone using the Standard Notification API.
- 🗂️ **Collapsible Today Sections**: The "For Today" tab is split into two collapsible blocks — **Habits & Routines** (recurring tasks) and **Daily Targets** (one-off tasks) — so you can focus on one area at a time and reduce visual overwhelm.
- 👁️ **Hide Checked Tasks**: A Settings toggle lets you instantly hide all struck-through tasks from the "For Today" view, keeping your list clean and clutter-free.
  - **Customizable Messages**: Craft your own personalized notification messages to stay uniquely motivated.
  - **Randomized Focus Nudges**: Option to auto-randomize messages using a built-in pool of friendly, scientifically-backed focus prompts.
  - *(Note: Mobile notifications require **HTTPS**. To support background notifications on Chrome for Android, you must use the optional **sw.js** file provided in this repository and enable the registration code in the script section).*

## Tabs

| Tab | Purpose |
|---|---|
| For Today | Two collapsible sections: **Habits & Routines** (recurring) and **Daily Targets** (one-off) |
| In Progress | Tasks you're actively working on |
| Done | Completed tasks |
| Recurring | Master list of all daily tasks, add/edit/delete recurring tasks |

---

## Task States

| State | Location | Visual |
|---|---|---|
| Fresh | For Today | Normal text |
| Recurring | Any | Green `↻` icon (Active) |
| One-off | Any | Grey `↻` icon (Inactive) |
| Clicked once | For Today | ~~Strikethrough~~ + In Progress tab |
| Clicked again | For Today | Back to Normal + removed from In Progress |
| Clicked in In Progress | Done | ~~Strikethrough~~ |
| Subtasks all done | Done | ~~Strikethrough~~ |
| Deleted | Gone | - |

**Key rule:** Strikethrough in For Today = will return tomorrow (un-strikethrough at midnight).
Task in In Progress = no strikethrough (already in progress, showing in its own tab).

---

## Column Definitions

### For Today
- Split into two collapsible sections:
  - **Habits & Routines**: tasks with `source === 'daily'`
  - **Daily Targets**: tasks with `source === 'oneoff'`
- Both sections can be collapsed/expanded independently with their toggle arrows.
- `_struck === true` tasks remain VISIBLE with strikethrough by default.
- Enable **Hide Checked** in Settings to hide all struck-through tasks instantly.
- `_done === true` tasks are HIDDEN.

### In Progress
- Shows: `_struck === true && _done === false`
- Title: NO strikethrough
- Click task title → markDone → moves to Done

### Done
- Shows: `_done === true`
- All subtasks auto-struck
- Undo button always visible (per task)
- NO add-task input

### Recurring
- Shows: all `source === 'daily'` tasks (master list)
- Add task → creates `source === 'daily'` task
- Click task → no-op (read-only)
- Clear all → deletes all daily tasks
- Can add subtasks and set priority

---

## Filter Bar

Each column has a filter bar above the task list:

### For Today
- **Priority filter**: All / red / yellow / blue / none
- **Status filter**: All / In Progress (struck) / Not Started (not struck)
- **Sort**: toggle priority sort (red → yellow → blue → none)

### In Progress / Done / Recurring
- **Priority filter**: All / red / yellow / blue / none
- **Zen Breath**: Interface elements subtly breathe to feel alive.
- **Cloud Backup & Sync**: Free, user-controlled cloud backup via GitHub Gists.
- **Radical Portability**: Export/Import your entire state as a single JSON file.

> [!CAUTION]
> **Your GitHub Token is NEVER saved in your backup files.** 
> For security, Daystack automatically strips your Personal Access Token from all JSON exports and GitHub Gists. This prevents GitHub from automatically revoking your token and keeps your credentials private. Never share your active token with anyone.

---

## ☁️ Cloud Sync & Security

Daystack offers a free, user-controlled cloud backup using GitHub Gists.

### 🛡️ Security First
Your GitHub Token is stored only in your browser's **IndexedDB/Local Storage** and is protected by the **Same-Origin Policy**.

- **Automatic Stripping**: To prevent accidental leaks and auto-revocation by GitHub, Daystack **automatically removes** your token from all Gist uploads and JSON file exports. 
- **Fine-grained Access**: We strongly recommend using a **Fine-grained Personal Access Token** limited ONLY to "Gists" (read/write). This ensures that even if the token were compromised, an attacker would have NO access to your repositories or account.

### 📖 Cloud Sync Setup Guide

To enable cross-device sync, follow these steps:

#### 1. Generate a GitHub Token
1. Go to your GitHub [Personal Access Tokens](https://github.com/settings/tokens?type=beta) (Fine-grained).
2. Click **Generate new token**.
3. **Name**: `Daystack Sync`.
4. **Expiration**: Choose "No expiration" (or your preference).
5. **Permissions**: 
   - Click **Account permissions**.
   - Find **Gists** and select **Access: Read and write**.
6. Click **Generate token** and copy the code starting with `github_pat_`.

#### 2. Configure Daystack
1. Open Daystack **Settings** (⚙ icon).
2. Enable **Cloud Backup & Sync**.
3. Paste your **GitHub Token**.
4. **Gist ID**: Leave this **blank**. Daystack will automatically discover your existing backup or create a new one for you.
   - *Note: You only need to paste a Gist ID manually if you want to connect to a specific, non-Daystack Gist.*
5. Click **Close & Apply**.

---

## 🛠️ Features Deep-Dive

### The Heartbeat 💓
Daystack uses a silent "Heartbeat" (a 1-minute periodic check) to power its most intelligent features:
- **Real-time Reset**: Detects midnight transitions instantly.
- **Zen Breath**: Synchronizes the meditative UI pulse and the ambient "Water Ripple" background.
- **Auto-Save**: Manages background disk syncing. Now supports **Instant Save** (frequency 0) for truly real-time disk persistence.
- **Focus Pings**: Triggers periodic visual nudges and cross-platform browser notifications.
- **Cloud Sync**: Checks for remote updates every minute and intelligently syncs local changes (skips if no data has changed). Now features **Smart Sync** with dedicated header buttons (`☁↑` and `☁↓`) and a **Conflict Dialog** to prevent accidental overwrites.
- **Intelligent Conflict Resolution**: Follows industry best practices by silently auto-pulling background updates when the cloud is newer and you have no unsaved local changes. If you do have local changes, it safely pauses sync and warns of the conflict, offering you the choice to either Restore (Fetch) or Overwrite (Push).

### Settings Modal
Accessed via the ⚙️ icon. Controls:
- **Zen Breath**: Toggle rhythmic UI breathing.
- **Night Shift**: Dims inactive tasks late at night (10 PM - 5 AM).
- **Hide Checked (For Today)**: When enabled, struck-through tasks are hidden from the "For Today" tab, keeping your active list clean and focused.
- **Auto-Save**: Periodically syncs to your disk file (0 = Instant real-time saving).
- **Focus Pings**: Periodic glow on active tasks, customizable/randomized browser notifications, and **Haptic Feedback** (Vibration) for mobile users. Includes a **Test Notification** preview button.
- **Notification Customization**: Define a tailored notification message or toggle **Auto-Randomize Messages** to send fresh, randomized focus prompts.
- **Reset Time**: Customizable daily refresh time (e.g., 04:00 AM).
- **Cloud Sync Frequency**: Control how often background syncs occur (0 = Instant).
- **Reset Gist**: Manually clear Gist history and start a fresh cloud backup.
- **Save Optimizations**: Settings are now saved only when modified, preventing unnecessary sync cycles.

### Persistence & Portability
- **Native File Sync**: Use the File System Access API to save directly to your computer.
- **Cloud Backup**: Integrated GitHub Gist sync.
- **JSON Export**: One-click backup of your entire focus state.

---

## ⌨️ Keyboard Shortcuts
- `Ctrl + S`: Save instantly to disk.
- `Alt + 1-4`: Switch tabs (Today, Progress, Done, Recurring).
- `Enter`: Confirm task/subtask.
- `Esc`: Cancel/Close inputs, or close Settings modal.

---

## 📱 Mobile Support
- Double-tap or Long-press to rename tasks and groups.
- Haptic feedback on touch interaction.
- Responsive layout optimized for one-handed use.
- Responsive layout optimized for one-handed use with full support for browser notifications and haptic feedback.

---

## 🏗️ Technical Details
For information on the **Data Model**, **Internal Logic**, and **Reset Rules**, please see [DEVELOPMENT.md](DEVELOPMENT.md).

---

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
