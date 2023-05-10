import { expect } from 'chai';
import 'mocha';
import { Api } from '../../Utils/Api';
import { v4 as uuidv4 } from 'uuid';

describe('PUT', () => {
  it('should update existing player', async () => {
    const nickname = uuidv4().substring(0, 10);

    const postResult = await Api.postNewPlayer(nickname, 'Red Testing Mafia', 'Alina Korolenko');
    const postJson = postResult.data;
    const putId = postJson.id;

    const putNickname = uuidv4().substring(0, 10);
    const putClub = uuidv4().substring(0, 10);
    const putName = uuidv4().substring(0, 10);

    const putResult = await Api.putPlayers(putId, putNickname, putClub, putName);

    expect(putResult.status).to.equal(200);
    expect(putResult.data.message).to.equal(`Player with ID ${putId} updated successfully`);
  });
});
