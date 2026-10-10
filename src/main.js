const app = document.querySelector('#app');

app.innerHTML = `
  <main class="page-shell">
    <section class="card">
      <p class="eyebrow">Project status</p>
      <h1>Word Matrix Graph</h1>
      <p class="lede">
        A minimal Vercel-ready application scaffold for the word matrix graph project.
      </p>
      <div class="metrics" aria-label="Project metrics">
        <div>
          <span class="label">Build</span>
          <strong>Vite</strong>
        </div>
        <div>
          <span class="label">Deploy</span>
          <strong>Vercel</strong>
        </div>
        <div>
          <span class="label">State</span>
          <strong>Ready</strong>
        </div>
      </div>
    </section>
  </main>
`;
