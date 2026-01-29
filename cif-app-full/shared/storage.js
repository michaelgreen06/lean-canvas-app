/**
 * CIF App - Storage Module
 * Handles localStorage persistence for Lean Canvas data
 */

const STORAGE_KEY = 'cifAppData';
const DATA_VERSION = 1;

// Generate UUID for canvas IDs
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Get default empty data structure
function getDefaultData() {
    return {
        version: DATA_VERSION,
        canvases: [],
        activeCanvasId: null,
        settings: {
            theme: 'light'
        }
    };
}

// Get default empty canvas fields
function getEmptyCanvasFields() {
    return {
        customerSegments: '',
        earlyAdopters: '',
        problem: '',
        existingAlternatives: '',
        uniqueValueProposition: '',
        highLevelConcept: '',
        solution: '',
        channels: '',
        revenueStreams: '',
        costStructure: '',
        keyMetrics: '',
        unfairAdvantage: ''
    };
}

// Load all data from localStorage
function loadData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return getDefaultData();
        }
        const data = JSON.parse(stored);
        // Handle data migration if version changes
        if (!data.version || data.version < DATA_VERSION) {
            return migrateData(data);
        }
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return getDefaultData();
    }
}

// Save all data to localStorage
function saveData(data) {
    try {
        data.version = DATA_VERSION;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

// Migrate data from older versions
function migrateData(data) {
    // Currently no migrations needed, but structure is in place
    const migrated = {
        ...getDefaultData(),
        ...data,
        version: DATA_VERSION
    };
    saveData(migrated);
    return migrated;
}

// CRUD Operations for Canvases

// Get all canvases
function getAllCanvases() {
    const data = loadData();
    return data.canvases || [];
}

// Get a single canvas by ID
function getCanvas(id) {
    const data = loadData();
    return data.canvases.find(c => c.id === id) || null;
}

// Create a new canvas
function createCanvas(title = 'Untitled Canvas') {
    const data = loadData();
    const now = new Date().toISOString();

    const newCanvas = {
        id: generateUUID(),
        title: title,
        createdAt: now,
        updatedAt: now,
        currentStep: 0,
        fields: getEmptyCanvasFields()
    };

    data.canvases.push(newCanvas);
    data.activeCanvasId = newCanvas.id;
    saveData(data);

    return newCanvas;
}

// Update an existing canvas
function updateCanvas(id, updates) {
    const data = loadData();
    const index = data.canvases.findIndex(c => c.id === id);

    if (index === -1) {
        return null;
    }

    const canvas = data.canvases[index];

    // Update title if provided
    if (updates.title !== undefined) {
        canvas.title = updates.title;
    }

    // Update currentStep if provided
    if (updates.currentStep !== undefined) {
        canvas.currentStep = updates.currentStep;
    }

    // Update fields if provided
    if (updates.fields) {
        canvas.fields = {
            ...canvas.fields,
            ...updates.fields
        };
    }

    canvas.updatedAt = new Date().toISOString();
    data.canvases[index] = canvas;
    saveData(data);

    return canvas;
}

// Update a single field on a canvas
function updateCanvasField(id, fieldName, value) {
    return updateCanvas(id, {
        fields: { [fieldName]: value }
    });
}

// Delete a canvas
function deleteCanvas(id) {
    const data = loadData();
    const index = data.canvases.findIndex(c => c.id === id);

    if (index === -1) {
        return false;
    }

    data.canvases.splice(index, 1);

    // Clear activeCanvasId if it was the deleted one
    if (data.activeCanvasId === id) {
        data.activeCanvasId = null;
    }

    saveData(data);
    return true;
}

// Duplicate a canvas
function duplicateCanvas(id) {
    const original = getCanvas(id);
    if (!original) {
        return null;
    }

    const data = loadData();
    const now = new Date().toISOString();

    const newCanvas = {
        ...original,
        id: generateUUID(),
        title: `${original.title} (Copy)`,
        createdAt: now,
        updatedAt: now
    };

    data.canvases.push(newCanvas);
    saveData(data);

    return newCanvas;
}

// Settings operations

function getSettings() {
    const data = loadData();
    return data.settings || { theme: 'light' };
}

function updateSettings(updates) {
    const data = loadData();
    data.settings = {
        ...data.settings,
        ...updates
    };
    saveData(data);
    return data.settings;
}

// Active canvas operations

function setActiveCanvas(id) {
    const data = loadData();
    data.activeCanvasId = id;
    saveData(data);
}

function getActiveCanvas() {
    const data = loadData();
    if (!data.activeCanvasId) {
        return null;
    }
    return getCanvas(data.activeCanvasId);
}

// Format date for display
function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export canvas to Markdown
function exportCanvasToMarkdown(canvas) {
    const fields = canvas.fields;
    return `# ${canvas.title}

## Lean Canvas

**Created:** ${formatDate(canvas.createdAt)}
**Updated:** ${formatDate(canvas.updatedAt)}

---

### Customer Segments
${fields.customerSegments || '*Not defined*'}

### Early Adopters
${fields.earlyAdopters || '*Not defined*'}

---

### Problem
${fields.problem || '*Not defined*'}

### Existing Alternatives
${fields.existingAlternatives || '*Not defined*'}

---

### Unique Value Proposition
${fields.uniqueValueProposition || '*Not defined*'}

### High-Level Concept
${fields.highLevelConcept || '*Not defined*'}

---

### Solution
${fields.solution || '*Not defined*'}

---

### Channels
${fields.channels || '*Not defined*'}

---

### Revenue Streams
${fields.revenueStreams || '*Not defined*'}

---

### Cost Structure
${fields.costStructure || '*Not defined*'}

---

### Key Metrics
${fields.keyMetrics || '*Not defined*'}

---

### Unfair Advantage
${fields.unfairAdvantage || '*Not defined*'}

---

*Generated by Continuous Innovation Framework App*
`;
}

// Export for use in other modules
window.CIFStorage = {
    generateUUID,
    loadData,
    saveData,
    getAllCanvases,
    getCanvas,
    createCanvas,
    updateCanvas,
    updateCanvasField,
    deleteCanvas,
    duplicateCanvas,
    getSettings,
    updateSettings,
    setActiveCanvas,
    getActiveCanvas,
    formatDate,
    formatDateTime,
    exportCanvasToMarkdown,
    getEmptyCanvasFields
};
