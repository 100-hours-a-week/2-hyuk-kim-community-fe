export default function showToast(message) {
    // Create toast element
    const duration = 3000;
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';

    // Append toast to body
    document.body.appendChild(toast);

    // Show toast with fade-in effect
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Hide toast after duration with fade-out effect
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, duration);
}

// Example usage
