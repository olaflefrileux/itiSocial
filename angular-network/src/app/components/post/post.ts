import { Component, Input } from '@angular/core';
import { Post } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Affiche les poste
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.content = this.parser.parse(this.post);
    }

    likePost() {
        if(!this.post.liked)
            this.postService.like(this.post).then(() => {
                this.post.liked = true
            })
    }

    onComment(message: string) {
        if(!message) return
        this.postService.comment(this.post, message)
    }
}
