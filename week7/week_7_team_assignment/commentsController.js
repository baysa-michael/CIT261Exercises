import CommentsModel from './commentsModel.js';
import CommentsView from './commentsView.js';

const COMMENT_TYPE = {
    HIKE:  "hike"
};

class CommentsController {
    constructor() {
        this.commentList = [];
    }

    addComment() {
        // Grab information from form
        let target = document.getElementById("hikeName");
        let commentDate = document.getElementById("commentDate");
        let comment = document.getElementById("comment");

        // Build Comment
        let newComment = new CommentsModel(COMMENT_TYPE.HIKE, target, commentDate, comment);

        // Add the new comment to the list
        this.commentList.push(newComment);

        // Save the comments to session storage (intentionally)
        this.saveComments();
    }

    saveComments() {
        // Extract all hike comments in the comments list
        let hikeComments = this.commentList.filter(element => {
            element.commentType === COMMENT_TYPE.HIKE;
        });

        // Convert the comments list to JSON
        let hikeCommentsJSON = CommentsModel.commentsToJSON(hikeComments);

        // Save the comments to Session Storage
        window.sessionStorage.setItem(COMMENT_TYPE.HIKE, hikeCommentsJSON);

        // Reset the form once the comment has been saved
        document.getElementById("addAppointmentForm").reset();
    }

    static retrieveComments() {
        return CommentsModel.jsonToComments(window.sessionStorage.getItem(COMMENT_TYPE.HIKE));
    }

    addCommentForm(parentElement, hikeName) {
        parentElement.appendChild(CommentsView.buildCommentInsert(hikeName, (event) => {
            // Prevent the default form action
            event.preventDefault();

            // Add the comment
            this.addComment();

            // Clear the form

        }));
    }

    static clearCommentForm(parentElement) {
        parentElement.clear();
    }

    displayComment() {

    }
}

export default CommentsController;