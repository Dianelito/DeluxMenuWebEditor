

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/textures', express.static('public/textures'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('editor');
});

app.post('/generate', (req, res) => {
    const menu = req.body;
    // Basic validation
    if (!menu.menu_title || !menu.size) {
        return res.status(400).send('Menu title and size are required.');
    }

    let yaml = `${menu.menu_title}:
`;
    yaml += `  open_command: [${menu.open_command || ''}]
`;
    yaml += `  size: ${menu.size}
`;
    yaml += `  items:
`;

    if (menu.items) {
        for (const key in menu.items) {
            const item = menu.items[key];
            if (item.material && item.slot !== undefined) {
                yaml += `    '${item.slot}':
`;
                yaml += `      material: ${item.material}
`;
                if (item.display_name) {
                    yaml += `      display_name: '${item.display_name}'
`;
                }
                if (item.lore) {
                    yaml += `      lore:
`;
                    const loreLines = item.lore.split('\r\n');
                    loreLines.forEach(line => {
                        yaml += `        - '${line}'
`;
                    });
                }
                if (item.left_click_commands) {
                    yaml += `      left_click_commands:
`;
                    const leftClickCommands = item.left_click_commands.split('\r\n');
                    leftClickCommands.forEach(command => {
                        yaml += `        - '${command}'
`;
                    });
                }
                if (item.right_click_commands) {
                    yaml += `      right_click_commands:
`;
                    const rightClickCommands = item.right_click_commands.split('\r\n');
                    rightClickCommands.forEach(command => {
                        yaml += `        - '${command}'
`;
                    });
                }
            }
        }
    }


    res.setHeader('Content-Type', 'text/plain');
    res.send(yaml);
});

app.listen(port, () => {
    console.log(`DeluxeMenus editor listening at http://localhost:${port}`);
});

