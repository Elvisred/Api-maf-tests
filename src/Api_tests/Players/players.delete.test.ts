import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';

describe('DELETE', () => {
    describe('Deleting an existing player', () => {
        let postResult: AxiosResponse<any, any>;
        let postJson: { id: number; [key: string]: any };
        let playerId: number;
        let deleteResult: AxiosResponse<any, any>;

        before(async () => {
            const nickname = uuidv4().substring(0, 10);
            postResult = await Api.postNewPlayer(nickname, 'Red Testing Mafia', 'Aleksei Korolenko');
            postJson = postResult.data;
            playerId = postJson.id;
            deleteResult = await Api.deletePlayers(playerId);
        });

        it('should delete existing player with status 200', () => {
            expect(deleteResult.status).to.equal(200);
        });

        it('should delete existing player with correct message', () => {
            expect(deleteResult.data.message).to.equal(`Player with ID ${playerId} deleted successfully`);
        });
    });
});
