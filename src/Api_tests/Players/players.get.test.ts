import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { AxiosResponse } from 'axios';

describe('GET', () => {
    describe('Getting list of players', () => {
        let result: AxiosResponse<any, any>;

        before(async () => {
            result = await Api.getPlayers();
        });

        it('should return status 200', () => {
            expect(result.status).to.equal(200);
        });

        it('should return first player with id=1', () => {
            expect(result.data.players[0].id).to.equal(1);
        });
    });
});
