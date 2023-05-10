import { HttpManager } from './http_manager';
import { AxiosResponse } from 'axios';
import { JsonBodies } from './json_bodies';

export class Api {
    private static readonly API_BASE_URL = 'http://localhost:8000/api/';
    private static readonly API_CLUBS = `${Api.API_BASE_URL}clubs`;
    private static readonly API_PLAYERS = `${Api.API_BASE_URL}players`;
    private static readonly API_CLUB_PLAYERS = `${Api.API_BASE_URL}players/players_by_club/`;

    public static async postNewPlayer(nickname: string, club: string, name: string): Promise<AxiosResponse> {
        const data = JsonBodies.forPostPlayer(nickname, club, name);
        return await HttpManager.post(Api.API_PLAYERS, data);
    }

    public static async postNewClub(clubName: string, city: string): Promise<AxiosResponse> {
        const data = JsonBodies.forPostClubs(city, clubName);
        return await HttpManager.post(`${Api.API_CLUBS}/`, data);
      }

    public static async getClubs(): Promise<AxiosResponse> {
        return await HttpManager.get(Api.API_CLUBS);
    }

    public static async getPlayers(): Promise<AxiosResponse> {
        return await HttpManager.get(`${Api.API_PLAYERS}/`);
    }

    public static async putClubs(putId: number, clubName: string, city: string): Promise<AxiosResponse> {
        const data = JsonBodies.forPutClubs;
        return await HttpManager.put(`${Api.API_CLUBS}/${putId}/`, { ...data, id: putId });
    }
    
    public static async putPlayers(putIdPlayer: number, nickname: string, club: string, name: string): Promise<AxiosResponse> {
        const data = JsonBodies.forPutPlayers;
        return await HttpManager.put(`${Api.API_PLAYERS}/${putIdPlayer}/`, { ...data, id: putIdPlayer });
      }
      
    public static async deletePlayers(idPlayer: number): Promise<AxiosResponse> {
        return await HttpManager.delete(`${Api.API_PLAYERS}/${idPlayer}`);
    }

    public static async deleteClubs(idClub: number): Promise<AxiosResponse> {
        return await HttpManager.delete(`${Api.API_CLUBS}/${idClub}`);
    }

    public static async getClubPlayers(clubName: string): Promise<AxiosResponse> {
        return await HttpManager.get(`${Api.API_CLUB_PLAYERS}${clubName}`);
    }
}
