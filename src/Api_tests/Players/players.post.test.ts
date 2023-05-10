import { expect } from 'chai';
import 'mocha';
import { Api } from '../../Utils/Api';
import { v4 as uuidv4 } from 'uuid';

describe('POST', () => {
    it('should create new player', async () => {
        const nickname = uuidv4().substring(0, 10);
        const club = 'Red Testing Mafia';
        const name = 'Aleksei Korolenko';

        const postResult = await Api.postNewPlayer(nickname, club, name);
        const postJson = postResult.data;
        const idPlayer = postJson.id;

        expect(postResult.status).to.equal(201);
        expect(postJson.id).to.equal(idPlayer);
    });
});
