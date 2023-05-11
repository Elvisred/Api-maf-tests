import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';

describe('POST', () => {
    describe('Creating a new player', () => {
        let postResult: AxiosResponse<any, any>;
        let postJson: { id: number; [key: string]: any };
        let idPlayer: number;

        before(async () => {
            const nickname = uuidv4().substring(0, 10);
            const club = 'Red Testing Mafia';
            const name = 'Aleksei Korolenko';
            postResult = await Api.postNewPlayer(nickname, club, name);
            postJson = postResult.data;
            idPlayer = postJson.id;
        });

        it('should return status 201', () => {
            expect(postResult.status).to.equal(201);
        });

        it('should create player with correct id', () => {
            expect(postJson.id).to.equal(idPlayer);
        });

        after(async () => {
            await Api.deletePlayers(idPlayer);
        });
    });
});
