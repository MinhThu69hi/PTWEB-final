// Chờ cho toàn bộ nội dung HTML được tải xong rồi mới chạy mã
document.addEventListener('DOMContentLoaded', function() {

    // --- Chức năng Copy mã đơn hàng ---
    const copyLink = document.querySelector('.copy-link');
    
    if (copyLink) {
        copyLink.addEventListener('click', function(event) {
            // Ngăn hành vi mặc định của thẻ <a> (không nhảy lên đầu trang)
            event.preventDefault(); 
            
            // Tìm phần tử chứa mã đơn hàng
            const orderIdElement = this.previousElementSibling;
            const orderId = orderIdElement.innerText;
            
            // Sử dụng API Clipboard để sao chép
            navigator.clipboard.writeText(orderId).then(() => {
                // Thay đổi text để thông báo cho người dùng
                const originalText = this.innerText;
                this.innerText = 'Đã copy!';
                
                // Quay lại text ban đầu sau 2 giây
                setTimeout(() => {
                    this.innerText = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Không thể sao chép: ', err);
            });
        });
    }

    // --- Chức năng nút "Về trang chủ" ---
    const homeButton = document.querySelector('.home-button');

    if (homeButton) {
        homeButton.addEventListener('click', function() {
            // Điều hướng người dùng về trang chủ
            // Thay đổi "/" bằng URL trang chủ của bạn nếu cần
            window.location.href = '/'; 
        });
    }

});