document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.btn-secondary');
    const confirmButton = document.querySelector('.btn-primary');

    if (closeButton) {
        // Nút "Đóng" -> quay lại trang thanh toán VNPay
        closeButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    if (confirmButton) {
        // Nút "Xác nhận hủy" -> quay về trang điền thông tin ban đầu
        confirmButton.addEventListener('click', () => {
            window.location.href = 'order_information.html';
        });
    }
});