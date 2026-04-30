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
- ⌨️ **Power User Shortcuts**: Press `Ctrl + S` to save instantly.
- 💾 **Persistence**: Active file handle is saved in IndexedDB; it remembers your file even after a refresh.
- 🔄 **Smart Reset**: Automatically distinguishes between daily habits and one-off tasks at midnight.
- 🔁 **Interactive Toggle**: Click the `↻` icon on any task to switch between Recurring and One-off.
- ⏰ **Reset Countdown**: Live "Next Reset" timer in the header shows exactly when the pool will refresh.
- ✏️ **Inline Editing**: Double-click any task or subtask to rename it in-place.
- 🌙 **Dark Mode**: Sleek dark theme that persists across sessions.
- 🚀 **Blazing Fast**: Single-page architecture with zero external dependencies.
- 📱 **Hyper-Compact UI**: Utilities (Save/Load) and the Reset Timer are integrated into the search and group bars to maximize vertical space.
- ↕️ **Master Toggle**: Expand or collapse all groups in a tab with a single click.

## Tabs

| Tab | Purpose |
|---|---|
| For Today | Combined list of your Recurring pool + One-off tasks |
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
- Shows: all tasks (both `source === 'daily'` and `source === 'oneoff'`) that are not `_done`.
- `_struck === true` tasks remain VISIBLE with strikethrough (not hidden).
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
- **Sort**: toggle priority sort

**Badge counts** show unfiltered total per column.

---

## Interactions

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

### Delete task (× button)
1. Remove from `state.tasks`
2. localStorage saved
3. If was struck → won't return tomorrow

### Undo (Done tab)
1. Reset `task._done = false`
2. Restore `task._struck = true` → task returns to In Progress
3. Reset all `subtask.done = false`
4. Reset `task._undone = false`

### Add task
- From **For Today / In Progress** → `source = 'oneoff'` → gone tomorrow (once done).
- From **Recurring** → `source = 'daily'` → returns every day.
- **No duplicate titles** → same title+source combination blocked.

### Add subtask
- Press Enter → saves subtask → new empty subtask input auto-opens and focuses
- Press Escape → closes input without saving
- Click outside input → closes input

### Edit task/subtask
- **Double-click** any task or subtask title to edit in-place.
- Press Enter to save, Esc to cancel.

### Drag and Drop
- **Reorder**: Drop a task on another task to change its position.
- **Move to Group**: Drop a task onto a **Group Header** in a column OR onto a **Group Tag** in the top bar to reassign it.

### Toggle Recurring
- Click the `↻` icon to swap between **Recurring** (green) and **One-off** (grey).
- Recurring tasks return tomorrow; One-off tasks are deleted once done.

### Clear all (per column)
- **For Today**: Deletes all active (not-done) tasks from the list.
- **In Progress**: Un-strikes all tasks (moves them back to For Today).
- **Done**: Deletes all completed tasks permanently.
- **Recurring**: Deletes all daily tasks from the master pool.

---

## Daily Reset (on page load)

Compare `lastActiveDate` vs today's date (`YYYY-MM-DD`):

1. **Recurring tasks** (`source === 'daily'`):
   - `_struck = false`
   - `_done = false`
   - all `subtask.done = false`
2. **One-off tasks** (`source === 'oneoff'`):
   - If `_done === true` → **Deleted** (disappears from Done).
   - If `_done === false` → **Persists** (stays in Tasks/In Progress).
3. Update `lastActiveDate = today()`
4. Save to localStorage

---

## Priority

- Optional per-task: red / yellow / blue / none
- Labels: red=high, yellow=medium, blue=low
- Click color dot → opens priority picker
- Click outside picker → closes picker

---

## Dark Mode

Toggle button (☀/☾) in header, next to Save/Load.
Persisted in localStorage key `daystack_theme` (`'light'` | `'dark'`).

---

## Persistence

- **Tasks**: localStorage key `taskTracker_v1`
- **Theme**: localStorage key `daystack_theme`
- Auto-saves after every action

### Export/Import (File System Access API)
- **Save** → Overwrites current file if one is active, otherwise opens a picker.
- **Load** → File picker → Imports from JSON and sets as active file.
- **Save As** → Right-click the **Save** button to choose a new location.
- **Persistence** → The active file handle is saved in **IndexedDB**, allowing saves to work across page refreshes.
- **Unsaved Indicator** → A red dot appears on the Save button when local changes haven't been written to the file.
- **Visual Feedback** → Buttons briefly change to "Saved!" or "Loaded!" on success.
- **Fallback** → Automatically uses standard download/upload in non-supported browsers.

### Search & Groups
- Global search bar at the top, integrated with file management utilities.
- Group bar allows filtering by project/category and includes the daily reset countdown.
- Filters tasks and subtasks in real-time across all tabs.

---

## Data Model

```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "source": "daily" | "oneoff",
      "priority": "none" | "red" | "yellow" | "blue",
      "subtasks": [
        { "id": "string", "title": "string", "done": boolean }
      ],
      "createdAt": "ISO date",
      "_struck": boolean,
      "_done": boolean,
      "_undone": boolean
    }
  ],
  "lastActiveDate": "YYYY-MM-DD"
}
```

---

## Keyboard

- **Add task input**: Enter to confirm, Esc to cancel
- **Subtask input**: Enter to save and open new input, Esc to cancel/close
- **Shortcuts**: 
  - `Ctrl+S` (or `Cmd+S`) to save instantly to the active file.
  - `Alt + 1` through `Alt + 4` to switch between tabs (Today, Progress, Done, Recurring).

---

## Responsive (Mobile)

- Header stacks vertically (tabs on top, file buttons below)
- Tab bar horizontally scrollable with snap
- Filter labels hidden on mobile
- Undo button always visible (no hover on mobile)
- Larger touch targets on inputs and task rows

---

## Edge Cases

- Empty columns → show "No tasks here yet" placeholder
- Subtask-only done → parent moves to Done
- Undo restores task to In Progress (not For Today)
- No subtasks → clicking task in In Progress → moves to Done
- Duplicate title+source → blocked, input cleared
- `_undone` field deprecated (always `false`)

---

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
