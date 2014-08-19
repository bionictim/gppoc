enyo.kind({
    name: "gopro.VideoClipGridPanel",
    kind: "moon.Panel",
    classes: "video-clip-grid",
    smallHeader: true,
    // headerBackgroundSrc: "assets/gopro_logo.svg", //"assets/gopro-small-right.png?2",
    // headerBackgroundPosition: "center right 50px",
    headerOptions: {
        classes: "gopro-header"
    },
    published: {
        link: "",
        playlistTitle: "",
        playlist: null // Not necessary unless we access publicly
    },
    components: [{
        kind: "FittableColumns",
        fit: true,
        components: [{
            name: "gridList",
            kind: "moon.DataGridList",
            fit: true,
            spacing: 20,
            minWidth: 300,
            minHeight: 174, //210, // 285,
            selection: true,
            events: {
                onVideoClipGridSelectedChanged: ""
            },
            scrollerOptions: {
                kind: "moon.Scroller",
                vertical: "scroll",
                horizontal: "hidden",
                spotlightPagingControls: true
            },
            components: [{
                kind: "gopro.VideoClipImageItem"
            }],
            selectedChanged: function (inSender, inEvent) {
                this.doVideoClipGridSelectedChanged(inEvent);
            }
        }]
    }],
    bindings: [
        { from: ".playlistTitle", to: ".title" },
		{ from: ".playlist.records", to: ".$.dataList.collection" },
		{ from: ".playlist", to: ".$.gridList.collection" },
		{ from: ".$.selectionToggle.value", to: ".$.gridList.selection" },
		{ from: ".$.multiSelectToggle.value", to: ".$.gridList.multipleSelection" }
    ],
    create: function () {
        // this.inherited(arguments);

        // this.set("playlists", new gopro.PlaylistInfoCollection());
        // this.get("playlists").fetch();

        this.inherited(arguments);
        this.set("playlist", new gopro.Playlist());
        this.playlist.store.ignoreDuplicates = true;
    },
    linkChanged: function (inOldValue) {
        this.getData(this.link);
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

        //this.set("currentVideoIndex", -1); // Force property changed. (Prevents no property changed if switching playlists and index doesn't change.)
    },
    _demoGetLocalVideo: function (i, videoArray) {
        var fileName = gopro.settings.sampleVideoHash["" + videoArray[i].id] ||
            gopro.settings.sampleVideos[i % gopro.settings.sampleVideos.length];

        var result = "assets/sampleVideos/" + fileName;
        return result;
    }
});

enyo.kind({
    name: "gopro.VideoClipImageItem",
    kind: "moon.GridListImageItem",
    mixins: ["moon.SelectionOverlaySupport"],
    //selectionOverlayVerticalOffset: 35,
    //subCaption: "Sub Caption",
    useCaption: true,
    useSubCaption: false,
    imageSizing: "cover",
    bindings: [
        { from: ".model.title", to: ".caption" },
        { from: ".model.videoCountDisplay", to: ".subCaption" },
        { from: ".model.thumbnail_default", to: ".source" }
    ]
});
