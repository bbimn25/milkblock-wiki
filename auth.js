// Đăng ký
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username)) {
    alert('Tên đăng nhập đã tồn tại!');
    return;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Đăng ký thành công!');
  registerForm.reset();
});

// Đăng nhập
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Sai tài khoản hoặc mật khẩu!');
    return;
  }

  localStorage.setItem('currentUser', username);
  alert('Đăng nhập thành công!');
  window.location.href = 'index.html';
});
