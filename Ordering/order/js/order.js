document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy tất cả các link "Chi tiết"
    const detailLinks = document.querySelectorAll('.details-link');

    // 2. Lặp qua từng link và thêm sự kiện click
    detailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Ngăn hành vi mặc định của thẻ <a>
            event.preventDefault(); 
            
            // Lấy mã đơn hàng từ phần tử strong gần nhất
            // Đây là cách giả lập, trong thực tế bạn sẽ truyền ID
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.querySelector('.order-id strong').innerText;
            console.log('Xem chi tiết cho đơn hàng:', orderId);
            
            // Chuyển hướng đến trang chi tiết
            // Trong dự án thật, bạn có thể truyền ID qua URL, ví dụ: 'order_code.html?id=' + orderId
            window.location.href = 'order_code.html'; 
        });
    });
});