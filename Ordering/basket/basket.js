document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LẤY RA CÁC PHẦN TỬ CẦN THIẾT ---
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = document.querySelectorAll('.cart-item .custom-checkbox');
    const allItems = document.querySelectorAll('.cart-item');
    
    // Các phần tử cần cập nhật
    const selectionInfo = document.querySelector('.selection-info');
    const subtotalPriceElement = document.querySelector('.subtotal-price');
    const cartHeader = document.querySelector('.cart-header h3');


    // --- 2. HÀM CẬP NHẬT GIỎ HÀNG ---
    // Đây là hàm trung tâm, được gọi mỗi khi có thay đổi
    function updateCart() {
        let selectedCount = 0;
        let subtotal = 0;
        const totalItemsInCart = allItems.length; // Tổng số sản phẩm có trong giỏ

        // Lặp qua từng sản phẩm để tính toán
        allItems.forEach(item => {
            const checkbox = item.querySelector('.custom-checkbox');
            const priceElement = item.querySelector('.item-price');

            if (checkbox.classList.contains('checked')) {
                selectedCount++;
                
                // Chuyển giá từ dạng chuỗi "599.000 đ" sang dạng số 599000
                const priceText = priceElement.innerText; // "599.000 đ"
                const price = parseInt(priceText.replace(/\./g, '').replace(' đ', ''));
                subtotal += price;
            }
        });

        // Cập nhật giao diện người dùng
        selectionInfo.innerText = `Bạn đã chọn ${selectedCount} sản phẩm`;
        subtotalPriceElement.innerText = subtotal.toLocaleString('vi-VN') + ' đ';

        // Cập nhật tiêu đề giỏ hàng (hiển thị tổng số sản phẩm)
        cartHeader.innerText = `Giỏ hàng (${totalItemsInCart})`;
        
        // Kiểm tra và cập nhật trạng thái cho checkbox "Chọn tất cả"
        if (selectedCount > 0 && selectedCount === totalItemsInCart) {
            selectAllCheckbox.classList.add('checked');
        } else {
            selectAllCheckbox.classList.remove('checked');
        }
    }


    // --- 3. GẮN SỰ KIỆN CLICK ---

    // Sự kiện cho nút "Chọn tất cả"
    selectAllCheckbox.addEventListener('click', function() {
        // toggle trả về true nếu class được thêm vào, false nếu bị gỡ bỏ
        const isChecked = this.classList.toggle('checked'); 

        itemCheckboxes.forEach(checkbox => {
            if (isChecked) {
                checkbox.classList.add('checked');
            } else {
                checkbox.classList.remove('checked');
            }
        });

        updateCart(); // Gọi hàm cập nhật sau khi thay đổi
    });

    // Sự kiện cho từng checkbox của sản phẩm
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            updateCart(); // Gọi hàm cập nhật sau khi thay đổi
        });
    });

    // --- 4. CHẠY CẬP NHẬT LẦN ĐẦU KHI TẢI TRANG ---
    updateCart();

});