// Sample initial tool data
let tools = [
    {
        id: 3,
        title: "Hand IK Controller",
        description: "Real-time hand tracking with joint angle calculation and IK command output for robotics control.",
        link: "./tools/hand-ik-controller.html",
        icon: "fas fa-robot"
    },
    {
        id: 4,
        title: "HTML Code Previewer",
        description: "Real-time HTML validation and preview tool. Check your code, visualize your design, and open in a new tab.",
        link: "./tools/html-previewer-tool.html",
        icon: "fas fa-code"
    }
];

// Initialize window.allTools with the initial set of tools
window.allTools = [...tools]; // This will now include the Hand IK Controller and HTML Previewer

// Function to render tool cards (this one will be effectively overridden by the one at the bottom, but good to keep consistent)
function renderTools() {
    const toolsGrid = document.getElementById('tools-grid-container');
    if (!toolsGrid) {
        console.error("Tools grid container not found!");
        return;
    }
    toolsGrid.innerHTML = ''; // Clear existing tools

    if (tools.length === 0) {
        document.getElementById('empty-state').style.display = 'block';
        toolsGrid.style.display = 'none'; // Hide grid if no tools
    } else {
        document.getElementById('empty-state').style.display = 'none';
        toolsGrid.style.display = 'grid'; // Ensure grid is visible
        tools.forEach(tool => {
            const card = `
                <div class="tool-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center mb-4">
                            <i class="${tool.icon} text-3xl text-primary mr-4"></i>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${tool.title}</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${tool.description}</p>
                    </div>
                    <a href="${tool.link}" target="_blank" class="inline-block mt-auto px-4 py-2 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        Open Tool
                    </a>
                </div>
            `;
            toolsGrid.innerHTML += card;
        });
    }
}

// Function to add a new tool (basic implementation)
function addNewTool() {
    const title = prompt("Enter tool title:");
    if (!title) return; 
    const description = prompt("Enter tool description:");
    if (!description) return;
    const link = prompt("Enter tool link (URL):");
    if (!link) return; // Basic validation for link
    const icon = prompt("Enter Font Awesome icon classes (e.g., 'fas fa-code'):") || "fas fa-tools";

    const newTool = {
        id: window.allTools.length > 0 ? Math.max(...window.allTools.map(t => t.id)) + 1 : 1, // Generate new ID based on allTools
        title,
        description,
        link,
        icon
    };

    window.allTools.push(newTool); // Add to the main list
    
    // If a search is active, clear it to show all tools including the new one,
    // or decide if you want to re-filter. For simplicity, we'll re-render all.
    const searchInput = document.getElementById('search-tools');
    if (searchInput) searchInput.value = ''; // Clear search

    renderTools(); // Re-render the full list of tools

    // Optionally, save to localStorage or a backend in a real application
    console.log("New tool added:", newTool);
    alert("Tool added successfully!");
}

// Initial render when the script loads (assuming DOM is ready or called after DOMContentLoaded)
// This will be called from index.html after DOMContentLoaded event.

// Update search functionality to work with dynamic cards
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-tools');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Re-filter and render the tools based on the search term
            const filteredTools = tools.filter(tool => {
                const title = tool.title.toLowerCase();
                const description = tool.description.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
            
            // Temporarily modify the global 'tools' array for rendering
            // This is a simplified approach. For more complex scenarios,
            // you might want to pass the filtered list directly to renderTools
            // or have renderTools accept a list to render.
            
            // Store a reference to the original full list of tools
            // window.allTools is now initialized globally at the start of the script.
            // if (typeof window.allTools === 'undefined') {
            //     window.allTools = [...tools];
            // }

            const toolsToRender = window.allTools.filter(tool => {
                const title = tool.title.toLowerCase();
                const description = tool.description.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
            
            // Render the filtered tools without modifying the global `tools` array permanently
            
            // Use a temporary variable for rendering to avoid conflicts if renderTools uses global `tools`
            const toolsToDisplay = window.allTools.filter(tool => {
                const title = tool.title.toLowerCase();
                const description = tool.description.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
            
            // Modify renderTools to accept a list, or manage state carefully
            // For this iteration, we'll adapt renderTools slightly or ensure it uses the passed list
            renderFilteredTools(toolsToDisplay);
        });
    } else {
        console.warn("Search input not found, search functionality may not work.");
    }

    // Ensure allTools is initialized - This check is no longer strictly necessary here
    // as window.allTools is initialized at the top of the script.
    // if (typeof window.allTools === 'undefined') {
    //     window.allTools = [...tools]; // Initialize with the initial set of tools
    // }
});

// New function to render a specific list of tools (e.g., filtered results)
function renderFilteredTools(toolsList) {
    const toolsGrid = document.getElementById('tools-grid-container');
    if (!toolsGrid) {
        console.error("Tools grid container not found!");
        return;
    }
    toolsGrid.innerHTML = ''; // Clear existing tools

    if (toolsList.length === 0) {
        // Show a "no results found" message if it's a search, or empty state if initial
        const searchInput = document.getElementById('search-tools');
        if (searchInput && searchInput.value !== "") {
            toolsGrid.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">No tools found matching your search.</p>`;
        } else {
            document.getElementById('empty-state').style.display = 'block';
        }
        toolsGrid.style.display = 'grid'; // Keep grid display for the message or empty state
    } else {
        document.getElementById('empty-state').style.display = 'none';
        toolsGrid.style.display = 'grid';
        toolsList.forEach(tool => {
            const card = `
                <div class="tool-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center mb-4">
                            <i class="${tool.icon} text-3xl text-primary mr-4"></i>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${tool.title}</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${tool.description}</p>
                    </div>
                    <a href="${tool.link}" target="_blank" class="inline-block mt-auto px-4 py-2 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        Open Tool
                    </a>
                </div>
            `;
            toolsGrid.innerHTML += card;
        });
    }
}

// Modify the main renderTools to use allTools by default
// This function definition effectively replaces the earlier one in the script due to hoisting.
function renderTools() {
    // window.allTools should always be defined now when this is called from index.html's DOMContentLoaded
    // or after addNewTool.
    renderFilteredTools(window.allTools); // Render all tools
}
