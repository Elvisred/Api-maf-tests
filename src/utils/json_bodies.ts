class JsonBodies {
    static forPostPlayer(nickname: string, club: string, name: string): object {
        let json = { "nickname": nickname, "club": club, "name": name };
        return json;
    }

    static forPostClubs(city: string, clubName: string): object {
        let json = { "city": city, "club_name": clubName };
        return json;
      }

    static forPutClubs(putId: number, clubName: string, city: string): object {
        let json = { "id": putId, "club_name": clubName, "city": city };
        return json;
    }

    static forPutPlayers(putIdPlayer: number, nickname: string, club: string, name: string): object {
        let json = { "id": putIdPlayer, "nickname": nickname, "club": club, "name": name };
        return json;
      }
}

export { JsonBodies };
