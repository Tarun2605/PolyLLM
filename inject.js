const existing = document.getElementById('gemini-sidebar-root');
if (existing) existing.remove();

const container = document.createElement('div');
container.id = 'gemini-sidebar-root';
container.style.position = 'fixed';
container.style.top = '0';
container.style.right = '0';
container.style.width = '400px';
container.style.height = '100vh';
container.style.zIndex = '999999';
container.style.backgroundColor = 'white';
container.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
document.body.appendChild(container);

// Inject React app script
const script = document.createElement('script');
script.src = chrome.runtime.getURL('sidebar.bundle.js'); // React build
script.type = 'module';
document.body.appendChild(script);