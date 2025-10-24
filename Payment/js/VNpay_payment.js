document.addEventListener('DOMContentLoaded', function() {
    // --- Chức năng đếm ngược thời gian ---
    const timeBoxes = document.querySelectorAll('.time-box');
    const minutesEl = timeBoxes[0];
    const secondsEl = timeBoxes[1];

    let durationInSeconds = 8 * 60 + 20; // 8 phút 20 giây

    const timerInterval = setInterval(() => {
        if (durationInSeconds <= 0) {
            clearInterval(timerInterval);
            alert('Giao dịch đã hết hạn!');
            return;
        }

        durationInSeconds--;

        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;

        // Cập nhật giao diện
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');

    }, 1000);

    // --- Chức năng các nút hủy/đóng ---
    const cancelButton = document.querySelector('.cancel-link');
    const closeButton = document.querySelector('.close-btn');
    const backButton = document.querySelector('.back-btn');

    function redirectToCancelPage() {
        window.location.href = 'cancel_payment.html';
    }

    if (cancelButton) cancelButton.addEventListener('click', redirectToCancelPage);
    if (closeButton) closeButton.addEventListener('click', redirectToCancelPage);
    if (backButton) backButton.addEventListener('click', redirectToCancelPage);
});