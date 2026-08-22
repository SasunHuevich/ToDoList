'use strict'
var obsidian = require('obsidian')
const { TFile } = require('obsidian');

const MARKER_PLUGIN_IS_ON = '%% ToDoList %%'
const PREFIXES_OPEN = ['- [ ] ', '* [ ] ']
const PREFIXES_COMPLETED = ['- [x] ', '- [X] ', '* [x] ', '* [X] ']
const HEADER_OPEN = '### Open'
const HEADER_COMPLETE = '### Completed'


class ToDoList extends obsidian.Plugin {
    checkPluginActive(content) {
        return content.includes(MARKER_PLUGIN_IS_ON);
    }

    checkPluginStructure(content) {
        return content.includes(HEADER_OPEN) && content.includes(HEADER_COMPLETE)
    }

    recreatePluginStructure(content) {
        const lines = content.split('\n');

        const otherLines = [];
        const openTodo = [];
        const completedTodo = [];
        
        outerLoop: for (const line of lines) {
            const trimmed = line.trim();

            for (const prefix of PREFIXES_OPEN) {
                if (trimmed.startsWith(prefix)) {
                    openTodo.push(trimmed);
                    continue outerLoop;
                }
            }

            for (const prefix of PREFIXES_COMPLETED) {
                if (trimmed.startsWith(prefix)) {
                    completedTodo.push(trimmed);
                    continue outerLoop;
                }
            }
            
            if (trimmed != '' && trimmed != HEADER_OPEN && trimmed != HEADER_COMPLETE) {
                otherLines.push(trimmed);
            }
            
        }

        const newLines = []

        newLines.push(...otherLines);

        newLines.push('');
        newLines.push(HEADER_OPEN);
        newLines.push(...openTodo);

        newLines.push('');
        newLines.push(HEADER_COMPLETE);
        newLines.push(...completedTodo);

        return newLines.join('\n');
    }

    async rewriteFile(file, newContent) {
        try {
            await this.app.vault.modify(file, newContent);
        } catch (error) {
            console.log(`ToDoList: ошибка "${error}" при перезаписи файла "${file.name}".`);
            return;
        }
        
        console.log(`ToDoList: файл "${file.name}" обновлён.`);
    }

    async onload() {
        console.log('ToDoList plugin is on!')

        this.registerEvent(
            this.app.vault.on('modify', async (file) => {
                if (file instanceof TFile && file.extension === 'md') {
                    let content;

                    try {
                        content = await this.app.vault.read(file);
                    } catch (error) {
                        console.log(`ToDoList: ошибка "${error}" при чтении файла "${file.name}".`);
                        return;
                    }
                    

                    if (!this.checkPluginActive(content)) {
                        console.log('ToDoList: Marker not found - skipping.');
                        return;
                    }

                    const newContent = this.recreatePluginStructure(content);

                    if (content != newContent) {
                        await this.rewriteFile(file, newContent);
                    } else {
                        console.log('ToDoList: No changes detected.');
                    }
                    
                    return;
                }

            })
        );
    }
}

module.exports = ToDoList