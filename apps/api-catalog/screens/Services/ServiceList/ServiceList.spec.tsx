
import React from 'react'
import { render } from '@testing-library/react'

import ServiceList from './ServiceList'
import {  getAllPriceCategories, 
          GetServicesParameters, 
          SERVICE_SEARCH_METHOD  } from '../../../components';

describe(' ServiceList ', () => {
  

  const params:GetServicesParameters = { 
    cursor:null, 
    limit:null, 
    owner:null, 
    name:null, 
    pricing:getAllPriceCategories(), 
    data:[],
    access:[],
    type:[],
    searchMethod:SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY
  };
  
  it('should render successfully', () => {
    const { baseElement } = render(<ServiceList parameters={params} prevCursor={null} nextCursor={0} />);
    expect(baseElement).toBeTruthy();
  })
  
})
