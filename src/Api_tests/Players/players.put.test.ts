import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';

describe('PUT', () => {
    describe('Updating an existing player', () => {
        let postResult: AxiosResponse<any, any>;
        let postJson: { id: number; [key: string]: any };
        let putId: number;
        let putResult: AxiosResponse<any, any>;

        before(async () => {
            const nickname = uuidv4().substring(0, 10);
            postResult = await Api.postNewPlayer(nickname, 'Red Testing Mafia', 'Alina Korolenko');
            postJson = postResult.data;
            putId = postJson.id;

            const putNickname = uuidv4().substring(0, 10);
            const putClub = uuidv4().substring(0, 10);
            const putName = uuidv4().substring(0, 10);
            putResult = await Api.putPlayers(putId, putNickname, putClub, putName);
        });

        it('should return status 200', () => {
            expect(putResult.status).to.equal(200);
        });

        it('should update player with correct message', () => {
            expect(putResult.data.message).to.equal(`Player with ID ${putId} updated successfully`);
        });

        after(async () => {
            await Api.deletePlayers(putId);
        });
    });
});
