const content = {
    experience: [
        {
            company: "Li Auto",
            role: "Algorithm Engineer / AI Engineer",
            date: "Current",
            detail: "Working on practical AI systems, algorithm research and development, solution design, and model building for production environments."
        },
        {
            company: "Guorong Securities",
            role: "Investment Banking Intern",
            date: "Feb 2022 - Apr 2022",
            detail: "Completed listing feasibility studies and industry prospect analyses using quantitative methods to evaluate market position and growth potential."
        },
        {
            company: "Capital Jingdu Futures",
            role: "Data Analysis Intern",
            date: "Dec 2021 - Jan 2022",
            detail: "Prepared weekly corporate analysis reports and transformed raw data into visual insights with Matplotlib and Seaborn."
        }
    ],
    projects: [
        {
            title: "Giving AI Images, Not Just Words",
            meta: "Multimodal AI research write-up / Apr 2026",
            detail: "A public write-up on why giving models screenshots, diagrams, and charts can outperform text-only prompting for visual problems.",
            tags: ["multimodal", "vision", "prompting"],
            link: "https://github.com/subcoldzhang/ai-with-images"
        },
        {
            title: "Generative AI for Modeling",
            meta: "Research analyst / Nov 2023 - Now",
            detail: "Integrated CNNs and deep learning techniques to improve predictive modeling, data preprocessing, and structural analysis workflows.",
            tags: ["deep-learning", "cnn", "research"],
            link: "projects/generative_ai.html"
        },
        {
            title: "Data Science for Social Good",
            meta: "Data scientist / Jun 2024 - Aug 2024",
            detail: "Developed and refined predictive methods using deep learning model architectures for classification and analysis tasks.",
            tags: ["data-science", "modeling", "social-good"],
            link: "projects/dssg_project.html"
        },
        {
            title: "AI Phone Voice Assistant",
            meta: "Python engineer / Jun 2024 - Now",
            detail: "Designed a locally deployed LLM voice assistant for real-time caller interaction, intent analysis, and conversational response generation.",
            tags: ["python", "llm", "voice"],
            link: "projects/ai_voice_assistant.html"
        }
    ],
    education: [
        {
            degree: "Master of Science in Data Science",
            date: "Aug 2023 - May 2025",
            school: "Vanderbilt University",
            location: "Nashville, TN"
        },
        {
            degree: "Bachelor of Mathematical Sciences & Statistics",
            date: "Feb 2019 - July 2023",
            school: "Australian National University",
            location: "Canberra, Australia"
        }
    ]
};

function renderExperience() {
    const list = document.getElementById("experience-list");
    if (!list) return;

    list.innerHTML = content.experience.map(item => `
        <article class="timeline-item">
            <div class="timeline-date">${item.date}</div>
            <div>
                <h3>${item.company}</h3>
                <p class="mono muted">${item.role}</p>
                <p>${item.detail}</p>
            </div>
        </article>
    `).join("");
}

function renderProjects() {
    const list = document.getElementById("project-list");
    if (!list) return;

    list.innerHTML = content.projects.map(project => `
        <article class="project-card">
            <p class="project-meta">${project.meta}</p>
            <h3>${project.title}</h3>
            <p>${project.detail}</p>
            <a class="card-link" href="${project.link}" ${project.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>open project</a>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>#${tag}</span>`).join("")}
            </div>
        </article>
    `).join("");
}

function renderEducation() {
    const list = document.getElementById("education-list");
    if (!list) return;

    list.innerHTML = content.education.map(item => `
        <article class="education-card">
            <p class="education-meta">${item.date}</p>
            <h3>${item.degree}</h3>
            <p>${item.school}</p>
            <p>${item.location}</p>
        </article>
    `).join("");
}

function animateTerminal() {
    const terminal = document.getElementById("terminal-line");
    if (!terminal) return;

    const lines = [
        "$ run model-eval --focus multimodal",
        "$ ship useful systems > clever demos",
        "$ stack: python | typescript | sql",
        "$ status: building at Li Auto"
    ];
    let index = 0;

    setInterval(() => {
        index = (index + 1) % lines.length;
        terminal.textContent = lines[index];
    }, 1800);
}

function setActiveNav() {
    const links = [...document.querySelectorAll("nav a")];
    const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
    renderExperience();
    renderProjects();
    renderEducation();
    animateTerminal();
    setActiveNav();
});
