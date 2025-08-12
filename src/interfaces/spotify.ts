export interface Playlist {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
    followers:     Followers;
    primary_color: null;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export interface Owner {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    type:          Type;
    uri:           string;
    display_name?: string;
    name?:         string;
}

export enum Type {
    Artist = "artist",
    User = "user",
}

export interface Tracks {
    href:     string;
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
    items:    Item[];
}

export interface Item {
    added_at:        Date;
    added_by:        Owner;
    is_local:        boolean;
    track:           Track;
    primary_color:   null;
    video_thumbnail: VideoThumbnail;
}

export interface Track {
    album:             Album;
    artists:           Owner[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    preview_url:       null;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
    episode:           boolean;
    track:             boolean;
}

export interface Album {
    album_type:             string;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
    artists:                Owner[];
}

export interface ExternalIDS {
    isrc: string;
}

export interface VideoThumbnail {
    url: null;
}


export interface SongDetails {
    songTitle: String;
    artists: String[];
    albumName: String;
    durationMs: number;
    releaseDate: Date;
}