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
    jumpStartEnd: true,
    showFFRewindControls: true,
    iconPath: "$lib/../assets/video-player/",
    published: {
        link: "",
        playlist: null, // Not necessary unless we access publicly
        currentVideoIndex: -1
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
                src: "assets/gopro.png",
                classes: "gopro-player-channelinfo-image"
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
    // _pauseImg:              "../../../../assets/face.png",  //icon_indicator_pause.png",
    bindings: [
        // { from: ".playlist.isFetching", to: ".playlistIsFetching" },
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
        // this.set("playlist", new gopro.Playlist());
        //this.playlist.store.ignoreDuplicates = true;
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
    currentVideoIndexChanged: function (inOldValue) {
        if (this.currentVideoIndex > -1 ) {
            if (this.currentVideoIndex < this.playlist.length) {
                var clip = this.playlist.at(this.currentVideoIndex);
                enyo.log(clip.attributes.video_link);
                this.set("currentVideoClip", clip);
                this.set("infoIconText", this.currentVideoClip.attributes.vertical);
                this.play();
            } else {
                this.doPlaylistComplete();
            }
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
    }
});