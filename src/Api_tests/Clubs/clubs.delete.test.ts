import { expect } from 'chai';
import 'mocha';
import { Api } from '../../Utils/Api'; 
import { v4 as uuidv4 } from 'uuid';

describe('DELETE', () => {
  it('should delete existing club', async () => {
    const clubName = uuidv4().substring(0, 10);

    const postResult = await Api.postNewClub(clubName, 'Moscow');
    const postJson = postResult.data;
    const deleteId = postJson.id;

    const deleteResult = await Api.deleteClubs(deleteId);

    expect(deleteResult.status).to.equal(200);
    expect(deleteResult.data.message).to.equal(`Club with ID ${deleteId} deleted successfully`);
  });
});
