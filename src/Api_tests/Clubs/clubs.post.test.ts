import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';

describe('POST', () => {
    it('Создание нового клуба', async () => {
        const clubName = uuidv4().substring(0, 10);

        const result = await Api.postNewClub(clubName, 'Moscow');
        const responseJson = result.data;
        const idClub = responseJson.id;

        expect(result.status).to.equal(201);
        expect(responseJson.id).to.equal(idClub);

        await Api.deleteClubs(idClub)
    });
    
    it('Создание нового клуба с некорректными параметрами', async () => {
        const params: { club_name: string; city: string; error: string }[] = [
            { club_name: '', city: 'Moscow', error: 'Club name is required' },
            { club_name: 'TT', city: '', error: 'City is required' },
            { club_name: uuidv4().substring(0, 31), city: 'Moscow', error: 'Club name must be max 30 characters' },
            { club_name: 'TZTZ', city: uuidv4().substring(0, 31), error: 'City must be max 30 characters' },
          ];

        for (const param of params) {
            try {
                const result = await Api.postNewClub(param.club_name, param.city);
            } catch (error: any) {
                expect((error as any).response.data).to.have.property('error', param.error);
            }
        }
    });
});
