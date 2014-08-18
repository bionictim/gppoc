enyo.kind({
    name: "myapp.MainView",
    pattern: "activity",
    classes: "moon enyo-fit",
    handlers: {
        onPlaylistGridSelectedChanged: "playlistGridSelectedChanged",
        onVideoClipGridSelectedChanged: "videoClipGridSelectedChanged"
    },
    components: [{
        useHandle: true,
        name: "player",
        kind: "gopro.VideoPlayer",
        handlers: {
            didFetchRecords: "didFetchPlaylist"
        },
        components: [ // For some reason, these can't go in the gopro.VideoPlayer kind or the normal videoPlayer controls won't get initialized. (It appears to replace it's components list.)
           // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" }
        ]
    }, {
        name: "panels",
        kind: "moon.Panels",
        pattern: "activity",
        classes: "enyo-fit",
        useHandle: true,
        components: [{
            kind: "gopro.PlaylistGridPanel"
        // }, {
        //     kind: "gopro.VideoClipGridPanel"
        }]
    }],
    rendered: function () {
        this.inherited(arguments);
        enyo.Spotlight.spot(this.$.panels);
    },
    create: function () {
        this.inherited(arguments);
    },
    playlistGridSelectedChanged: function (inSender, inEvent) {
        //this.$.panels.setIndex(1);
        var item = inEvent.previous;
        if (item) {
            enyo.log(item);
            this.$.panels.hide();
            this.$.player.setLink(item.link);
        } else {
            enyo.log("No item"); // Deselected?
            enyo.log(inEvent);
        }
    },
    videoClipGridSelectedChanged: function (inSender, inEvent) {
        this.$.panels.setIndex(0);
    },
    handleShowingChanged: function (inSender, inEvent) {
        this.$.panels.setHandleShowing(inSender.getChecked());
    }
});

