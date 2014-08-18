enyo.kind({
    name: "myapp.MainView",
    pattern: "activity",
    classes: "moon enyo-fit",
    handlers: {
        onGridListSelectedChanged: "gridListSelectedChanged"
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
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" },
           { kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png" }
           ,
            {
                name: "videoClipsRepeater",
                kind: "enyo.DataRepeater",
                components: [{
                    kind: "Image",
                    bindings: [
                        { from: ".model.thumbnail_default", to: ".src"}
                    ]
                }]
            }
        ]
    }, {
        name: "panels",
        kind: "moon.Panels",
        pattern: "alwaysviewing",
        classes: "enyo-fit",
        useHandle: true,
        components: [{
            kind: "gopro.PlaylistGridPanel"
        }]
    }],
    rendered: function () {
        this.inherited(arguments);
        enyo.Spotlight.spot(this.$.panels);
        enyo.Spotlight.spot(this.$.panels2);
    },
    create: function () {
        this.inherited(arguments);
    },
    gridListSelectedChanged: function (inSender, inEvent) {
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
    handleShowingChanged: function (inSender, inEvent) {
        this.$.panels.setHandleShowing(inSender.getChecked());
    }
});

