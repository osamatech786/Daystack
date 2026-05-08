# Daystack Development & Internal Logic

This document contains technical details, internal logic, and the data architecture for Daystack. 🧘

## Data Model

The Daystack state is a single JSON object persisted in `localStorage` under the key `taskTracker_v1`.

```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "projectId": "string" | "none",
      "source": "daily" | "oneoff",
      "priority": "none" | "red" | "yellow" | "blue",
      "subtasks": [
        { "id": "string", "title": "string", "done": boolean }
      ],
      "createdAt": "ISO date",
      "_struck": boolean,
      "_done": boolean,
      "_undone": boolean,
      "order": number
    }
  ],
  "projects": [
    {
      "id": "string",
      "title": "string",
      "collapsed": { "today": boolean, "progress": boolean, "done": boolean, "recurring": boolean }
    }
  ],
  "settings": {
    "theme": "dynamic" | "light" | "dark",
    "zenBreath": boolean,
    "nightShift": boolean,
    "resetTime": "HH:mm",
    "autoSave": boolean,
    "autoSaveFreq": number,
    "savePulse": boolean,
    "focusPings": boolean,
    "focusFreq": number,
    "notifications": boolean,
    "cloudSync": boolean,
    "cloudToken": "string",
    "cloudGistId": "string",
    "cloudAutoSync": boolean,
    "cloudLastSync": "ISO date string"
  },
  "lastActiveDate": "YYYY-MM-DD",
  "generalCollapsed": { "today": boolean, "progress": boolean, "done": boolean, "recurring": boolean }
}
```

## Internal Interactions

### Click task in For Today
1. Set `task._struck = true`
2. Task remains visible with strikethrough in For Today
3. Task also appears in In Progress
4. localStorage saved

### Click task title in In Progress
1. Set `task._done = true`
2. Task moves to Done tab

### Click subtask checkbox (any column)
1. Toggle `subtask.done`
2. If ALL subtasks done → `task._done = true`, `task._struck = false`

### Undo (Done tab)
1. Reset `task._done = false`
2. Restore `task._struck = true` → task returns to In Progress
3. Reset all `subtask.done = false`

### Daily Reset Rules
The app compares `lastActiveDate` vs today's date (`YYYY-MM-DD`) based on the `resetTime` threshold.

1. **Recurring tasks** (`source === 'daily'`):
   - `_struck = false`, `_done = false`
   - all `subtask.done = false`
2. **One-off tasks** (`source === 'oneoff'`):
   - If `_done === true` → **Deleted**
   - If `_done === false` → **Persists**
3. Update `lastActiveDate = today()`

## Persistence
- **localStorage**: Primary storage for web sessions.
- **File System Access API**: Allows syncing state directly to a `.json` file on disk.
- **IndexedDB**: Stores the file handle to maintain the link across sessions.
- **GitHub Gists**: Provides cloud sync/backup using a user-provided token.

## Edge Cases
- Subtask-only completion moves parent to Done.
- Undo restores to In Progress (not For Today).
- Duplicate title+source combinations are blocked.
- `_undone` field is legacy/deprecated.

## Notifications & Service Worker

Daystack prioritizes a "Single HTML File" architecture. However, modern mobile browsers (specifically Chrome on Android) require a separate physical Service Worker file to support background notifications.

1. **Portable Mode (Default)**: The app runs perfectly as a single file. Notifications use the standard `Notification` API, which works on mobile while the app tab is active.
2. **Full Mobile Support**: To enable background notifications on Android, the `sw.js` file from the repository must be placed in the root directory, and the `registerSW()` call in the `index.html` script section must be uncommented.
3. **Developer Fallback**: If `new Notification()` fails (illegal constructor error on mobile), the app provides a detailed console error and alert explaining the requirement for `sw.js`.
4. **Haptic Feedback**: The app triggers `navigator.vibrate` during focus pings as a high-fidelity alternative for mobile users when system notifications are restricted.
