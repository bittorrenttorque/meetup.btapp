(function() {
	function assert(b, err) { if(!b) throw err; }

	function get_magnet_link(hash) {
		return 'magnet:?xt=urn:btih:' + hash + '&tr=udp://tracker.openbittorrent.com:80/announce';
	}

	BtappMeetup = Backbone.Model.extend({
		initialize: function() {
			this.btapp = new Btapp;
			this.btapp.live('torrent * peer *', function(peer) {
				this.trigger('meetup:peer', peer);
			}, this);
			this.btapp.live('add', function(add) {
				var info_hash = this.get('id');
				this.trigger('meetup:meetup', info_hash);
				add.torrent(get_magnet_link(info_hash));
			}, this);
			this.btapp.connect();
		}
	});	
}).call(this);