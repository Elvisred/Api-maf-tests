import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';

describe('PUT', () => {
    describe('Updating an existing club', () => {
        let postResult: AxiosResponse<any, any>;
        let postJson: { id: number; [key: string]: any };
        let putId: number;
        let putResult: AxiosResponse<any, any>;
        let putCity: string;
        let putClubName: string;

        before(async () => {
            const clubName = uuidv4().substring(0, 10);
            postResult = await Api.postNewClub(clubName, 'Moscow');
            postJson = postResult.data;
            putId = postJson.id;
            putCity = uuidv4().substring(0, 10);
            putClubName = uuidv4().substring(0, 10);
            putResult = await Api.putClubs(putId, putCity, putClubName);
        });

        it('should update existing club with status 200', () => {
            expect(putResult.status).to.equal(200);
        });

        it('should update existing club with correct message', () => {
            expect(putResult.data.message).to.equal(`Club with ID ${putId} updated successfully`);
        });

        after(async () => {
            await Api.deleteClubs(putId)
        });
    });
});
