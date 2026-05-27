# 🤝 Contributing to DevOpsVaultX

First off, thank you for considering contributing to **DevOpsVaultX**! We love having new tools and improvements from the community. It's developers like you that make this open-source hub powerful and useful.

This document provides a clear guide on how you can add your own serverless utilities to the platform.

---

## 🛠️ Local Setup

Although DevOpsVaultX runs its tools purely on the client-side, it uses a Python environment/build system (as seen with `app.py` and `freeze.py`) alongside static files to render the UI dynamically.

1. **Fork** the repository to your own GitHub account.

2. **Clone** your fork locally:

    ```bash
    git clone [https://github.com/YOUR-USERNAME/DevOpsVaultX.git](https://github.com/YOUR-USERNAME/DevOpsVaultX.git)
    ```

3. **Open the project** in your code editor (e.g., VS Code).

4. **Run the project locally**:
* If you are using the Python backend for development, activate your virtual environment and run `app.py`.
* Alternatively, you can run the static files using VS Code's **Live Server** extension to preview your frontend changes.

---

## 🧩 Adding a New Tool

DevOpsVaultX dynamically generates the tool bento-grid by reading data from a JSON file. To add a new tool, you **do not** need to edit the HTML grid directly. Instead, you will add a new entry to the `static/data.json` file.

### Step-by-Step Guide:

**1. Open static/data.json**
This file contains an array of JSON objects representing every tool on the platform.

**2. Add Your Tool Object**
Copy the template below, fill in your tool's details, and paste it into the JSON array. Ensure the syntax is valid (watch out for missing or extra commas!).

```json
{
    "id": "your-unique-tool-id",
    "category": "text", 
    "searchTags": "keywords separated by spaces for search functionality",
    "badge": "🏷️ Your Badge Text",
    "badgeBg": "rgba(r, g, b, 0.1)",
    "badgeColor": "#hexcode",
    "badgeBorder": "rgba(r, g, b, 0.2)",
    "duration": "⚡ Instant",
    "title": "Your Tool Title",
    "desc": "A short, 1-2 sentence description of what your tool does.",
    "friendlyMetric": "Metric Label",
    "metricIcon": "fa-solid fa-wrench",
    "metricColor": "#hexcode",
    "actionUrl": "url/to/your/tool.html",
    "status": "active"
}

```

### 📝 Field Definitions

* **`id`**: A unique string identifier for your tool (kebab-case, e.g., `json-formatter`).
* **`category`**: Must match our active filtering tabs (e.g., `"text"`, `"img"`, `"automations"`, `"others"`).
* **`searchTags`**: Words users might type in the search bar to find your tool (e.g., `"format json beautify string"`).
* **`badge`**:  An emoji and short text identifying the tool's subtype (e.g., `"🔤 String Tools"`).
* **`badgeBg`, `badgeColor`, `badgeBorder`**: UI colors to match the card theme. Use `rgba` for background/border opacity and hex codes for text.
* **`duration`**: Typically `"⚡ Instant"` or `"⏱️ Real-time"`.
* **`title` & `desc`**: The main heading and brief explanation of your utility.
* **`friendlyMetric` & `metricIcon`**: The small footer metric on the card. Use FontAwesome 6 for the icon class.
* **`actionUrl`**: The link/route to your tool's actual page.
* **`status`**: Set to `"active"` for live tools, or `"disabled"` if it is still a work in progress.

**3. Build Your Tool UI**
Create your tool's specific HTML/JS logic at the path specified in `actionUrl`.

> **Important:** All core logic must be **client-side Vanilla JS** to maintain our serverless, instant-execution architecture!

---

## 🎨 Style & Code Guidelines

To keep DevOpsVaultX looking beautiful and functioning flawlessly, please adhere to these guidelines:

* **UI/UX:** DevOpsVaultX relies heavily on Glassmorphism. Reuse our existing CSS variables (`style.css`) for consistent ambient glows, translucent panels, and typography.
* **No Backend Logic for Tools:** Do not add external API dependencies or database calls unless absolutely necessary. Tools should compute securely within the user's browser.
* **Icons:** We use FontAwesome 6. Please stick to the free tier icons to ensure compatibility.
* **Responsive Design:** Make sure your new tool interface looks great on desktop, tablet, and mobile screens.

---

## 🔄 Submitting a Pull Request (PR)

1. **Create a branch:** `git checkout -b feature/add-new-tool`
2. **Commit your changes:** `git commit -m "feat: Add [Tool Name] to data.json"`
3. **Push to your fork:** `git push origin feature/add-new-tool`
4. **Open a PR:** Go to the main DevOpsVaultX repository and click "Compare & pull request". Please include a screenshot of your tool in the PR description!

> We will review your code as quickly as possible.

---

## 💬 Need Help?

If you get stuck or have a question about the architecture, feel free to open an **Issue** with the `question` tag.

Happy coding! 🚀

---