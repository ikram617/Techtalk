document.addEventListener('DOMContentLoaded', () => {
    fetch('archive.php')
        .then(response => response.json())
        .then(data => {
            const postsDiv = document.querySelector('.posts');
            
            if (data.error) {
                postsDiv.innerHTML = `<p>${data.error}</p>`;
                return;
            }

            const comments = data;

            if (comments.length === 0) {
                postsDiv.innerHTML = '<p>No comments found.</p>';
            } else {
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('postLike');

                    commentDiv.innerHTML = `
                        <div class="AffichePost">
                            <div class="info">
                                <p class="username">${comment.username}</p>
                                <p class="userField">${comment.field}</p>
                                <p class="created_at">${comment.created_at}</p>
                            </div>
                            <hr style="height: 1px; border: none; background-color: black; width: 100%;">
                            <div class="comment">
                                <p>${comment.comment}</p>
                            </div>
                        </div>
                        <div class="likes">
                            <i class="fa-regular fa-thumbs-up"></i>${comment.like_count}
                            <i class="fa-regular fa-thumbs-down"></i>${comment.dislike_count}
                        </div>
                    `;

                    postsDiv.appendChild(commentDiv);
                });
            }
        })
        .catch(error => {
            const postsDiv = document.querySelector('.posts');
            postsDiv.innerHTML = `<p>Error fetching comments: ${error.message}</p>`;
            console.error('Error fetching comments:', error);
        });
});
