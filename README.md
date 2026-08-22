# ToDoList Plugin for Obsidian

Automatically sorts your checklists in Obsidian. Unfinished tasks go under `### Open`, completed tasks under `### Completed`. No more manual dragging – just add a marker and let the plugin do the work.

## Why this plugin?

If you have notes with many checklists, it's easy to lose track of what's done and what's not. This plugin automatically groups your tasks into two clean sections, keeping your notes organized and your focus clear.

## Installation

### From Obsidian Community Plugins (once approved)
1. Open **Settings** → **Community plugins**.
2. Click **Browse** and search for **ToDoList**.
3. Install and enable the plugin.

### Manual installation (before approval or for development)
1. Download the latest release from the [GitHub releases page](https://github.com/SasunHuevich/todolist-sorter/releases).
2. Extract the files into `<your vault>/.obsidian/plugins/todolist-sorter/`.
3. Reload Obsidian and enable the plugin in **Settings** → **Community plugins**.

## Usage

1. Add the marker `%% ToDoList %%` anywhere in any `.md` file (e.g., at the top or bottom).
2. Write your tasks using one of the supported checklist formats:
   - `- [ ] Task not done`
   - `* [ ] Another open task`
   - `- [x] Completed task`
   - `- [X] Completed task (capital X)`
   - `* [x] Completed with asterisk`
   - `* [X] Completed with asterisk and capital X`
3. Save the file. The plugin will automatically:
   - Move all open tasks under the heading `### Open`.
   - Move all completed tasks under the heading `### Completed`.
   - Keep all other text (non-task lines) at the top of the file.

**Example:**

Before saving:

```
%% ToDoList %%

- [ ] Buy groceries
- [x] Call mom
Some note text
```

After saving:
```
%% ToDoList %%
Some note text

### Open
- [ ] Buy groceries

### Completed
- [x] Call mom
```


## Notes

- The plugin only processes files that contain the marker `%% ToDoList %%`. Other files are left untouched.
- Nested lists (with indentation) are not currently supported – tasks must start with `- [ ]` or `* [ ]` at the beginning of a line.
- The plugin rewrites the entire file, so it's best used in notes where this structure is desirable.

## License

[MIT](LICENSE)

## Author

**Ivan Petrov**  
GitHub: [@SasunHuevich](https://github.com/SasunHuevich)