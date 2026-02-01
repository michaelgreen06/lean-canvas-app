/**
 * CIF App - Storage Module
 * Handles localStorage persistence for Lean Canvas data
 */

const STORAGE_KEY = 'cifAppData';
const DATA_VERSION = 2;

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

// Get default empty desirability fields
function getEmptyDesirabilityFields() {
    return {
        customerSegments: '',
        earlyAdopters: '',
        switchingTriggerType: '', // 'bad_experience', 'change_circumstance', 'awareness_event'
        existingAlternatives: '',
        problems: '',
        uvpReview: '',
        pushForces: '',
        pullForces: '',
        inertiaForces: '',
        frictionForces: '',
        forcesBalance: null // calculated: 'pass', 'fail', 'neutral'
    };
}

// Get default empty viability fields
function getEmptyViabilityFields() {
    return {
        mscGoal: 0, // Annual revenue target
        monthlyPrice: 0,
        pricingModel: '', // 'subscription', 'one_time', 'freemium', 'usage_based'
        existingAlternativesCost: 0, // pricing floor
        uvpValueEstimate: 0, // pricing ceiling
        customerLifetimeYears: 3,
        activeCustomersNeeded: 0, // calculated
        monthlyChurnRate: 0, // calculated from lifetime
        minAcquisitionRate: 0, // calculated
        conversionRate: 1, // percentage
        leadsRequired: 0, // calculated
        referralRate: 0, // percentage
        modelType: '', // 'flies', 'mice', 'rabbits', 'deer', 'elephants', 'whales'
        modelViable: null // calculated: true/false
    };
}

// Get default empty feasibility fields
function getEmptyFeasibilityFields() {
    return {
        growthRate: '10x', // '3x', '5x', '10x'
        year1Customers: 0, // calculated
        year2Customers: 0, // calculated
        year3Customers: 0, // calculated (same as activeCustomersNeeded)
        nowPlanNotes: '',
        nextPlanNotes: '',
        laterPlanNotes: '',
        problemSolutionFitMetric: '', // 'paying_customers', 'trials', 'leads'
        problemSolutionFitTarget: 0,
        mvpType: '', // 'concierge', 'wizard_of_oz', 'foot_in_door', 'release_1'
        mvpRationale: ''
    };
}

// Get default empty pitch fields
function getEmptyPitchFields() {
    return {
        elevatorPitch: '',
        triggeringEvent: '',
        jobToBeDone: '',
        desiredOutcome: '',
        whatsAtStake: '',
        targetAudience: '', // 'investor', 'customer', 'advisor'
        slide1WhyNow: '',
        slide2WhatsAtStake: '',
        slide3WhatsChain: '',
        slide4TheFix: '',
        slide5YourMoat: '',
        slide6HowYouMakeMoney: '',
        slide7KeyMilestones: '',
        slide8CurrentProgress: '',
        slide9TheTeam: '',
        slide10TheAsk: ''
    };
}

// Get section scores structure
function getEmptySectionScores() {
    return {
        leanCanvas: { completed: 0, total: 12, score: null },
        desirability: { completed: 0, total: 7, score: null }, // 'green', 'yellow', 'red'
        viability: { completed: 0, total: 10, score: null },
        feasibility: { completed: 0, total: 5, score: null },
        pitch: { completed: 0, total: 4, score: null }
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
    const migrated = {
        ...getDefaultData(),
        ...data,
        version: DATA_VERSION
    };

    // Migrate each canvas to new structure
    if (migrated.canvases) {
        migrated.canvases = migrated.canvases.map(canvas => migrateCanvas(canvas));
    }

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
    const canvas = data.canvases.find(c => c.id === id) || null;
    return canvas ? migrateCanvas(canvas) : null;
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
        currentSection: 'leanCanvas', // 'leanCanvas', 'desirability', 'viability', 'feasibility', 'pitch'
        currentStep: 0,
        leanCanvas: getEmptyCanvasFields(),
        desirability: getEmptyDesirabilityFields(),
        viability: getEmptyViabilityFields(),
        feasibility: getEmptyFeasibilityFields(),
        pitch: getEmptyPitchFields(),
        scores: getEmptySectionScores(),
        // Legacy support
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

    // Update currentSection if provided
    if (updates.currentSection !== undefined) {
        canvas.currentSection = updates.currentSection;
    }

    // Update currentStep if provided
    if (updates.currentStep !== undefined) {
        canvas.currentStep = updates.currentStep;
    }

    // Update fields if provided (legacy support)
    if (updates.fields) {
        canvas.fields = {
            ...canvas.fields,
            ...updates.fields
        };
        // Also update leanCanvas for new structure
        canvas.leanCanvas = {
            ...canvas.leanCanvas,
            ...updates.fields
        };
    }

    // Update leanCanvas if provided
    if (updates.leanCanvas) {
        canvas.leanCanvas = {
            ...canvas.leanCanvas,
            ...updates.leanCanvas
        };
        // Keep fields in sync for legacy support
        canvas.fields = canvas.leanCanvas;
    }

    // Update desirability if provided
    if (updates.desirability) {
        canvas.desirability = {
            ...canvas.desirability,
            ...updates.desirability
        };
    }

    // Update viability if provided
    if (updates.viability) {
        canvas.viability = {
            ...canvas.viability,
            ...updates.viability
        };
    }

    // Update feasibility if provided
    if (updates.feasibility) {
        canvas.feasibility = {
            ...canvas.feasibility,
            ...updates.feasibility
        };
    }

    // Update pitch if provided
    if (updates.pitch) {
        canvas.pitch = {
            ...canvas.pitch,
            ...updates.pitch
        };
    }

    // Update scores if provided
    if (updates.scores) {
        canvas.scores = {
            ...canvas.scores,
            ...updates.scores
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
        ...JSON.parse(JSON.stringify(original)), // Deep copy
        id: generateUUID(),
        title: `${original.title} (Copy)`,
        createdAt: now,
        updatedAt: now
    };

    data.canvases.push(newCanvas);
    saveData(data);

    return newCanvas;
}

// Update a specific section field
function updateSectionField(canvasId, section, fieldName, value) {
    return updateCanvas(canvasId, {
        [section]: { [fieldName]: value }
    });
}

// Calculate section progress
function calculateSectionProgress(canvas, section) {
    if (!canvas || !canvas[section]) return 0;

    const fields = canvas[section];
    const fieldValues = Object.values(fields);
    const filledFields = fieldValues.filter(v => {
        if (v === null || v === undefined) return false;
        if (typeof v === 'string') return v.trim() !== '';
        if (typeof v === 'number') return v > 0;
        return true;
    }).length;

    return Math.round((filledFields / fieldValues.length) * 100);
}

// Calculate overall progress across all sections
function calculateOverallProgress(canvas) {
    if (!canvas) return 0;

    const sections = ['leanCanvas', 'desirability', 'viability', 'feasibility', 'pitch'];
    let totalProgress = 0;

    sections.forEach(section => {
        totalProgress += calculateSectionProgress(canvas, section);
    });

    return Math.round(totalProgress / sections.length);
}

// Get overall readiness score
function getOverallReadiness(canvas) {
    if (!canvas || !canvas.scores) return 'red';

    const scores = canvas.scores;
    const sectionScores = [
        scores.desirability?.score,
        scores.viability?.score,
        scores.feasibility?.score
    ].filter(s => s !== null);

    if (sectionScores.length === 0) return 'red';

    const redCount = sectionScores.filter(s => s === 'red').length;
    const greenCount = sectionScores.filter(s => s === 'green').length;

    if (redCount > 0) return 'red';
    if (greenCount === sectionScores.length) return 'green';
    return 'yellow';
}

// Migrate canvas to new structure if needed
function migrateCanvas(canvas) {
    if (!canvas) return canvas;

    // If canvas doesn't have new structure, add it
    if (!canvas.leanCanvas) {
        canvas.leanCanvas = canvas.fields || getEmptyCanvasFields();
    }
    if (!canvas.desirability) {
        canvas.desirability = getEmptyDesirabilityFields();
    }
    if (!canvas.viability) {
        canvas.viability = getEmptyViabilityFields();
    }
    if (!canvas.feasibility) {
        canvas.feasibility = getEmptyFeasibilityFields();
    }
    if (!canvas.pitch) {
        canvas.pitch = getEmptyPitchFields();
    }
    if (!canvas.scores) {
        canvas.scores = getEmptySectionScores();
    }
    if (!canvas.currentSection) {
        canvas.currentSection = 'leanCanvas';
    }

    // Migrate old pricing models to new ones
    if (canvas.viability) {
        if (canvas.viability.pricingModel === 'freemium') {
            canvas.viability.pricingModel = 'subscription';
        }
        if (canvas.viability.pricingModel === 'usage_based') {
            canvas.viability.pricingModel = 'marketplace';
        }
    }

    return canvas;
}

// ============================================
// Pricing Model Helper Functions
// ============================================

// Calculate annual revenue per customer based on pricing model
function getAnnualRevenuePerCustomer(viability) {
    const { pricingModel, monthlyPrice } = viability;
    if (!monthlyPrice) return 0;
    switch (pricingModel) {
        case 'one_time': return monthlyPrice; // For one_time, monthlyPrice IS the one-time price
        default: return monthlyPrice * 12; // subscription and marketplace use monthly * 12
    }
}

// Check if customer lifetime step should show
function showCustomerLifetimeStep(pricingModel) {
    return pricingModel !== 'one_time';
}

// Get price input label based on pricing model
function getPriceInputLabel(pricingModel) {
    switch (pricingModel) {
        case 'one_time': return { label: 'One-Time Price', suffix: '' };
        case 'marketplace': return { label: 'Avg Monthly Revenue per User', suffix: '/month' };
        default: return { label: 'Monthly Price Point', suffix: '/month' };
    }
}

// Calculate customers needed based on pricing model
function calculateActiveCustomersNeeded(viability) {
    const annualRev = getAnnualRevenuePerCustomer(viability);
    if (!viability.mscGoal || !annualRev) return 0;
    return Math.ceil(viability.mscGoal / annualRev);
}

// Get label for customers needed based on pricing model
function getCustomersNeededLabel(pricingModel) {
    if (pricingModel === 'one_time') {
        return { title: 'Customers to Acquire per Year', subtitle: 'new customers each year to hit goal' };
    }
    return { title: 'Active Customers Needed', subtitle: 'paying customers at steady state' };
}

// Calculate minimum acquisition rate based on pricing model
function calculateMinAcquisitionRate(viability) {
    const { pricingModel, activeCustomersNeeded, customerLifetimeYears } = viability;
    if (!activeCustomersNeeded) return 0;

    if (pricingModel === 'one_time') {
        // For one-time: need to acquire total customers / 12 each month
        return Math.ceil(activeCustomersNeeded / 12);
    }
    // For subscription/marketplace: need to replace churned customers
    const churnRate = customerLifetimeYears > 0 ? (1 / (customerLifetimeYears * 12)) : 0;
    return Math.ceil(activeCustomersNeeded * churnRate);
}

// Calculate LTV based on pricing model
function calculateLTV(viability) {
    const { pricingModel, monthlyPrice, customerLifetimeYears } = viability;
    if (!monthlyPrice) return 0;

    if (pricingModel === 'one_time') {
        return monthlyPrice; // LTV = price for one-time
    }
    // For subscription/marketplace: monthly * 12 * lifetime years
    return monthlyPrice * 12 * (customerLifetimeYears || 3);
}

// Get LTV label based on pricing model
function getLTVLabel(pricingModel) {
    if (pricingModel === 'one_time') {
        return 'Customer Value';
    }
    return 'LTV';
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
    updateSectionField,
    deleteCanvas,
    duplicateCanvas,
    getSettings,
    updateSettings,
    setActiveCanvas,
    getActiveCanvas,
    formatDate,
    formatDateTime,
    exportCanvasToMarkdown,
    getEmptyCanvasFields,
    getEmptyDesirabilityFields,
    getEmptyViabilityFields,
    getEmptyFeasibilityFields,
    getEmptyPitchFields,
    getEmptySectionScores,
    calculateSectionProgress,
    calculateOverallProgress,
    getOverallReadiness,
    migrateCanvas,
    // Pricing model helpers
    getAnnualRevenuePerCustomer,
    showCustomerLifetimeStep,
    getPriceInputLabel,
    calculateActiveCustomersNeeded,
    getCustomersNeededLabel,
    calculateMinAcquisitionRate,
    calculateLTV,
    getLTVLabel
};
