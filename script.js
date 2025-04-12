
// === Lưu bài viết mới ===
const postForm = document.getElementById('postForm');
if (postForm) {
  const imageUpload = document.getElementById('imageUpload');
  const previewImage = document.getElementById('previewImage');

  imageUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      previewImage.src = ev.target.result;
      previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  postForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image = previewImage.src || '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (title === '' || content === '') {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      return;
    }

    const currentUser = localStorage.getItem('currentUser') || 'Ẩn danh';

    posts.push({ title, content, image, author: currentUser, comments: [] });
    localStorage.setItem('posts', JSON.stringify(posts));

    alert('Đăng bài thành công!');
    postForm.reset();
    previewImage.src = '';
    previewImage.style.display = 'none';
    window.location.href = 'blog.html';
  });
}


// === Hiển thị danh sách bài viết ===
const postList = document.getElementById('postList');
if (postList) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  postList.innerHTML = posts.length ? '' : '<p>Chưa có bài viết nào!</p>';

  posts.forEach((post, index) => {
    postList.innerHTML += `
      <div class="post-item">
        <h3>${post.title}</h3>
        <p>Người đăng: <b>${post.author || 'Ẩn danh'}</b></p>
        ${post.image ? `<img src="${post.image}" style="max-width:200px; display:block;margin:8px 0;">` : ''}
        <p>${post.content.slice(0, 50)}...</p>
        <a href="detail.html?id=${index}">Xem chi tiết</a> |
        <a href="post.html?edit=${index}">Sửa</a> |
        <a href="#" onclick="adminDeletePost(${index})" style="color:red;">Xóa</a>
        <hr>
      </div>
    `;
  });
}


// === Xóa bài viết cần mã bảo vệ ===
function adminDeletePost(index) {
  if (confirm('Xóa bài viết này cần nhập mã bảo vệ. Bạn có chắc không?')) {
    const code = prompt('Nhập mã bảo vệ:');
    if (code === 'Adxoa1') {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      alert('Đã xóa bài viết!');
      location.reload();
    } else {
      alert('Sai mã rồi bạn ơi!');
    }
  }
}


// === Chi tiết bài viết + Comment ===
const postDetail = document.getElementById('postDetail');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

if (postDetail) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const post = posts[id] || {};

  postDetail.innerHTML = `
    <h2>${post.title || ''}</h2>
    <p>Người đăng: <b>${post.author || 'Ẩn danh'}</b></p>
    <p>${post.content || ''}</p>
    ${post.image ? `<img src="${post.image}" style="max-width:400px; display:block;margin:10px 0;">` : ''}
  `;

  if (commentForm) {
    commentList.innerHTML = '';
    post.comments.forEach(c => {
      commentList.innerHTML += `<p>- ${c}</p>`;
    });

    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        alert('Bạn cần đăng nhập để bình luận!');
        window.location.href = 'login.html';
        return;
      }

      const cm = document.getElementById('comment').value;
      post.comments.push(cm);
      localStorage.setItem('posts', JSON.stringify(posts));
      commentList.innerHTML += `<p>- ${cm}</p>`;
      commentForm.reset();
    });
  }
}


// === Check đăng nhập khi Đăng bài hoặc Comment ===
if (postForm || commentForm) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    alert('Bạn cần đăng nhập!');
    window.location.href = 'auth.html';
  }
}
// Hiển thị tên user + Đăng xuất
const userInfo = document.getElementById('userInfo');
const currentUser = localStorage.getItem('currentUser');

if (userInfo) {
  if (currentUser) {
    userInfo.innerHTML = `
      Xin chào, <b>${currentUser}</b> | 
      <a href="#" onclick="logout()">Đăng xuất</a>
    `;
  } else {
    userInfo.innerHTML = `
      <a href="login.html">Đăng nhập</a> | 
      <a href="register.html">Đăng ký</a>
    `;
  }
}

// Đăng xuất
function logout() {
  if (confirm('Bạn có chắc muốn đăng xuất không?')) {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
}
window.addEventListener('DOMContentLoaded', function () {
  const postForm = document.getElementById('postForm');
  if (postForm) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để đăng bài!');
      window.location.href = 'auth.html';
    }
  }
});
// Đợi load xong hết rồi mới check
window.addEventListener('DOMContentLoaded', function () {
  const postForm = document.getElementById('postForm');

  if (postForm) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để đăng bài!');
      window.location.href = 'login.html';
    }

    postForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      const image = previewImage.src || '';
      const posts = JSON.parse(localStorage.getItem('posts')) || [];

      if (title === '' || content === '') {
        alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
        return;
      }

      posts.push({
        title,
        content,
        image,
        author: currentUser,
        comments: []
      });

      localStorage.setItem('posts', JSON.stringify(posts));
      alert('Đăng bài thành công!');
      postForm.reset();
      previewImage.src = '';
      previewImage.style.display = 'none';
      window.location.href = 'blog.html';
    });
  }
});
