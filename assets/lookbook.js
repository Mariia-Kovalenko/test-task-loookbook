const cart =
    document.querySelector("cart-notification") ||
    document.querySelector("cart-drawer");

const lookbookModal = document.getElementById("lookbookModal");

function openModal() {
    lookbookModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    lookbookModal.setAttribute("aria-modal", "true");
    lookbookModal.setAttribute("aria-labelledby", "lookbookModalTitle");
}

function closeModal() {
    lookbookModal.style.display = "none";
    document.body.style.overflow = "auto";

    lookbookModal.removeAttribute("aria-modal");
    lookbookModal.removeAttribute("aria-labelledby");
}

async function fetchCartDrawerHtml() {
    const url = `/?section_id=cart-drawer&sections_url=/cart`;
    try {
        const response = await fetch(url);
        const data = await response.text();

        return data;
    } catch (error) {
        console.error("Error fetching cart drawer:", error);
    }
}

async function fetchCartIconBubbleHtml() {
    const url = `/?section_id=cart-icon-bubble&sections_url=/cart`;
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error fetching cart icon bubble:", error);
    }
}

document
    .querySelector(".shop-the-look-btn")
    .addEventListener("click", openModal);
window.onclick = function (event) {
    if (event.target == lookbookModal) {
        closeModal();
    }
};

// close upon clicking the close button
document.querySelector(".close-button").addEventListener("click", function () {
    closeModal();
});

document
    .querySelectorAll(".add-to-cart-btn:not(.disabled)")
    .forEach((button) => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            const container = button.closest(".product-actions");
            const variantInput = container.querySelector(".variant-select");
            const variantId = variantInput.value;

            try {
                const response = await fetch("/cart/add.js", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items: [{ id: variantId, quantity: 1 }],
                    }),
                });

                const data = await response.json();
                console.log("Product added", data);

                // close the modal
                closeModal();
                // fetch cart drawer html
                const cartDrawerHtml = await fetchCartDrawerHtml();
                const cartIconBubbleHtml = await fetchCartIconBubbleHtml();

                const sections = cart
                    .getSectionsToRender()
                    .map((section) => section.id);
                sections["cart-drawer"] = cartDrawerHtml;

                const sectionsObject = {
                    "cart-drawer": cartDrawerHtml,
                    "cart-icon-bubble": cartIconBubbleHtml,
                };

                // Emit custom cart:change event
                const cartChangeEvent = new CustomEvent("cart:change", {
                    detail: { id: variantId, sections: sectionsObject },
                });
                window.dispatchEvent(cartChangeEvent);
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        });
    });
