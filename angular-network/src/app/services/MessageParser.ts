import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent,
    UrlPostContent,
    MessagePostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any>[] {
        const pictureRegex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
        const videoRegex = /(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]\.mp(?:3|4)$/gmi; 
        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gmi;

        let messageList = post.message.split(" ")
        let content = []
        
        for(let i = 0; i < messageList.length; i++) {
            let cur = messageList[i]
            
            const pictureMatche = pictureRegex.exec(cur);
            const videoMatche =  videoRegex.exec(cur)
            const youtubeMatch = youtubeRegex.exec(cur);
            const urlMatch = urlRegex.exec(cur)
            
            if (pictureMatche) {
                content.push(new PicturePostContent(pictureMatche[0]))
            } else if(videoMatche) {
                content.push(new VideoPostContent(videoMatche[0]))
            } else if (youtubeMatch) {
                content.push(new YoutubePostContent(youtubeMatch[2]))
            } else if (urlMatch) {
                content.push(new UrlPostContent(cur))
            } else {
                content.push(new MessagePostContent(cur))
            }
        }
        return content;
    }
}
