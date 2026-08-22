/** @odoo-module **/

const initStarpilFrontend = () => {
    if (document.documentElement.dataset.starpilFrontendReady === "1") return;
    document.documentElement.dataset.starpilFrontendReady = "1";

    const panel = document.querySelector("[data-starpil-mobile-panel]");
    const openButton = document.querySelector("[data-starpil-mobile-open]");
    const closeButtons = document.querySelectorAll("[data-starpil-mobile-close]");

    const setMobileMenu = (open) => {
        if (!panel) return;
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", String(!open));
        openButton?.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menu-open", open);
        if (open) {
            panel.querySelector("a, button")?.focus({preventScroll: true});
        } else {
            openButton?.focus({preventScroll: true});
        }
    };

    openButton?.setAttribute("aria-expanded", "false");
    openButton?.addEventListener("click", () => setMobileMenu(true));
    closeButtons.forEach((button) => button.addEventListener("click", () => setMobileMenu(false)));
    panel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));
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

    document.querySelectorAll("[data-starpil-address-form]").forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const feedback = form.querySelector("[data-starpil-address-feedback]");
            const button = form.querySelector("button[type='submit']");
            if (feedback) {
                feedback.className = "starpil-address-feedback";
                feedback.textContent = "Saving address…";
            }
            if (button) button.disabled = true;
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    credentials: "same-origin",
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                });
                const result = JSON.parse(await response.text());
                if (result.invalid_fields?.length || result.error_messages?.length) {
                    const messages = result.error_messages || ["Check the highlighted address fields."];
                    if (feedback) {
                        feedback.classList.add("is-error");
                        feedback.textContent = messages.join(" ");
                    }
                    result.invalid_fields?.forEach((name) => {
                        form.querySelector(`[name="${CSS.escape(name)}"]`)?.classList.add("is-invalid");
                    });
                    return;
                }
                if (feedback) {
                    feedback.classList.add("is-success");
                    feedback.textContent = "Address saved. Refreshing delivery and payment…";
                }
                window.location.assign(result.redirectUrl || "/starpil/checkout");
            } catch (_error) {
                if (feedback) {
                    feedback.classList.add("is-error");
                    feedback.textContent = "The address could not be saved. Please try again.";
                }
            } finally {
                if (button) button.disabled = false;
            }
        });
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
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStarpilFrontend, {once: true});
} else {
    initStarpilFrontend();
}
