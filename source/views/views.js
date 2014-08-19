enyo.kind({
    name: "myapp.MainView",
    pattern: "activity",
    classes: "moon enyo-fit",
    handlers: {
        onPlaylistGridSelectedChanged: "playlistGridSelectedChanged",
        onVideoClipGridSelectedChanged: "videoClipGridSelectedChanged"
    },
    components: [{
        kind: "Signals",
        onPanelsShown: "panelsShown",
        onPanelsHidden: "panelsHidden"
    }, {
        useHandle: true,
        name: "player",
        kind: "gopro.VideoPlayer"
        //,
        // components: [ // For some reason, these can't go in the gopro.VideoPlayer kind or the normal videoPlayer controls won't get initialized. (It appears to replace it's components list.)
        //    // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    // { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
        //    { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" }
        // ]
    }, {
        name: "panels",
        kind: "moon.Panels",
        pattern: "activity",
        classes: "enyo-fit",
        useHandle: true,
        components: [{
            kind: "gopro.PlaylistGridPanel"
        }, {
            name: "videoClipGrid",
            kind: "gopro.VideoClipGridPanel"
        }]
    }],
    rendered: function () {
        this.inherited(arguments);
        enyo.Spotlight.spot(this.$.panels);
    },
    create: function () {
        this.inherited(arguments);
        this.anim = this.$.panels.getAnimator();
    },
    playlistGridSelectedChanged: function (inSender, inEvent) {
        var item = inEvent.previous;
        if (item) {
            enyo.log(item);
            //this.$.panels.hide();
            this.$.videoClipGrid.setLink(item.link);
            this.$.videoClipGrid.setPlaylistTitle(item.link_text);
        } else {
            enyo.log("No item"); // Deselected?
            enyo.log(inEvent);
        }

        this.$.panels.setIndex(1);
    },
    videoClipGridSelectedChanged: function (inSender, inEvent) {
        var clipIndex = this.$.videoClipGrid.playlist.indexOf(inEvent);
        console.log("Item " + clipIndex + " selected");

        if (clipIndex > -1) {
            this.$.player.setPlaylist(this.$.videoClipGrid.playlist);
            this.$.player.setCurrentVideoIndex(-1); // To force a property changed when we set the real index.
            this.$.player.setCurrentVideoIndex(clipIndex);
            this.$.panels.hide();
        } else {
            enyo.log("Video clip index is < 0.")
        }
    },
    panelsShown: function () {
        enyo.log("onPanelsShown");
        this.$.player.pause();
    },
    panelsHidden: function () {
        enyo.log("onPanelsHidden");
        this.$.player.play();
    }
});

