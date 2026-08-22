/** @odoo-module **/

document.addEventListener("DOMContentLoaded", () => {
    const panel = document.querySelector("[data-starpil-mobile-panel]");
    const openButton = document.querySelector("[data-starpil-mobile-open]");
    const closeButtons = document.querySelectorAll("[data-starpil-mobile-close]");

    const setMobileMenu = (open) => {
        if (!panel) return;
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", String(!open));
        document.body.classList.toggle("menu-open", open);
    };

    openButton?.addEventListener("click", () => setMobileMenu(true));
    closeButtons.forEach((button) => button.addEventListener("click", () => setMobileMenu(false)));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMobileMenu(false);
    });

    document.querySelectorAll("[data-starpil-points-calculator]").forEach((calculator) => {
        const input = calculator.closest(".product-info")?.querySelector("[name='quantity']");
        const output = calculator.querySelector("[data-points-output]");
        const unitPoints = Number(calculator.dataset.unitPoints || 0);
        if (!input || !output) return;
        const refresh = () => {
            const quantity = Math.max(1, Math.min(99, Number(input.value || 1)));
            output.textContent = Math.floor(unitPoints * quantity).toLocaleString();
        };
        input.addEventListener("input", refresh);
        input.addEventListener("change", refresh);
        refresh();
    });

    const slides = [...document.querySelectorAll("[data-starpil-hero-slide]")];
    const dots = [...document.querySelectorAll("[data-starpil-hero-dot]")];
    if (slides.length > 1) {
        let current = 0;
        let timer;
        const show = (index) => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, position) => {
                const active = position === current;
                slide.classList.toggle("is-active", active);
                slide.setAttribute("aria-hidden", String(!active));
            });
            dots.forEach((dot, position) => {
                dot.classList.toggle("is-active", position === current);
                dot.setAttribute("aria-current", position === current ? "true" : "false");
            });
        };
        const start = () => {
            window.clearInterval(timer);
            timer = window.setInterval(() => show(current + 1), 6500);
        };
        document.querySelector("[data-starpil-hero-prev]")?.addEventListener("click", () => { show(current - 1); start(); });
        document.querySelector("[data-starpil-hero-next]")?.addEventListener("click", () => { show(current + 1); start(); });
        dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.starpilHeroDot)); start(); }));
        show(0);
        start();
    }
});
