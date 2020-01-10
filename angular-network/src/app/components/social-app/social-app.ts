import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService, PostSocketService } from 'services';
import { Router } from '@angular/router';

/**
 * Display the channel list, the social feed and the notification bar for logged users.
 * Affiche la liste des channels sur la gauche, les posts au centre, et une barre de notifications sur la gauche
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];

    constructor(
        private channelService: ChannelService,
        private postSocketService : PostSocketService,
        private router: Router
    ) {
    }

    async ngOnInit() {
        this.channelService.getAll().then( data => {
            this.channels = data;
            this.firstChannel(data[0].id); 
        });

        this.postSocketService.onNewChannel(channel => {
            this.channels.push(channel);
            this.firstChannel(channel.id); 
        });
    }

    firstChannel(id : String) {
        const url = this.router.url

        if(url.split("/").length < 3)this.router.navigate([url, id])
    }
}
