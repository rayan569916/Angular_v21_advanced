export interface player {
    firstName: string,
    lastName: string,
    playerId: number,
    teamId: number
}

export interface team {
    abbreviation: string,
    teamName: string,
    simpleName: string,
    teamId: number,
    location: string
}

export interface player_detail {
    id: number,
    player_name: string,
    team_abbreviation: string,
    age: number,
    player_height: number,
    player_weight: number,
    college: string,
    country: string,
    draft_year: string,
    draft_round: string,
    draft_number: string,
    gp: number,
    pts: number,
    reb: number,
    ast: number,
    net_rating: number,
    oreb_pct: number,
    dreb_pct: number,
    usg_pct: number,
    ts_pct: number,
    ast_pct: number,
    season: string
}

export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    email: string
}

export interface errorInterface {
    error: string,
    message: string
}