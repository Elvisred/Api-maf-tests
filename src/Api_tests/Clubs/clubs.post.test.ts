import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api'; 
import { v4 as uuidv4 } from 'uuid';
import { AxiosError, AxiosResponse } from 'axios';

describe('POST', () => {
    let result: AxiosResponse<any, any>
    let responseJson: { id: number; [key: string]: any };
    let idClub: number;
    
    before(async () => {
        const clubName = uuidv4().substring(0, 10);
        result = await Api.postNewClub(clubName, 'Moscow');
        responseJson = result.data;
        idClub = responseJson.id;
    });

    it('should create new club with status 201', () => {
        expect(result.status).to.equal(201);
    });

    it('should create new club with correct id', () => {
        expect(responseJson.id).to.equal(idClub);
    });

    after(async () => {
        await Api.deleteClubs(idClub)
    });
    
    describe('POST with incorrect parameters', () => {
        const params: { club_name: string; city: string; error: string }[] = [
            { club_name: '', city: 'Moscow', error: 'Club name is required' },
            { club_name: 'TT', city: '', error: 'City is required' },
            { club_name: uuidv4().substring(0, 31), city: 'Moscow', error: 'Club name must be max 30 characters' },
            { club_name: 'TZTZ', city: uuidv4().substring(0, 31), error: 'City must be max 30 characters' },
        ];
    
        params.forEach((param) => {
            describe(`When club_name is '${param.club_name}' and city is '${param.city}'`, () => {
                let error: AxiosError<any, any> | null = null;
    
                beforeEach(async () => {
                    try {
                        await Api.postNewClub(param.club_name, param.city);
                    } catch (err) {
                        error = err as AxiosError<any, any>;
                    }
                });
                
                it(`should return error '${param.error}'`, () => {
                    expect(error).to.be.not.null;
                    if (error) {
                        expect(error.response?.data).to.have.property('error', param.error);
                    }
                });
            });
        });
    });
});
