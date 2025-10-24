document.addEventListener('DOMContentLoaded', function() {
    
    // --- Chức năng "Copy" mã đơn hàng ---
    const copyLink = document.querySelector('.copy-link');
    if (copyLink) {
        copyLink.addEventListener('click', function(event) {
            event.preventDefault();
            const orderId = this.previousElementSibling.innerText;
            navigator.clipboard.writeText(orderId).then(() => {
                const originalText = this.innerText;
                this.innerText = 'Đã copy!';
                setTimeout(() => { this.innerText = originalText; }, 2000);
            });
        });
    }

    // --- Chức năng "Theo dõi đơn hàng" ---
    const trackOrderLink = document.querySelector('.track-order-link');
    if (trackOrderLink) {
        trackOrderLink.addEventListener('click', function(event) {
            event.preventDefault();
            // Chuyển đến trang chi tiết đơn hàng
            window.location.href = 'order_code.html';
        });
    }

    // --- Chức năng "Về trang chủ" ---
    const homeButton = document.querySelector('.home-button');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            // Chuyển về trang chủ (thay đổi '/' nếu cần)
            window.location.href = '/';
        });
    }
});