import { expect } from 'chai';
import 'mocha';
import { Api } from '../../Utils/Api';

describe('GET', () => {
  it('Получение списка клубов', async () => {
    const result = await Api.getClubs();
    const responseJson = result.data;

    expect(result.status).to.equal(200);
    expect(responseJson.clubs[0].id).to.equal(1);
  });
});
