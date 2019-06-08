const commentType = {
    HIKES:  "hikes"
}

class CommentsModel {
    constructor(commentType, targetName, commentDate, comment) {
        this.commentType = commentType;
        this.targetName = targetName;
        this.commentDate = commentDate;
        this.comment = comment;
    }

    saveCommentsToLocalStorage(commentKey, commentsArray) {

    }

    // ADD FUNCTION TO FILTER COMMENTS BY NAME
}

export default CommentsModel;