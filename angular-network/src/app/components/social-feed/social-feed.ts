import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent } from 'models';

@Component({
    selector: 'social-feed',
    templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit {
    items: Post[] = [];
    channelId: string;

    constructor(
        private postService: PostService,
        private postSocket: PostSocketService,
        private route: ActivatedRoute
    ) { }

    onSubmit(message: string) {
        this.postService.post(this.channelId, message);
    }

    ngOnInit() {
        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
                this.postService
                    .getAll(this.channelId)
                    .then((items) => {
                        this.items = items
                    });
            });
        
        this.postSocket.onPost( post => {
            this.items.push(post);
        });

        this.postSocket.onComment(comment => {
            if(this.channelId ===comment.post.channel.id) {
                this.items.find(v => {
                    if(v.id === comment.post.id) v.comments.push(comment)
                })
            }
        });
    }
}
