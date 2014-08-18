enyo.kind({
    name: "gopro.VideoClipGridPanel",
    kind: "moon.Panel",
    smallHeader: true,
    headerBackgroundSrc: "assets/gopro.png",
    headerBackgroundPosition: "top right",
    headerOptions: {
        classes: "gopro-header"
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
            minHeight: 285,
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
		{ from: ".playlists.records", to: ".$.dataList.collection" },
		{ from: ".playlists", to: ".$.gridList.collection" },
		{ from: ".$.selectionToggle.value", to: ".$.gridList.selection" },
		{ from: ".$.multiSelectToggle.value", to: ".$.gridList.multipleSelection" }
    ],
    create: function () {
        this.inherited(arguments);

        this.set("playlists", new gopro.PlaylistInfoCollection());
        this.get("playlists").fetch();
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
        { from: ".model.link_text", to: ".caption" },
        { from: ".model.videoCountDisplay", to: ".subCaption" },
        { from: ".model.thumbnail_default", to: ".source" }
    ],
    selectedChanged: function (inSender, inEvent) {
        enyo.log(inEvent);
        enyo.log(this.model);
    }
});
