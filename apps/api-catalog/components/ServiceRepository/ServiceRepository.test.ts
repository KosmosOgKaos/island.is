import {getServices, GetServicesParameters} from './ServiceRepository'


describe('ServiceRepository', ()=>{

  describe('getAllServices', ()=>{
    
    it('Should get some services', async ()=> {
      const params: GetServicesParameters = {
        cursor:null, 
        limit:null,
        name:null,
        owner:null,
        pricing:null,
        data:null,
        type:null,
        access:null,
        searchMethod:null
      }
      const ret = await getServices(params);
      expect(ret.result[0].id).toBe('0');
      expect(ret.result[1].id).toBe('1');
    })
  });
});
  