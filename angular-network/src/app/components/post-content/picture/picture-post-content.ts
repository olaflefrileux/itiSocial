import { Component, Input, Pipe, Output } from '@angular/core';
import { PostContent, PicturePostContent } from 'models';
@Component({
    templateUrl: 'picture-post-content.html',
    selector: 'picture-post-content'
})
export class PictureFeedContentComponent {
    @Input() @Output() postContent: PicturePostContent;
    
    ngOnInit() {
        
    }
}
