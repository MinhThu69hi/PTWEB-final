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

    // --- Chức năng "Thanh toán lại" ---
    const retryButton = document.querySelector('.retry-button');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            // Giả lập quay lại trang thanh toán hoặc giỏ hàng
            alert('Đang chuyển đến trang thanh toán...');
            // Thay đổi URL tới trang giỏ hàng/thanh toán của bạn
            // window.location.href = '/basket.html'; 
        });
    }
    
    // --- Chức năng "Thay đổi phương thức" ---
    const changeMethodLink = document.querySelector('.change-method-link');
    if (changeMethodLink) {
        changeMethodLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Đang chuyển đến trang thanh toán...');
            // Thay đổi URL tới trang giỏ hàng/thanh toán của bạn
            // window.location.href = '/basket.html';
        });
    }
});