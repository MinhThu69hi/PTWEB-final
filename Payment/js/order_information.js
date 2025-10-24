document.addEventListener('DOMContentLoaded', function() {

    // --- Hàm xử lý việc chọn một option trong một nhóm ---
    function handleOptionSelection(optionSelector) {
        const options = document.querySelectorAll(optionSelector);
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Bỏ class 'selected' khỏi tất cả các option trong nhóm
                options.forEach(opt => opt.classList.remove('selected'));
                // Thêm class 'selected' cho option vừa được click
                this.classList.add('selected');
                // Tự động check vào radio button bên trong
                this.querySelector('input[type="radio"]').checked = true;
            });
        });
    }

    // Áp dụng hàm cho nhóm phương thức vận chuyển
    handleOptionSelection('.shipping-option');

    // Áp dụng hàm cho nhóm phương thức thanh toán
    handleOptionSelection('.payment-option');

    // --- Xử lý nút "Thanh toán" ---
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn form submit mặc định

            // Tìm phương thức thanh toán đang được chọn
            const selectedPayment = document.querySelector('.payment-option.selected input[type="radio"]');
            
            // Giả lập giá trị cho radio button để dễ kiểm tra
            // Thêm value="cod" và value="vnpay" vào HTML nếu chưa có
            document.querySelector('.payment-option input[name="payment"]').value = 'cod';
            document.querySelectorAll('.payment-option input[name="payment"]')[1].value = 'vnpay';
            
            if (selectedPayment.value === 'vnpay') {
                // Nếu chọn VNPAY, chuyển đến trang thông tin VNPAY
                window.location.href = 'VNpay_order_infor.html';
            } else {
                // Nếu chọn COD, chuyển đến trang đặt hàng thành công
                window.location.href = 'Order_successful.html'; 
            }
        });
    }
});