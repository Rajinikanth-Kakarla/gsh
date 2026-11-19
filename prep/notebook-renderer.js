// -----------------------------------------
// GSH NOTEBOOK RENDERER
// -----------------------------------------

function notebookSource(source) {
  return Array.isArray(source) ? source.join("") : (source || "");
}

function escapeNotebookHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderNotebookOutput(output) {
  const data = output.data || {};

  if (data["text/html"]) {
    const html = Array.isArray(data["text/html"])
      ? data["text/html"].join("")
      : data["text/html"];

    return `<div class="notebook-output-html">
      ${DOMPurify.sanitize(html)}
    </div>`;
  }

  if (data["image/png"]) {
    const image = Array.isArray(data["image/png"])
      ? data["image/png"].join("")
      : data["image/png"];

    return `<img class="notebook-output-image"
      src="data:image/png;base64,${image}"
      alt="Notebook output">`;
  }

  if (data["text/plain"]) {
    const text = Array.isArray(data["text/plain"])
      ? data["text/plain"].join("")
      : data["text/plain"];

    return `<pre class="notebook-output-text">${escapeNotebookHTML(text)}</pre>`;
  }

  if (output.text) {
    return `<pre class="notebook-output-text">${escapeNotebookHTML(notebookSource(output.text))}</pre>`;
  }

  return "";
}

function renderNotebook(notebook, container) {
  if (
    !notebook ||
    notebook.nbformat !== 4 ||
    !Array.isArray(notebook.cells)
  ) {
    container.textContent = "Notebook could not be loaded.";
    return;
  }

  container.innerHTML = "";

  notebook.cells.forEach(cell => {
    const cellElement = document.createElement("section");
    cellElement.className = "notebook-cell";

    const source = notebookSource(cell.source);

    if (cell.cell_type === "markdown") {
      const markdownElement = document.createElement("div");
      markdownElement.className = "notebook-markdown";

      const rendered = marked.parse(source);
      markdownElement.innerHTML = DOMPurify.sanitize(rendered);

      cellElement.appendChild(markdownElement);
    }

    if (cell.cell_type === "code") {
      const codeElement = document.createElement("pre");
      const code = document.createElement("code");

      code.textContent = source;
      code.className = "language-python";

      codeElement.appendChild(code);
      cellElement.appendChild(codeElement);

      if (window.hljs) {
        hljs.highlightElement(code);
      }

      const outputs = document.createElement("div");
      outputs.className = "notebook-outputs";

      (cell.outputs || []).forEach(output => {
        const outputElement = document.createElement("div");
        outputElement.innerHTML = renderNotebookOutput(output);
        outputs.appendChild(outputElement);
      });

      cellElement.appendChild(outputs);
    }

    container.appendChild(cellElement);
  });
}

// -----------------------------------------
// LOAD AND DISPLAY TOPICS
// -----------------------------------------

async function loadNotebookTopics(apiUrl, containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Notebook container not found:", containerId);
    return;
  }

  container.textContent = "Loading topics...";

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to load topics");
    }

    container.innerHTML = "";

    if (!result.data || result.data.length === 0) {
      container.textContent = "No topics available.";
      return;
    }

    result.data.forEach(item => {
      const topic = document.createElement("article");
      topic.className = "notebook-topic";

      const heading = document.createElement("h2");
      heading.textContent = item.topic;
      topic.appendChild(heading);

      const content = document.createElement("div");
      content.className = "notebook-content";

      if (item.notebook) {
        renderNotebook(item.notebook, content);
      } else {
        content.textContent = item.error || "Notebook unavailable.";
      }

      topic.appendChild(content);
      container.appendChild(topic);
    });

  } catch (error) {
    console.error("GSH notebook loading error:", error);
    container.textContent = "Unable to load preparation topics.";
  }
}