export const SELECTED_LEAGUE = 'SELECTED_LEAGUE';

export const selectedLeagueAC = (league) => {
    return {
        type:SELECTED_LEAGUE,
        payload: league
    }
}