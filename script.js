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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Content rendering ---------------- */
function renderSkills() {
    const marquee = document.getElementById("skill-marquee");
    if (!marquee) return;
    const group = content.skills.map(skill => `<span class="skill">${skill}</span>`).join("");
    marquee.innerHTML = `
        <div class="skills-group">${group}</div>
        <div class="skills-group" aria-hidden="true">${group}</div>
    `;
}

function renderExperience() {
    const list = document.getElementById("experience-list");
    if (!list) return;
    list.innerHTML = content.experience.map((item, index) => `
        <article class="experience-row" data-reveal>
            <span class="row-number">0${index + 1}</span>
            <h3>${item.company}</h3>
            <p class="row-role">${item.role}</p>
            <p class="row-period">${item.period}</p>
        </article>
    `).join("");
}

function renderProjectMedia(project) {
    if (project.media === "image") {
        return `<img src="${project.source}" alt="Visual from ${project.title}" loading="lazy">`;
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
        <article class="project-card" data-reveal>
            <div class="project-visual" data-cursor>
                <span class="project-number">0${index + 1}</span>
                ${renderProjectMedia(project)}
            </div>
            <div class="project-copy">
                <div>
                    <p class="project-meta">${project.meta}</p>
                    <h3>${project.title}</h3>
                    <p>${project.detail}</p>
                </div>
                <a class="project-link" data-magnetic href="${project.link}" ${project.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} aria-label="Open ${project.title}">↗</a>
            </div>
        </article>
    `).join("");
}

function renderEducation() {
    const list = document.getElementById("education-list");
    if (!list) return;
    list.innerHTML = content.education.map(item => `
        <article class="education-item" data-reveal>
            <p class="education-period">${item.period}</p>
            <h3>${item.degree}</h3>
            <p>${item.school}</p>
            <p>${item.location}</p>
        </article>
    `).join("");
}

/* ---------------- Split text into masked words ---------------- */
function splitWords(el) {
    const words = [];
    const build = (source, target) => {
        source.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split(/(\s+)/).forEach(part => {
                    if (part === "") return;
                    if (part.trim() === "") {
                        target.appendChild(document.createTextNode(" "));
                        return;
                    }
                    const mask = document.createElement("span");
                    mask.className = "word";
                    const inner = document.createElement("span");
                    inner.className = "word-in";
                    inner.textContent = part;
                    mask.appendChild(inner);
                    target.appendChild(mask);
                    words.push(inner);
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(false);
                target.appendChild(clone);
                build(node, clone);
            }
        });
    };
    const frag = document.createDocumentFragment();
    build(el, frag);
    el.textContent = "";
    el.appendChild(frag);
    words.forEach((word, i) => {
        word.style.transitionDelay = `${i * 0.045}s`;
    });
}

function setupSplit() {
    document.querySelectorAll("[data-split]").forEach(splitWords);
}

/* ---------------- Scroll reveal ---------------- */
function setupReveal() {
    const items = [...document.querySelectorAll("[data-reveal], [data-split], .hero-media")];
    if (reduceMotion || !("IntersectionObserver" in window)) {
        items.forEach(el => el.classList.add("is-in"));
        return;
    }
    // stagger siblings that reveal together
    items.forEach(el => {
        if (!el.hasAttribute("data-reveal") || el.dataset.split !== undefined) return;
        const siblings = [...el.parentElement.children].filter(c => c.hasAttribute("data-reveal"));
        const index = siblings.indexOf(el);
        if (index > 0) el.style.transitionDelay = `${Math.min(index, 6) * 0.08}s`;
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

    items.forEach(el => observer.observe(el));
}

/* ---------------- Custom cursor ---------------- */
function setupCursor() {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    document.documentElement.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    });

    const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const hoverSelector = "a, button, [data-cursor], [data-magnetic], .about-meta span";
    document.addEventListener("mouseover", e => {
        if (e.target.closest(hoverSelector)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", e => {
        if (e.target.closest(hoverSelector)) ring.classList.remove("is-hover");
    });
    window.addEventListener("mousedown", () => ring.classList.add("is-down"));
    window.addEventListener("mouseup", () => ring.classList.remove("is-down"));
}

/* ---------------- Magnetic buttons ---------------- */
function setupMagnetic() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(el => {
        el.style.transition = "transform 0.3s cubic-bezier(0.19,1,0.22,1)";
        el.addEventListener("mousemove", e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0, 0)";
        });
    });
}

/* ---------------- Hero image parallax ---------------- */
function setupParallax() {
    const img = document.querySelector(".hero-media img");
    if (!img || reduceMotion) return;
    let ticking = false;
    const update = () => {
        const shift = Math.min(window.scrollY, window.innerHeight) * 0.08;
        img.style.transform = `translateY(-${shift}px)`;
        ticking = false;
    };
    window.addEventListener("scroll", () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
}

/* ---------------- Nav: active + hide on scroll ---------------- */
function setupNav() {
    const links = [...document.querySelectorAll("nav a")];
    const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
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

    const topbar = document.querySelector(".topbar");
    if (!topbar) return;
    let last = window.scrollY;
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (y > last && y > 240) topbar.classList.add("is-hidden");
        else topbar.classList.remove("is-hidden");
        last = y;
    }, { passive: true });
}

/* ---------------- Project video autoplay ---------------- */
function setupProjectVideo() {
    const video = document.querySelector(".project-visual video");
    if (!video || reduceMotion) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        });
    }, { threshold: 0.45 });
    observer.observe(video);
}

/* ---------------- Preloader ---------------- */
function runLoader(done) {
    const loader = document.getElementById("loader");
    const count = loader && loader.querySelector(".loader-count");
    const bar = loader && loader.querySelector(".loader-bar span");
    if (!loader || reduceMotion) {
        if (loader) loader.remove();
        done();
        return;
    }
    const duration = 1300;
    const start = performance.now();
    const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(eased * 100);
        if (count) count.textContent = `${value}`;
        if (bar) bar.style.transform = `scaleX(${eased})`;
        if (p < 1) {
            requestAnimationFrame(tick);
        } else {
            setTimeout(() => {
                loader.classList.add("is-done");
                done();
                setTimeout(() => loader.remove(), 1100);
            }, 160);
        }
    };
    requestAnimationFrame(tick);
}

/* ---------------- Init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();

    setupSplit();
    setupCursor();
    setupMagnetic();
    setupParallax();
    setupNav();
    setupProjectVideo();

    runLoader(() => {
        // reveal starts once the curtain begins lifting
        setupReveal();
    });
});
