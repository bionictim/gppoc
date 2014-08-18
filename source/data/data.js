/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/


enyo.kind({
    name: "gopro.settings",
    statics: {
        debug: true,
        maxPlaylistLength: 2,
        useSampleVideos: true,
        sampleVideos: [
            "GoPro- Petting A Tiger Shark.mp4",
            "GoPro- Crystal Ball Street Performer.mp4",
            "GoPro- Rooftop Ping Pong.mp4",
            "GoPro- Kama The Surfing Pig.mp4"
        ],
        sampleVideoHash: {
            // Top Picks
            "84239556076897927": "GoPro- Petting A Tiger Shark.mp4",
            "80438526822319567": "GoPro- Crystal Ball Street Performer.mp4",
            "79090738754749899": "GoPro- Rooftop Ping Pong.mp4",
            "68365560802444585": "GoPro- Kama The Surfing Pig.mp4",
            "68366969325225259": "GoPro- Epic Roof Jump.mp4",
            "68366591577818410": "GoPro- Duncan The Two-Legged Pup.mp4",
            "71057877954987726": "GoPro- Canary Islands Bodyboarding with Sacha Specker.mp4",
            "68369222304007468": "GoPro- Bamboo Kung-Fu.mp4",
            "66103462269551811": "GoPro- Ram vs Dirtbiker.mp4",
            "64740407010919604": "GoPro- Danny MacAskill's Imaginate.mp4",
            "60907852931269711": "GoPro- Backyard Trick Shot - Golf.mp4",
            "55073497977717801": "GoPro- Diver Saves Sea Turtle.mp4",
            "58085219097379895": "GoPro- Brasil Extended - Barefoot Pickup.mp4",
            "55294890405266478": "GoPro- Fireworks From A Drone.mp4",
            // -- private vid here
            "52905028658136078": "GoPro- GoPro- Brasil Extended - Juggling in Traffic.mp4",

            // Short Films
            "55073484715328550": "GoPro- Koh Yao Noi - a film by Philip Bloom in 2.7K.mp4",
            // -- private vid here
            "48744082243061730": "GoPro- Brasil Futebol - For the Love 'Expressão'.mp4",
            "44244846772225614": "GoPro- Brasil Futebol - For the Love 'Raízes'.mp4",
            "34907195359364798": "GoPro- Still Lost in Peru.mp4",
            "34907643520747297": "GoPro- Endless Barrels - GoPro of the Winter 2013-14 powered by Surfline.mp4",
            
            // Gnarly
            "81332733543974530": "GoPro- Ghost Town Card Draw.mp4",
            "70483789154879179": "GoPro- MTB Volcano Descent With Aaron Chase.mp4",


            // "": ".mp4",
            // "": ".mp4",
            // "": ".mp4",

            "fake": "no-url"
        }
    }
});

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
