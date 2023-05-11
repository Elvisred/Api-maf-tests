import { expect } from 'chai';
import 'mocha';
import { Api } from '../../utils/api';
import { AxiosResponse } from 'axios';

describe('GET', () => {
  let result: AxiosResponse<any, any>;
  let responseJson: { clubs: Array<{ id: number, [key: string]: any }>, [key: string]: any };

  before(async () => {
    result = await Api.getClubs();
    responseJson = result.data;
  });

  it('should return status 200', () => {
    expect(result.status).to.equal(200);
  });

  it('should return club with id 1', () => {
    expect(responseJson.clubs[0].id).to.equal(1);
  });
});
