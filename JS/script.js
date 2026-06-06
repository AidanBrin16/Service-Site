// Reservation time slot selection
document.querySelectorAll('.time-slot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Enable the confirm button once a time is selected
    const confirmBtn = document.querySelector('.res-confirm-btn');
    confirmBtn.classList.add('ready');
  });
});

// Confirm button — only navigate if a time is selected
document.querySelector('.res-confirm-btn').addEventListener('click', () => {
  const selected = document.querySelector('.time-slot.selected');
  if (selected) {
    window.location.href = 'confirmRes.html';
  }
});