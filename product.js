let currentProduct = {
    id: "cm-1245",
    name: "Canapea extensibilă gri",
    price: 2499,
    images: [
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://confort.md/image/catalog/Canapea/N-4/suport%20brate2/4_72dpi.jpg"
    ]
};

let currentIndex = 0;
let isZoomed = false;
let scale = 1;
let posX = 50, posY = 50;

const container = document.getElementById('imageContainer');
const img = document.getElementById('mainImage');

function resetZoom() {
    isZoomed = false;
    scale = 1;
    posX = 50;
    posY = 50;
    container.classList.remove('zoom-active');
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
}

function updateTransform() {
    img.style.transformOrigin = `${posX}% ${posY}%`;
    img.style.transform = `scale(${scale})`;
}

container.addEventListener('click', () => {
    isZoomed = !isZoomed;
    container.classList.toggle('zoom-active', isZoomed);
    if (!isZoomed) resetZoom();
});

container.addEventListener('mousemove', (e) => {
    if (!isZoomed) return;
    const rect = container.getBoundingClientRect();
    posX = ((e.clientX - rect.left) / rect.width) * 100;
    posY = ((e.clientY - rect.top) / rect.height) * 100;
    updateTransform();
});

container.addEventListener('wheel', (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    scale += e.deltaY * -0.002;
    scale = Math.max(1, Math.min(scale, 4));
    updateTransform();
});

function showImage(index) {
    currentIndex = index;
    img.src = currentProduct.images[currentIndex];
    resetZoom();               
    updateThumbnails();
}

function prevImage() {
    showImage((currentIndex - 1 + currentProduct.images.length) % currentProduct.images.length);
}

function nextImage() {
    showImage((currentIndex + 1) % currentProduct.images.length);
}

function updateThumbnails() {
    const cont = document.getElementById('thumbnails');
    cont.innerHTML = '';
    currentProduct.images.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = `thumbnail ${i === currentIndex ? 'active' : ''}`;
        thumb.onclick = () => showImage(i);
        cont.appendChild(thumb);
    });
}

function changeQuantity(change) {
    const qty = document.getElementById('quantity');
    let val = parseInt(qty.value);
    qty.value = Math.max(1, val + change);
}

function addCurrentProductToCart() {
    const qty = parseInt(document.getElementById('quantity').value);
    for (let i = 0; i < qty; i++) {
        addToCart(currentProduct.id, currentProduct.name, currentProduct.price, currentProduct.images[currentIndex]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateThumbnails();
    showImage(0);
});