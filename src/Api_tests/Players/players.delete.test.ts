import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/Api'; 
import { v4 as uuidv4 } from 'uuid';

describe('DELETE', () => {
    it('should delete existing player', async () => {
      const nickname = uuidv4().substring(0, 10);
  
      const postResult = await Api.postNewPlayer(nickname, 'Red Testing Mafia', 'Aleksei Korolenko');
      const postJson = postResult.data;
      const playerId = postJson.id;
  
      const deleteResult = await Api.deletePlayers(playerId);
  
      expect(deleteResult.status).to.equal(200);
      expect(deleteResult.data.message).to.equal(`Player with ID ${playerId} deleted successfully`);
    });
  });
