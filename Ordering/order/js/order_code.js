document.addEventListener('DOMContentLoaded', function() {

    // --- Chức năng nút "Back" ---
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Quay lại trang trước đó trong lịch sử trình duyệt
            window.history.back();
        });
    }

    // --- Chức năng "Copy" mã đơn hàng ---
    const copyLink = document.querySelector('.copy-link');
    if (copyLink) {
        copyLink.addEventListener('click', function(event) {
            event.preventDefault();
            const orderId = document.querySelector('.order-header strong').innerText;
            
            navigator.clipboard.writeText(orderId).then(() => {
                const originalText = this.innerText;
                this.innerText = 'Đã copy!';
                setTimeout(() => {
                    this.innerText = originalText;
                }, 2000);
            });
        });
    }

    // --- Chức năng "Hủy đơn hàng" ---
    const cancelButton = document.querySelector('.cancel-button');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // Hiển thị hộp thoại xác nhận của trình duyệt
            const isConfirmed = confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
            
            if (isConfirmed) {
                // Nếu người dùng đồng ý, bạn có thể chuyển hướng họ
                // đến trang hủy thành công hoặc thực hiện logic hủy ở đây.
                alert('Đã gửi yêu cầu hủy đơn hàng!');
                // Ví dụ: window.location.href = 'cancellation_successful.html';
            }
        });
    }
});