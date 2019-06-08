import CommentsModel from './commentsModel.js';
import CommentsView from './commentsView.js';

class CommentsController {
    constructor() {
        this.commentsView = new CommentsView();
        this.commentList = [];
    }

    addComment() {

    }

    saveComments() {

    }

    retrieveComments() {

    }

    addCommentForm(parentElement, hikeName) {
        parentElement.innerHTML = CommentsView.buildCommentInsert(addComment, hikeName);
    }

    displayComment() {

    }
}

export default CommentsController;