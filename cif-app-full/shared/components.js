/**
 * CIF App - UI Components
 * Reusable UI helpers for the app
 */

// Toast Notification System
const ToastManager = {
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = this.getIcon(type);
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        this.container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    },

    getIcon(type) {
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ef4444"/><path d="M7 7l6 6M13 7l-6 6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#3b82f6"/><path d="M10 9v5M10 6v1" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>'
        };
        return icons[type] || icons.info;
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// Confirmation Dialog
const ConfirmDialog = {
    show(options) {
        const {
            title = 'Confirm',
            message = 'Are you sure?',
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            confirmClass = 'btn-danger',
            onConfirm = () => {},
            onCancel = () => {}
        } = options;

        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';

        backdrop.innerHTML = `
            <div class="modal">
                <h3 class="modal-title">${title}</h3>
                <p class="modal-message">${message}</p>
                <div class="modal-actions">
                    <button class="btn btn-secondary" data-action="cancel">${cancelText}</button>
                    <button class="btn ${confirmClass}" data-action="confirm">${confirmText}</button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Handle clicks
        backdrop.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'confirm') {
                onConfirm();
                backdrop.remove();
            } else if (action === 'cancel' || e.target === backdrop) {
                onCancel();
                backdrop.remove();
            }
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onCancel();
                backdrop.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        return backdrop;
    }
};

// Progress Bar Component
function createProgressBar(current, total) {
    const percentage = Math.round((current / total) * 100);
    return `
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="progress-text">${current}/${total}</span>
        </div>
    `;
}

// Step Navigation Component
function createStepNav(currentStep, totalSteps, completedSteps = []) {
    let html = '<div class="step-nav">';
    for (let i = 0; i < totalSteps; i++) {
        let className = 'step-nav-item';
        if (i === currentStep) {
            className += ' active';
        } else if (completedSteps.includes(i)) {
            className += ' completed';
        }
        html += `<button class="${className}" data-step="${i}">${i + 1}</button>`;
    }
    html += '</div>';
    return html;
}

// Accordion Component
function createAccordion(id, title, content, isOpen = false) {
    const openClass = isOpen ? ' open' : '';
    return `
        <div class="accordion${openClass}" id="${id}">
            <div class="accordion-header" onclick="toggleAccordion('${id}')">
                <span>${title}</span>
                <svg class="accordion-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="accordion-content">
                ${content}
            </div>
        </div>
    `;
}

function toggleAccordion(id) {
    const accordion = document.getElementById(id);
    if (accordion) {
        accordion.classList.toggle('open');
    }
}

// Editable Title Component
function createEditableTitle(title, onSave) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = title;
    input.className = 'editable-title';

    let lastSavedValue = title;

    input.addEventListener('blur', () => {
        const newValue = input.value.trim();
        if (newValue && newValue !== lastSavedValue) {
            lastSavedValue = newValue;
            onSave(newValue);
        } else if (!newValue) {
            input.value = lastSavedValue;
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        } else if (e.key === 'Escape') {
            input.value = lastSavedValue;
            input.blur();
        }
    });

    return input;
}

// Copy to Clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        ToastManager.success('Copied to clipboard!');
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            ToastManager.success('Copied to clipboard!');
            return true;
        } catch (e) {
            ToastManager.error('Failed to copy');
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// Download file helper
function downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Format example with tags (for book examples)
function formatExample(company, text) {
    // Replace #user, #customer, #buyer, #seller tags with styled spans
    let formatted = text
        .replace(/#user/g, '<span class="example-tag example-tag-user">#user</span>')
        .replace(/#customer/g, '<span class="example-tag example-tag-customer">#customer</span>')
        .replace(/#buyer/g, '<span class="example-tag example-tag-buyer">#buyer</span>')
        .replace(/#seller/g, '<span class="example-tag example-tag-seller">#seller</span>');

    return `<div class="mb-3"><strong>${company}:</strong> ${formatted}</div>`;
}

// Empty state component
function createEmptyState(icon, title, description, actionHtml = '') {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">${icon}</div>
            <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">${title}</h3>
            <p style="margin: 0 0 1.5rem 0; color: var(--text-secondary);">${description}</p>
            ${actionHtml}
        </div>
    `;
}

// Action buttons group
function createActionButtons(buttons) {
    return `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${buttons.map(btn => `
                <button
                    class="btn ${btn.class || 'btn-secondary'} btn-sm"
                    onclick="${btn.onclick}"
                    ${btn.disabled ? 'disabled' : ''}
                    title="${btn.title || ''}"
                >
                    ${btn.icon || ''}
                    ${btn.label}
                </button>
            `).join('')}
        </div>
    `;
}

// Icons
const Icons = {
    plus: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    edit: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V3h4v1M5 4v9h6V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M3 12v2h10v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M3 10V3a1 1 0 011-1h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    arrowLeft: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    canvas: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="10" y="15" width="60" height="50" rx="4" stroke="currentColor" stroke-width="2"/><line x1="10" y1="35" x2="70" y2="35" stroke="currentColor" stroke-width="2"/><line x1="10" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/><line x1="30" y1="15" x2="30" y2="50" stroke="currentColor" stroke-width="2"/><line x1="50" y1="15" x2="50" y2="50" stroke="currentColor" stroke-width="2"/></svg>',
    home: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l6-6 6 6M4 7v6h3v-4h2v4h3V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

// Export for use in other modules
window.CIFComponents = {
    ToastManager,
    ConfirmDialog,
    createProgressBar,
    createStepNav,
    createAccordion,
    toggleAccordion,
    createEditableTitle,
    copyToClipboard,
    downloadFile,
    formatExample,
    createEmptyState,
    createActionButtons,
    Icons
};

// Make toggleAccordion globally available
window.toggleAccordion = toggleAccordion;
