const content = {
    skills: [
        "Python", "Applied AI", "Multimodal Systems", "Model Evaluation",
        "Deep Learning", "TypeScript", "SQL", "Redis", "Data Science"
    ],
    experience: [
        {
            company: "Li Auto",
            role: "Algorithm Engineer / AI Engineer",
            period: "Current"
        },
        {
            company: "Guorong Securities",
            role: "Investment Banking Intern",
            period: "Feb 2022 — Apr 2022"
        },
        {
            company: "Capital Jingdu Futures",
            role: "Data Analysis Intern",
            period: "Dec 2021 — Jan 2022"
        }
    ],
    projects: [
        {
            title: "Giving AI Images, Not Just Words",
            meta: "Multimodal AI / 2026",
            detail: "Why screenshots, diagrams, and charts can outperform text-only prompting for visual problems.",
            link: "https://github.com/subcoldzhang/ai-with-images",
            media: "image",
            source: "https://raw.githubusercontent.com/subcoldzhang/ai-with-images/main/images/method_2.png",
            poster: "AI"
        },
        {
            title: "Generative AI for Modeling",
            meta: "Deep Learning Research / 2023—Now",
            detail: "CNN-based predictive modeling, structural analysis, and large-scale data preprocessing.",
            link: "projects/generative_ai.html",
            media: "poster",
            poster: "GA"
        },
        {
            title: "Data Science for Social Good",
            meta: "Data Science / 2024",
            detail: "Deep learning methods and refined model architectures for classification and prediction.",
            link: "projects/dssg_project.html",
            media: "poster",
            poster: "DS"
        },
        {
            title: "AI Phone Voice Assistant",
            meta: "LLM Voice System / 2024—Now",
            detail: "A locally deployed voice assistant for intent analysis and real-time conversational responses.",
            link: "projects/ai_voice_assistant.html",
            media: "video",
            source: "videos/Introduce_phone.mp4",
            poster: "VA"
        }
    ],
    education: [
        {
            period: "2023 — 2025",
            degree: "M.S. in Data Science",
            school: "Vanderbilt University",
            location: "Nashville, Tennessee"
        },
        {
            period: "2019 — 2023",
            degree: "B.S. in Mathematics & Statistics",
            school: "Australian National University",
            location: "Canberra, Australia"
        }
    ]
};

function renderSkills() {
    const marquee = document.getElementById("skill-marquee");
    if (!marquee) return;

    const group = content.skills
        .map(skill => `<span class="skill">${skill}</span>`)
        .join("");

    marquee.innerHTML = `
        <div class="skills-group">${group}</div>
        <div class="skills-group" aria-hidden="true">${group}</div>
    `;
}

function renderExperience() {
    const list = document.getElementById("experience-list");
    if (!list) return;

    list.innerHTML = content.experience.map((item, index) => `
        <article class="experience-row">
            <span class="row-number">0${index + 1}</span>
            <h3>${item.company}</h3>
            <p class="row-role">${item.role}</p>
            <p class="row-period">${item.period}</p>
        </article>
    `).join("");
}

function renderProjectMedia(project, index) {
    if (project.media === "image") {
        return `<img src="${project.source}" alt="Visual from ${project.title}">`;
    }

    if (project.media === "video") {
        return `
            <video muted loop playsinline preload="metadata" aria-label="${project.title} demo">
                <source src="${project.source}" type="video/mp4">
            </video>
        `;
    }

    return `<span class="project-poster">${project.poster}</span>`;
}

function renderProjects() {
    const list = document.getElementById("project-list");
    if (!list) return;

    list.innerHTML = content.projects.map((project, index) => `
        <article class="project-card">
            <div class="project-visual">
                <span class="project-number">0${index + 1}</span>
                ${renderProjectMedia(project, index)}
            </div>
            <div class="project-copy">
                <div>
                    <p class="project-meta">${project.meta}</p>
                    <h3>${project.title}</h3>
                    <p>${project.detail}</p>
                </div>
                <a class="project-link" href="${project.link}" ${project.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} aria-label="Open ${project.title}">↗</a>
            </div>
        </article>
    `).join("");
}

function renderEducation() {
    const list = document.getElementById("education-list");
    if (!list) return;

    list.innerHTML = content.education.map(item => `
        <article class="education-item">
            <p class="education-period">${item.period}</p>
            <h3>${item.degree}</h3>
            <p>${item.school}</p>
            <p>${item.location}</p>
        </article>
    `).join("");
}

function setActiveNav() {
    const links = [...document.querySelectorAll("nav a")];
    const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-42% 0px -52% 0px" });

    sections.forEach(section => observer.observe(section));
}

function setupProjectVideo() {
    const video = document.querySelector(".project-visual video");
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.45 });

    observer.observe(video);
}

document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    setActiveNav();
    setupProjectVideo();
});
