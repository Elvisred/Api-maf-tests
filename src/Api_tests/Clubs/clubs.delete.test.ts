import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';
import { DbConnector } from '../../utils/db_connector';
import axios from 'axios';


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
  
  it('should return an error when deleting a non-existent club', async () => {
    const db = new DbConnector();
    const maxId = await db.getMaxClubId();
    const newIdClub = maxId !== null ? maxId + 1 : 1;
    try {
      await Api.deleteClubs(newIdClub);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseJson = error.response?.data;
        expect(error.response?.status).to.equal(400);
        expect(responseJson.error).to.equal('No Club matches the given query.');
      } else {
        throw error;  // rethrow the error if it's not an AxiosError
      }
    }
  });
});
