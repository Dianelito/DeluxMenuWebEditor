

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/textures', express.static(path.join(__dirname, 'public/textures')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('editor');
});

app.post('/generate', (req, res) => {
    const menu = req.body;

    if (!menu.menu_title || !menu.size) {
        return res.status(400).send('Menu title and size are required.');
    }

    let yaml = `menu_title: '${menu.menu_title}'
`;
    yaml += `open_command: ${menu.open_command || ''}
`;
    yaml += `size: ${menu.size}
`;
    if (menu.open_requirement) {
        yaml += `open_requirement:\n`;
        const openRequirementLines = menu.open_requirement.split('\r\n');
        openRequirementLines.forEach(line => {
            yaml += `  ${line}\n`;
        });
    }
    yaml += `items:\n`;

    if (menu.items) {
        for (const key in menu.items) {
            const item = menu.items[key];
            if (item.material && item.slot !== undefined) {
                const itemName = item.material.toLowerCase().replace(/ /g, '_');
                yaml += `  '${itemName}':
`;
                yaml += `    material: ${item.material}
`;
                yaml += `    slot: ${item.slot}
`;
                if (item.display_name) {
                    yaml += `    display_name: '${item.display_name}'
`;
                }
                if (item.lore) {
                    yaml += `    lore:
`;
                    const loreLines = item.lore.split('\r\n');
                    loreLines.forEach(line => {
                        yaml += `      - '${line}'
`;
                    });
                }
                if (item.left_click_commands) {
                    yaml += `    left_click_commands:
`;
                    const leftClickCommands = item.left_click_commands.split('\r\n');
                    leftClickCommands.forEach(command => {
                        yaml += `      - '${command}'
`;
                    });
                }
                if (item.right_click_commands) {
                    yaml += `    right_click_commands:
`;
                    const rightClickCommands = item.right_click_commands.split('\r\n');
                    rightClickCommands.forEach(command => {
                        yaml += `      - '${command}'
`;
                    });
                }
                if (item.view_requirement) {
                    yaml += `    view_requirement:
`;
                    const viewRequirementLines = item.view_requirement.split('\r\n');
                    viewRequirementLines.forEach(line => {
                        yaml += `      ${line}
`;
                    });
                }
                if (item.left_click_requirement) {
                    yaml += `    left_click_requirement:
`;
                    const leftClickRequirementLines = item.left_click_requirement.split('\r\n');
                    leftClickRequirementLines.forEach(line => {
                        yaml += `      ${line}
`;
                    });
                }
                if (item.right_click_requirement) {
                    yaml += `    right_click_requirement:
`;
                    const rightClickRequirementLines = item.right_click_requirement.split('\r\n');
                    rightClickRequirementLines.forEach(line => {
                        yaml += `      ${line}
`;
                    });
                }
            }
        }
    }

    res.setHeader('Content-Type', 'text/plain');
    res.send(yaml);
});

// app.listen(port, () => {
//     console.log(`DeluxeMenus editor listening at http://localhost:${port}`);
// });

module.exports = app;

