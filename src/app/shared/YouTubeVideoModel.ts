interface YouTubeVideoList {
    etag: string;
    items: YouTubeVideoModel[];
  }
  
  interface YouTubeVideoModel {
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    kind: string;
    snippet: {
      channelId: string
      channelTitle: string
      description: string
      liveBroadcastContent: string
      publishedAt: string
      thumbnails:{}
      title: string
    }
  }