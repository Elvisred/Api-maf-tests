import { expect } from 'chai';
import 'mocha';
import { Api } from '../../Utils/Api';

describe('GET', () => {
    it('should return list of players with id=1', async () => {
        const result = await Api.getPlayers();

        expect(result.status).to.equal(200);
        expect(result.data.players[0].id).to.equal(1);
    });
});
