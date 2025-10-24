document.addEventListener('DOMContentLoaded', function() {

    // --- Chức năng nút đóng ---
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            window.history.back(); // Quay lại trang trước đó
        });
    }

    // --- Chức năng chọn voucher ---
    const voucherItems = document.querySelectorAll('.voucher-item');
    voucherItems.forEach(item => {
        item.addEventListener('click', function() {
            // Bỏ chọn tất cả các voucher khác
            voucherItems.forEach(v => v.classList.remove('selected'));
            // Chọn voucher này
            this.classList.add('selected');
        });
    });

    // --- Chức năng nút "Áp dụng" ---
    const applyButton = document.querySelector('.apply-button.primary');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            // Sau khi áp dụng, chuyển về trang thanh toán đã được cập nhật
            window.location.href = 'update_order_information.html';
        });
    }
});