import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';
import { DbConnector } from '../../utils/db_connector';
import axios, { AxiosResponse, AxiosError } from 'axios';

describe('DELETE', () => {
  describe('Deleting an existing club', () => {
    let postResult: AxiosResponse<any, any>;
    let postJson: { id: number; [key: string]: any };
    let deleteId: number;
    let deleteResult: AxiosResponse<any, any>;

    before(async () => {
      const clubName = uuidv4().substring(0, 10);
      postResult = await Api.postNewClub(clubName, 'Moscow');
      postJson = postResult.data;
      deleteId = postJson.id;
      deleteResult = await Api.deleteClubs(deleteId);
    });

    it('should return status 200', () => {
      expect(deleteResult.status).to.equal(200);
    });

    it('should return success message', () => {
      expect(deleteResult.data.message).to.equal(`Club with ID ${deleteId} deleted successfully`);
    });
  });

  describe('Deleting a non-existent club', () => {
    let maxId: number | null
    let newIdClub: number;
    let error: AxiosError<any, any> | null = null;

    before(async () => {
      const db = new DbConnector();
      maxId = await db.getMaxClubId();
      newIdClub = maxId !== null ? maxId + 1 : 1;

      try {
        await Api.deleteClubs(newIdClub);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          error = err;
        } else {
          throw err;  // rethrow the error if it's not an AxiosError
        }
      }
    });

    it('should return error with status 400', () => {
      expect(error?.response?.status).to.equal(400);
    });

    it('should return error message for non-existent club', () => {
      expect(error?.response?.data.error).to.equal('No Club matches the given query.');
    });
  });
});
