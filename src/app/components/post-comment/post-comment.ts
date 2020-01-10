import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { MessageParser } from 'services';

/**
 * Affiche le commentaire d'un post
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
    constructor(
        private parser: MessageParser

    ) {}

    ngOnInit() {
        this.comment.content = this.parser.parse(this.comment)
    }
}
