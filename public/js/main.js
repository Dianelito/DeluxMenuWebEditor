
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
                const menuData = parseYaml(content);
                populateForm(menuData);
                updatePreview();
            } catch (error) {
                console.error('Error processing YAML file:', error);
                alert(`Import failed: ${error.message}`);
            }
        };
        reader.readAsText(file);
    });

    function parseYaml(content) {
        const data = { items: {} };
        const lines = content.split('\n');
        let currentItemKey = null;
        let currentListKey = null;

        for (const line of lines) {
            const trimmedLine = line.trim();
            const indent = line.length - line.trimStart().length;

            if (!trimmedLine || trimmedLine.startsWith('#')) {
                continue; // Skip empty lines and comments
            }

            if (indent === 0) {
                const [key, ...valueParts] = trimmedLine.split(':');
                const value = valueParts.join(':').trim().replace(/'/g, '');
                if (key === 'items') {
                    currentItemKey = null;
                    currentListKey = null;
                } else if (key) {
                    data[key.trim()] = value;
                }
            } else if (indent === 2 && trimmedLine.endsWith(':')) { // Item definition
                currentItemKey = trimmedLine.slice(0, -1).replace(/'/g, '');
                data.items[currentItemKey] = {};
                currentListKey = null;
            } else if (indent === 4) { // Item properties
                const [key, ...valueParts] = trimmedLine.split(':');
                const value = valueParts.join(':').trim().replace(/'/g, '');
                if (value) { // Single line property
                    if (currentItemKey) {
                        data.items[currentItemKey][key.trim()] = value;
                        currentListKey = null;
                    }
                } else { // Start of a list or requirement block
                    currentListKey = key.trim();
                    if (currentItemKey) {
                        if (currentListKey.endsWith('_requirement')) {
                            data.items[currentItemKey][currentListKey] = '';
                        } else {
                            data.items[currentItemKey][currentListKey] = [];
                        }
                    }
                }
            } else if (indent > 4) { // List item or requirement line
                if (currentItemKey && currentListKey) {
                    if (currentListKey.endsWith('_requirement')) {
                        data.items[currentItemKey][currentListKey] += line + '\n';
                    } else if (trimmedLine.startsWith('- ')) {
                        const value = trimmedLine.substring(2).trim().replace(/'/g, '');
                        data.items[currentItemKey][currentListKey].push(value);
                    }
                }
            }
        }
        return data;
    }

    function populateForm(menuData) {
        document.getElementById('menu_title').value = menuData.menu_title || '';
        document.getElementById('open_command').value = menuData.open_command || '';
        sizeSelector.value = menuData.size || 9;

        itemsContainer.innerHTML = '';
        itemIndex = 0;
        if (menuData.items) {
            for (const key in menuData.items) {
                itemIndex++;
                const item = menuData.items[key];
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <h3>Item ${itemIndex} (id: ${key})</h3>
                    <label>Slot:</label>
                    <input type="number" name="items[item_${itemIndex}][slot]" min="0" max="53" value="${item.slot || ''}" required><br>
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
                    <label>View Requirement:</label>
                    <textarea name="items[item_${itemIndex}][view_requirement]" rows="5">${item.view_requirement || ''}</textarea><br>
                    <label>Left Click Requirement:</label>
                    <textarea name="items[item_${itemIndex}][left_click_requirement]" rows="5">${item.left_click_requirement || ''}</textarea><br>
                    <label>Right Click Requirement:</label>
                    <textarea name="items[item_${itemIndex}][right_click_requirement]" rows="5">${item.right_click_requirement || ''}</textarea><br>
                    <button type="button" class="remove-item">Remove Item</button>
                `;
                itemsContainer.appendChild(itemDiv);
            }
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
            <label>View Requirement:</label>
            <textarea name="items[item_${itemIndex}][view_requirement]" rows="5"></textarea><br>
            <label>Left Click Requirement:</label>
            <textarea name="items[item_${itemIndex}][left_click_requirement]" rows="5"></textarea><br>
            <label>Right Click Requirement:</label>
            <textarea name="items[item_${itemIndex}][right_click_requirement]" rows="5"></textarea><br>
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
