document.addEventListener('DOMContentLoaded', function() {
    // --- Chức năng Copy ---
    const copyLink = document.querySelector('.copy-link');
    if (copyLink) {
        copyLink.addEventListener('click', function(event) {
            event.preventDefault();
            const orderId = this.previousElementSibling.innerText;
            navigator.clipboard.writeText(orderId).then(() => {
                this.innerText = 'Đã copy!';
                setTimeout(() => { this.innerText = 'Copy'; }, 2000);
            });
        });
    }

    // --- Chức năng nút Thanh toán ---
    const paymentButton = document.querySelector('.payment-button');
    if (paymentButton) {
        paymentButton.addEventListener('click', () => {
            window.location.href = 'VNpay_payment.html';
        });
    }
});