
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const addItemButton = document.getElementById('add-item');
    const menuPreview = document.getElementById('menu-preview');
    const sizeSelector = document.getElementById('size');
    const importButton = document.getElementById('import-button');
    const importFile = document.getElementById('import-file');
    let itemIndex = 0;

    importButton.addEventListener('click', () => {
        importFile.click();
    });

    importFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            try {
                validateDeluxeMenuYaml(content);
                const menuData = parseSimpleYaml(content);
                populateForm(menuData);
                updatePreview();
            } catch (error) {
                console.error('Error processing YAML file:', error);
                alert(`Import failed: ${error.message}`);
            }
        };
        reader.readAsText(file);
    });

    function validateDeluxeMenuYaml(content) {
        if (!content.trim()) {
            throw new Error('File is empty.');
        }

        const lines = content.split('\n');
        const firstLine = lines.find(line => line.trim() !== '');
        if (!firstLine || !firstLine.trim().endsWith(':') || firstLine.startsWith(' ')) {
            throw new Error('Invalid format: The file must start with a menu title (e.g., "my_menu:").');
        }

        if (!content.includes('size:')) {
            throw new Error('Invalid format: Missing "size" property.');
        }

        if (!content.includes('items:')) {
            throw new Error('Invalid format: Missing "items" section.');
        }
    }

    function parseSimpleYaml(content) {
        const lines = content.split('\n');
        let menuTitle = '';
        let openCommand = '';
        let size = '9';
        const items = {};
        let currentItem = null;
        let currentSection = '';

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.endsWith(':')) {
                const key = trimmedLine.slice(0, -1);
                if (!line.startsWith(' ')) {
                    menuTitle = key;
                } else if (line.startsWith('    ') && !line.startsWith('      ')) {
                    currentItem = key.replace(/'/g, '');
                    items[currentItem] = {};
                    currentSection = '';
                } else if (line.startsWith('      ')) {
                    currentSection = key;
                    if (currentItem) items[currentItem][currentSection] = [];
                }
            } else {
                const parts = trimmedLine.split(': ');
                if (parts.length === 2) {
                    const key = parts[0];
                    const value = parts[1].replace(/'/g, '');
                    if (key === 'open_command') openCommand = value.slice(1, -1);
                    if (key === 'size') size = value;
                    if (currentItem && currentSection === '') {
                        items[currentItem][key] = value;
                    }
                } else if (trimmedLine.startsWith('- ')) {
                    const value = trimmedLine.substring(2).replace(/'/g, '');
                    if (currentItem && currentSection) {
                        items[currentItem][currentSection].push(value);
                    }
                }
            }
        });
        return { menuTitle, openCommand, size, items };
    }

    function populateForm(menuData) {
        document.getElementById('menu_title').value = menuData.menuTitle;
        document.getElementById('open_command').value = menuData.openCommand;
        sizeSelector.value = menuData.size;

        itemsContainer.innerHTML = '';
        itemIndex = 0;
        for (const key in menuData.items) {
            itemIndex++;
            const item = menuData.items[key];
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <h3>Item ${itemIndex}</h3>
                <label>Slot:</label>
                <input type="number" name="items[item_${itemIndex}][slot]" min="0" max="53" value="${key}" required><br>
                <label>Material:</label>
                <input type="text" name="items[item_${itemIndex}][material]" value="${item.material || ''}" required><br>
                <label>Display Name:</label>
                <input type="text" name="items[item_${itemIndex}][display_name]" value="${item.display_name || ''}"><br>
                <label>Lore (one line per line):</label>
                <textarea name="items[item_${itemIndex}][lore]">${(item.lore || []).join('\n')}</textarea><br>
                <label>Left Click Commands (one per line):</label>
                <textarea name="items[item_${itemIndex}][left_click_commands]">${(item.left_click_commands || []).join('\n')}</textarea><br>
                <label>Right Click Commands (one per line):</label>
                <textarea name="items[item_${itemIndex}][right_click_commands]">${(item.right_click_commands || []).join('\n')}</textarea><br>
                <button type="button" class="remove-item">Remove Item</button>
            `;
            itemsContainer.appendChild(itemDiv);
        }
    }

    function updatePreview() {
        const size = parseInt(sizeSelector.value, 10);
        menuPreview.innerHTML = '';
        menuPreview.style.gridTemplateRows = `repeat(${size / 9}, 1fr)`;

        for (let i = 0; i < size; i++) {
            const slot = document.createElement('div');
            slot.classList.add('inventory-slot');
            slot.dataset.slot = i;
            menuPreview.appendChild(slot);
        }

        const items = itemsContainer.querySelectorAll('.item');
        items.forEach(item => {
            const slotInput = item.querySelector('input[name$="[slot]"]');
            const materialInput = item.querySelector('input[name$="[material]"]');
            const nameInput = item.querySelector('input[name$="[display_name]"]');

            if (slotInput && materialInput && slotInput.value) {
                const slot = menuPreview.querySelector(`[data-slot="${slotInput.value}"]`);
                if (slot) {
                    const itemIcon = document.createElement('div');
                    itemIcon.classList.add('item-icon');
                    itemIcon.style.backgroundColor = 'transparent';

                    const material = materialInput.value.toLowerCase();
                    const img = new Image();
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'contain';

                    const materialName = materialInput.value.toLowerCase();
                    const localUrl = `/textures/${materialName}.png`;
                    const fallbackUrl = '/textures/barrier.png'; // Local fallback

                    img.onload = () => {
                        console.log(`Image loaded successfully from: ${img.src}`);
                    };

                    img.onerror = function() {
                        console.error(`Failed to load local image: ${this.src}. Loading fallback.`);
                        // Prevent infinite loops if the fallback also fails
                        if (this.src !== fallbackUrl) { 
                            this.src = fallbackUrl;
                        }
                    };

                    console.log(`Attempting to load local image: ${localUrl}`);
                    img.src = localUrl; // Start with the local path
                    itemIcon.appendChild(img); 
                    

                    const itemName = document.createElement('div');
                    itemName.classList.add('item-name');
                    itemName.textContent = nameInput.value || materialInput.value;

                    slot.innerHTML = '';
                    slot.appendChild(itemIcon);
                    slot.appendChild(itemName);
                }
            }
        });
    }

    addItemButton.addEventListener('click', () => {
        itemIndex++;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>Item ${itemIndex}</h3>
            <label>Slot:</label>
            <input type="number" name="items[item_${itemIndex}][slot]" min="0" max="53" required><br>
            <label>Material:</label>
            <input type="text" name="items[item_${itemIndex}][material]" required><br>
            <label>Display Name:</label>
            <input type="text" name="items[item_${itemIndex}][display_name]"><br>
            <label>Lore (one line per line):</label>
            <textarea name="items[item_${itemIndex}][lore]"></textarea><br>
            <label>Left Click Commands (one per line):</label>
            <textarea name="items[item_${itemIndex}][left_click_commands]"></textarea><br>
            <label>Right Click Commands (one per line):</label>
            <textarea name="items[item_${itemIndex}][right_click_commands]"></textarea><br>
            <button type="button" class="remove-item">Remove Item</button>
        `;
        itemsContainer.appendChild(itemDiv);
        updatePreview();
    });

    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            e.target.parentElement.remove();
            updatePreview();
        }
    });

    document.querySelector('form').addEventListener('input', updatePreview);
    sizeSelector.addEventListener('change', updatePreview);

    updatePreview(); // Initial preview
});
