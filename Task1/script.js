const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const bars = document.querySelectorAll('.bar');
const strengthText = document.getElementById('strengthText');
const requirements = document.querySelectorAll('#requirements li');

// Function to evaluate password strength
function checkPasswordStrength(password) {
  let strength = 'Weak';
  let barCount = 1;

  // Check length
  const hasMinLength = password.length >= 6;
  requirements[0].classList.toggle('valid', hasMinLength);

  // Check for numbers
  const hasNumber = /\d/.test(password);
  requirements[1].classList.toggle('valid', hasNumber);

  // Check for special characters
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  requirements[2].classList.toggle('valid', hasSpecialChar);

  if (password.length > 10 && hasNumber && hasSpecialChar) {
    strength = 'Strong';
    barCount = 3;
  } else if (password.length >= 6 && (hasNumber || hasSpecialChar)) {
    strength = 'Medium';
    barCount = 2;
  }

  updateIndicator(strength, barCount);
}

// Update the visual indicator
function updateIndicator(strength, barCount) {
  bars.forEach((bar, index) => {
    if (index < barCount) {
      bar.style.backgroundColor = getBarColor(strength);
      bar.classList.add('active'); // Add active class for scaling effect
    } else {
      bar.style.backgroundColor = '#e0e0e0';
      bar.classList.remove('active'); // Remove active class
    }
  });
  strengthText.textContent = `Strength: ${strength}`;
}

// Get color based on strength
function getBarColor(strength) {
  switch (strength) {
    case 'Weak':
      return 'red';
    case 'Medium':
      return 'yellow';
    case 'Strong':
      return 'green';
    default:
      return '#e0e0e0';
  }
}

// Event listener for password input
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  checkPasswordStrength(password);
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});