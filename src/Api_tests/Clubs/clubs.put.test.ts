import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/Api'; 
import { v4 as uuidv4 } from 'uuid';

describe('PUT', () => {
    it('should update existing club', async () => {
      const clubName = uuidv4().substring(0, 10);
  
      const postResult = await Api.postNewClub(clubName, 'Moscow');
      const postJson = postResult.data;
      const putId = postJson.id;
  
      const putCity = uuidv4().substring(0, 10);
      const putClubName = uuidv4().substring(0, 10);
  
      const putResult = await Api.putClubs(putId, putCity, putClubName);
  
      expect(putResult.status).to.equal(200);
      expect(putResult.data.message).to.equal(`Club with ID ${putId} updated successfully`);
    });
  });
  