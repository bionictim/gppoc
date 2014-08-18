enyo.kind({
    name: "gopro.PlaylistGridPanel",
    kind: "moon.Panel",
    title: "Playlists",
    smallHeader: true,
    autoNumber: false,
    //titleAbove: "Back to Playlists",
    // titleBelow: "This is a title",
    // subTitleBelow: "This is a subtitle",
    headerBackgroundSrc: "assets/gopro.png?3",
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
            minWidth: 450,
            minHeight: 350,
            selection: true,
            events: {
                onPlaylistGridSelectedChanged: ""
            },
            scrollerOptions: {
                kind: "moon.Scroller",
                vertical: "scroll",
                horizontal: "hidden",
                spotlightPagingControls: true
            },
            components: [{
                kind: "gopro.PlaylistImageItem"
            }],
            selectedChanged: function (inSender, inEvent) {
                this.doPlaylistGridSelectedChanged(inEvent);
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
    name: "gopro.PlaylistImageItem",
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
    ]
});
