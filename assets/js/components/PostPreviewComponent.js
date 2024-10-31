// class PostPreviewComponent extends HTMLElement {
//     constructor() {
//         super()
//         console.log("PostPreviewComponent connected!!");
//         this.attachShadow({mode: 'open'})
//     }
//
//     connectedCallback() {
//         // checkReferrer();
//         this.shadowRoot.innerHTML = this.template();
//         this.updateContent();
//     }
//
//     template() {
//         return `
//         <link rel="stylesheet" type="text/css" href="/assets/css/PostPreviewComponent.css">
//         <section id="post-preview">
//             <article id="post-info-article">
//                 <p id="post-title">제목</p>
//                 <div class="post-info">
//                     <div class="post-metadata">
//                         <span class="text-metadata">좋아요&nbsp</span> <span id="count-like" class="count">0</span>
//                         <span class="text-metadata">댓글&nbsp</span> <span id="count-comment" class="count">0</span>
//                         <span class="text-metadata">조회수&nbsp</span> <span id="count-view" class="count">0</span>
//                         <span class="date-post">2021-01-01 00:00:00</span>
//                     </div>
//                 </div>
//             </article>
//             <div class="line"></div>
//             <div class="author-info">
//                 <img class="profile-img"sizes="" src="/assets/images/profile.webp" alt="profile">
//                 <p class="author-name">작성자</p>
//             </div>
//         </section>
//         `
//     }
//
//     updateContent() {
//         const title = this.getAttribute('title');
//         const like = this.getAttribute('like');
//         const comment = this.getAttribute('comment');
//         const view = this.getAttribute('view');
//         const date = this.getAttribute('date');
//         const author = this.getAttribute('author');
//
//         this.shadowRoot.getElementById('post-title').textContent = title;
//         this.shadowRoot.getElementById('count-like').textContent = like;
//         this.shadowRoot.getElementById('count-comment').textContent = comment;
//         this.shadowRoot.getElementById('count-view').textContent = view;
//         this.shadowRoot.querySelector('.date-post').textContent = date;
//         this.shadowRoot.querySelector('.author-name').textContent = author;
//     }
// }
// window.customElements.define('post-preview-component', PostPreviewComponent);