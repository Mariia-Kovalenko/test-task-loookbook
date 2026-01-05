# Lookbook Section

## Overview
The Lookbook section is a dynamic feature that showcases a collection of products in a visually appealing manner. This section integrates seamlessly with existing features like the cart drawer from the Dawn theme, ensuring a smooth user experience.

## Features
- **Customizable Background Colors:** Set specific colors for the background of the section and modal.
- **Image Placement Options:** Choose between left or right alignment for the lookbook image.
- **Product Display:** Select products to be displayed within the lookbook.
- **Modal Integration:** Display a modal with detailed product views when users click "Shop the look."

## Customization Settings
- **`background_color`:** Color picker to set the background color.
- **`modal_background_color`:** Color picker specifically for modal background.
- **`image`:** Select an image to be displayed in the lookbook.
- **`text`:** A text description to complement the lookbook.
- **`alignment`:** Options to align the image to the "left" or "right."
- **`products`:** A list of products to showcase within the section.

## Modal Functionality
The modal opens when the "Shop the look" button is clicked. It provides detailed views of the products. Users can select variants if available.

### Products and AJAX Integration
- Products can be added to the cart using AJAX, ensuring no page reload is necessary.
- The logic is integrated with the existing cart drawer and cart icon bubble, updating these components dynamically with the product additions.
