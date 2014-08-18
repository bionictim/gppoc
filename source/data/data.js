/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/


// PlaylistInfo ================
enyo.kind({
    name: "gopro.PlaylistInfoCollection",
    kind: "enyo.Collection",
    model: "gopro.PlaylistInfoModel",
    url: "https://api.gopro.com/v1/channels/xbox-one/playlists.json",
    parse: function (data) {
        return data.playlists;
    }
});

enyo.kind({
    name: "gopro.PlaylistInfoModel",
    kind: "enyo.Model",
    url: "https://api.gopro.com/v1/channels/xbox-one/playlists.json", // TODO: Get proper URL for playlist
    parse: function (data) {
        // Flatten object so we get property changed events.
        for (var key in data.thumbnail.snapview_image) {
            data["thumbnail_snapviewImage_" + key] = data.thumbnail.snapview_image[key];
        }
        for (var key in data.thumbnail) {
            data["thumbnail_" + key] = data.thumbnail[key];
            delete data.thumbnail[key];
        }
        delete data.thumbnail;

        data.videoCountDisplay = data.video_count + " videos";

        return data;
    }
});

// Playlist ======================
/* Ex:
    var playlist = new gopro.Playlist({ link: https://api.gopro.com/v1/channels/xbox-one/playlists/top-picks.json });
    playlist.fetch();
*/
enyo.kind({
    name: "gopro.Playlist",
    kind: "enyo.Collection",
    model: "gopro.VideoClip",
    events: {
        onDidFetchRecords: ""
    },
    getUrl: function () {
        return this.link;
    },
    // parse: function (data) {
    //     return data;
    // }
    didFetch: function (rec, opts, res) {
        //enyo.log(res);
        this.doDidFetchRecords(rec);
    }
});

enyo.kind({ 
    name: "gopro.VideoClip",
    kind: "enyo.Model",
    parse: function (data) {        // Flatten object so we get property changed events.
        for (var key in data.thumbnail.snapview_image) {
            data["thumbnail_snapviewImage_" + key] = data.thumbnail.snapview_image[key];
        }
        for (var key in data.thumbnail) {
            data["thumbnail_" + key] = data.thumbnail[key];
            delete data.thumbnail[key];
        }
        delete data.thumbnail;

        data.video_link = data.video.link;
        delete data.video;

        return data;
    }
});
