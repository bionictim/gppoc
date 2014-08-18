enyo.kind({
    name: "gopro.VideoPlayer",
    kind: "moon.VideoPlayer",
    //src: "http://media.w3.org/2010/05/bunny/movie.mp4",
    //src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    //src: "http://www.auby.no/files/video_tests/h264_720p_hp_5.1_3mbps_vorbis_styled_and_unstyled_subs_suzumiya.mkv",
    // autoShowControls: true,
    // showPlayPauseControl: true,
    // showPlaybackControls: true,
    autoShowOverlay: true,
    //showInfo: true,
    autoplay: false,
    showJumpControls: true,
    showFFRewindControls: true,
    published: {
        link: "",
        playlist: null // Not necessary unless we access publicly
    },
    events: {
        onPlaylistComplete: ""
    },
    handlers: {
        onended: "onVideoEnded",
        onPlay: "onVideoStart"
    },
    infoComponents: [{
        kind: "moon.VideoInfoBackground",
        orient: "left",
        background: true,
        fit: true,
        components: [{
            kind: "moon.ChannelInfo",
            // channelNo: "13",
            // channelName: "AMC",
            //classes: "moon-2h",
            classes: "moon-2h gopro-channel-info",
            components: [{
                kind: "Image",
                src: "assets/gopro.png"
            //     content: "3D"
            // }, {
            //     content: "Live"
            }, {
                name: "infoIcon",
                // content: "REC 08:22",
                classes: "moon-video-player-info-redicon "
            }]
        }, {
            name: "headerInfo", // Don't call it videoInfoHeader... (??!?!)
            kind: "moon.VideoInfoHeader",
            //title: "Downton Abbey - Extra Title",
            // subTitle: "Mon June 21, 7:00 - 8:00pm",
            // subSubTitle: "R - TV 14, V, L, SC",
            // description: "The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and"
        }]
    }
    // , {
    //     kind: "moon.VideoInfoBackground",
    //     orient: "right",
    //     background: true,
    //     components: [{ kind: "moon.Clock" }]
    // }
    ],
    bindings: [
        // { from: ".playlist.isFetching", to: ".playlistIsFetching" },
        // { from: ".playlist", to: ".$.videoClipList.collection" },
        { from: ".currentVideoClip.video_link", to: ".src" },
        { from: ".currentVideoClip.title", to: ".$.headerInfo.subTitle" },
        { from: ".currentVideoClip.description", to: ".$.headerInfo.description" },
        { from: ".infoIconText", to: ".$.infoIcon.content" }
    ],
    constructor: function() {
        // low-level or esoteric initialization, usually not needed at all
        this.inherited(arguments);
    },
    create: function() {
        this.inherited(arguments);
        this.set("playlist", new gopro.Playlist());
        this.playlist.store.ignoreDuplicates = true;
    },
    linkChanged: function (inOldValue) {
        // this.set("playlist", new gopro.Playlist({
        //     link: this.link
        // }));
        // this.get("playlist").fetch({
        //     destroyLocal: true
        // });

        this.getData(this.link);
    },
    onVideoStart: function () {
        // // Kludgy. Probably need to poll this.$.video.getReadyState()
        // var self = this;
        // setTimeout(function () {
        //     self.set("infoIconText", self.getDurationDisplay());
        // }, 1000);
    },
    onVideoEnded: function () {
        enyo.log("video ended");
        this.set("currentVideoIndex", this.currentVideoIndex + 1);
    },
    getData: function(url) {
        var request = new enyo.Ajax({
            url: url, //URL goes here
            method: "GET", //You can also use POST
            handleAs: "json", //options are "json", "text", or "xml"
        }); 

        request.response(enyo.bind(this, "processResponse")); //tells Ajax what the callback function is
        request.go({}); //makes the Ajax call.
    }, 
    processResponse: function(inRequest, inResponse) {
        if (!inResponse) return; //if there is nothing in the response then return early.

        if (gopro.settings.useSampleVideos) {
            for (var i = 0, len = inResponse.length; i < len; i++) {
                inResponse[i].video.link = this._demoGetLocalVideo(i, inResponse);
                //inResponse[i].video.link = gopro.settings.sampleVideos[i % gopro.settings.sampleVideos.length];
            }
        }

        this.playlist.removeAll();
        this.playlist.merge(inResponse);

        if (gopro.settings.debug)
            enyo.log(this.playlist.records);

        this.set("currentVideoIndex", -1); // Force property changed. (Prevents no property changed if switching playlists and index doesn't change.)
    },
    currentVideoIndexChanged: function (inOldValue) {
        if (this.currentVideoIndex < 0)
            this.currentVideoIndex = 0; // Does't call property changed since we're not calling the setter.

        if (this.currentVideoIndex < this.playlist.length) {
            this.set("currentVideoClip", this.playlist.at(this.currentVideoIndex));
            this.set("infoIconText", this.currentVideoClip.attributes.vertical);
            this.play();
        } else {
            this.doPlaylistComplete();
        }
    },
    getDurationDisplay: function () {
        var duration = this.$.video.getDuration();
        var minutes = Math.floor(duration/60);
        var seconds = Math.round((duration/60 - minutes) * 60);
        var result = minutes + ":" + seconds;

        return result;
    },
    playlistIsFetchingChanged: function (inOldValue) {
        enyo.log("playlistIsFetching changed from" + inOldValue + " to " + this.playlistIsFetching);
    },
    _demoGetLocalVideo: function (i, videoArray) {
        var fileName = gopro.settings.sampleVideoHash["" + videoArray[i].id] ||
            gopro.settings.sampleVideos[i % gopro.settings.sampleVideos.length];

        var result = "assets/sampleVideos/" + fileName;
        return result;
    }
});