import React, { useState, useEffect } from 'react'
import {  Box,  
  Stack,  
  Button, 
  GridContainer, 
  GridRow, 
  GridColumn, 
  SidebarAccordion, RadioButton 
} from '@island.is/island-ui/core'

import { Layout, 
  ServiceCard,
  ServiceCardInformation, 
  CategoryCheckBox
} from '../../components'

import { getServices, 
  PRICING_CATEGORY, 
  DATA_CATEGORY, 
  TYPE_CATEGORY, 
  ACCESS_CATEGORY, 
  SERVICE_SEARCH_METHOD,
  GetServicesParameters, 
  getAllPriceCategories, 
  getAllDataCategories, 
  getAllAccessCategories, 
  getAllTypeCategories,
} from '../../components/ServiceRepository/service-repository'

//import * as styles from './ServiceList.treat';
//import cn from 'classnames'


export interface ServiceListProps {
  servicesList:Array<ServiceCardInformation>
  nextCursor: number
  prevCursor: number
  parameters: GetServicesParameters
}


export default function ServiceList(props:ServiceListProps) {
  
  if (!props.parameters === null) {
    props.parameters = { cursor:0, limit:null, owner:null, name:null, pricing:null, data:null, type:null, access:null, searchMethod:SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY };
  }
 
  const showNavigation = () => {
    return (
      <div className="navigation">
        <Button disabled={prevCursor === null} variant="text" onClick={() => onPageButtonClick(prevCursor)} leftIcon="arrowLeft">
          Fyrri
        </Button>
        <Button disabled={nextCursor === null} variant="text" onClick={() => onPageButtonClick(nextCursor)} icon="arrowRight">
          Næsta
        </Button>     
      </div>
    )
  }

  const selectAllCheckboxes = (select:boolean) => {
    props.parameters.cursor  = null;
    props.parameters.pricing = select? getAllPriceCategories()  : [];
    props.parameters.data    = select? getAllDataCategories()   : [];
    props.parameters.type    = select? getAllTypeCategories()   : [];
    props.parameters.access  = select? getAllAccessCategories() : [];
    setStatusQueryString(createStatusQueryString());
  }

  const onPageButtonClick = (nextCursor) => {
    props.parameters.cursor = nextCursor;
    setStatusQueryString(createStatusQueryString());
  }
  const onCheckSettingsCheckAllClick = event => {
    const selectAll = event.target.checked;
    setCheckSettingsCheckAll(selectAll);
    selectAllCheckboxes(selectAll);
  }
  const updateCategoryCheckBox = (target) => {
    const categoryValue:string = target.value;
    const checked:boolean = target.checked;
    props.parameters.cursor = null;
    let filter:Array<string>;
    switch(categoryValue){
      case PRICING_CATEGORY.FREE:
      case PRICING_CATEGORY.USAGE:
      case PRICING_CATEGORY.DAILY:
      case PRICING_CATEGORY.MONTHLY:
      case PRICING_CATEGORY.YEARLY: 
      case PRICING_CATEGORY.CUSTOM: filter = props.parameters.pricing; 
                                    break;
      case DATA_CATEGORY.PUBLIC:
      case DATA_CATEGORY.OFFICIAL:
      case DATA_CATEGORY.PERSONAL:     
      case DATA_CATEGORY.HEALTH:
      case DATA_CATEGORY.FINANCIAL: filter = props.parameters.data; 
                                    break;
      case TYPE_CATEGORY.REACT:
      case TYPE_CATEGORY.SOAP:           
      case TYPE_CATEGORY.GRAPHQL:   filter = props.parameters.type; 
                                    break;
      case ACCESS_CATEGORY.X_ROAD:
      case ACCESS_CATEGORY.API_GW:  filter = props.parameters.access; 
                                    break;

      default:
        console.error('Invalid checkbox value')
        return;
    }

    if (filter === null) {
      filter = [];
    }
    if (checked) {
        if (!filter.includes(categoryValue)) {
          filter.push(categoryValue)
        }
    } else {
      filter.splice(filter.indexOf(categoryValue), 1);
    }

    setStatusQueryString(createStatusQueryString());

  }

  const createStatusQueryString = ():string => {
    let str:string = props.parameters.cursor === null? 'null':props.parameters.cursor.toString();
    str+= `|${props.parameters.searchMethod}|${props.parameters.pricing.sort().join()}|${props.parameters.data.sort().join()}|${props.parameters.type.sort().join()}|${props.parameters.access.sort().join()}`;
    console.log(str);
    return str;  
  }

  const [services,    setServices]   = useState<Array<ServiceCardInformation>>(props.servicesList);
  const [prevCursor,  setPrevCursor] = useState<number>(props.prevCursor);
  const [nextCursor,  setNextCursor] = useState<number>(props.nextCursor);
  const [StatusQueryString, setStatusQueryString]= useState<string>(createStatusQueryString());

  //settings
  const [checkSettingsCheckAll,     setCheckSettingsCheckAll]     = useState<boolean>(false);
  const [checkSettingsSearchMethod, setCheckSettingsSearchMethod] = useState<SERVICE_SEARCH_METHOD>(props.parameters.searchMethod !== null ? props.parameters.searchMethod : SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY);
  const [radioSearchMethod,         setRadioSearchMethod]         = useState(checkSettingsSearchMethod === SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY? '1' : '2');
  useEffect(() => {
    const loadData = async () => {
      const response = await getServices(props.parameters);
      setServices(response.result);
      setPrevCursor(response.prevCursor);
      setNextCursor(response.nextCursor);
    }
      loadData();
  }, [
      checkSettingsSearchMethod,   
      StatusQueryString,
      props.parameters]);


  return (   
      <Layout left={
        <Box className="service-list">
          <Box marginBottom="containerGutter" marginTop={1}>
            <GridContainer>
              <GridRow className="service-items">
                <GridColumn span="9/12">
                  {showNavigation()}
                  <Stack space={2}>
                    {
                      services?.map( (item, index) => {
                        return <ServiceCard key={index} service={item} />
                      })
                    }
                  </Stack>
                    {showNavigation()}
                </GridColumn>
                <GridColumn  span="3/12" className="filter">
                <SidebarAccordion  id="pricing_category" label="Verð">
                  <CategoryCheckBox label={PRICING_CATEGORY.FREE}    value={PRICING_CATEGORY.FREE}    checked={props.parameters.pricing.includes(PRICING_CATEGORY.FREE)}    onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={PRICING_CATEGORY.USAGE}   value={PRICING_CATEGORY.USAGE}   checked={props.parameters.pricing.includes(PRICING_CATEGORY.USAGE)}   onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={PRICING_CATEGORY.DAILY}   value={PRICING_CATEGORY.DAILY}   checked={props.parameters.pricing.includes(PRICING_CATEGORY.DAILY)}   onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={PRICING_CATEGORY.MONTHLY} value={PRICING_CATEGORY.MONTHLY} checked={props.parameters.pricing.includes(PRICING_CATEGORY.MONTHLY)} onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={PRICING_CATEGORY.YEARLY}  value={PRICING_CATEGORY.YEARLY}  checked={props.parameters.pricing.includes(PRICING_CATEGORY.YEARLY)}  onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={PRICING_CATEGORY.CUSTOM}  value={PRICING_CATEGORY.CUSTOM}  checked={props.parameters.pricing.includes(PRICING_CATEGORY.CUSTOM)}  onChange={({target})=>{updateCategoryCheckBox(target)}} />
                </SidebarAccordion>

                <SidebarAccordion id="data_category" label="Gögn">
                  <CategoryCheckBox label={DATA_CATEGORY.PUBLIC}    value={DATA_CATEGORY.PUBLIC}    checked={props.parameters.data.includes(DATA_CATEGORY.PUBLIC)}    onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={DATA_CATEGORY.OFFICIAL}  value={DATA_CATEGORY.OFFICIAL}  checked={props.parameters.data.includes(DATA_CATEGORY.OFFICIAL)}  onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={DATA_CATEGORY.PERSONAL}  value={DATA_CATEGORY.PERSONAL}  checked={props.parameters.data.includes(DATA_CATEGORY.PERSONAL)}  onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={DATA_CATEGORY.HEALTH}    value={DATA_CATEGORY.HEALTH}    checked={props.parameters.data.includes(DATA_CATEGORY.HEALTH)}    onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={DATA_CATEGORY.FINANCIAL} value={DATA_CATEGORY.FINANCIAL} checked={props.parameters.data.includes(DATA_CATEGORY.FINANCIAL)} onChange={({target})=>{updateCategoryCheckBox(target)}} />
                </SidebarAccordion>

                <SidebarAccordion id="type_category" label="Gerð">
                  <CategoryCheckBox label={TYPE_CATEGORY.REACT}   value={TYPE_CATEGORY.REACT}   checked={props.parameters.type.includes(TYPE_CATEGORY.REACT)}   onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={TYPE_CATEGORY.SOAP}    value={TYPE_CATEGORY.SOAP}    checked={props.parameters.type.includes(TYPE_CATEGORY.SOAP)}    onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={TYPE_CATEGORY.GRAPHQL} value={TYPE_CATEGORY.GRAPHQL} checked={props.parameters.type.includes(TYPE_CATEGORY.GRAPHQL)} onChange={({target})=>{updateCategoryCheckBox(target)}} />
                </SidebarAccordion>

                <SidebarAccordion id="access_category" label="Aðgangur">
                  <CategoryCheckBox label={ACCESS_CATEGORY.X_ROAD} value={ACCESS_CATEGORY.X_ROAD}  checked={props.parameters.access.includes(ACCESS_CATEGORY.X_ROAD)} onChange={({target})=>{updateCategoryCheckBox(target)}} />
                  <CategoryCheckBox label={ACCESS_CATEGORY.API_GW} value={ACCESS_CATEGORY.API_GW}  checked={props.parameters.access.includes(ACCESS_CATEGORY.API_GW)} onChange={({target})=>{updateCategoryCheckBox(target)}} />
                </SidebarAccordion>
                <SidebarAccordion id="filter_settings" label="Stillingar">

                <CategoryCheckBox label="Velja"   value="select-all" checked={checkSettingsCheckAll}     onChange={onCheckSettingsCheckAllClick}
                    tooltip="Haka í eða úr öllum gildum í öllum flokkum."/>
          <div>
            <div>Leitaraðferð</div>
          <RadioButton name="RadioButtonSearchMethod" id="SearchMethod1" label="Einn" value="1"
            tooltip="Eitt gildi í einum flokk þarf að passa"
            onChange={({ target }) => {
            setRadioSearchMethod(target.value)
            props.parameters.searchMethod = target.value === '1'? SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY : SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_EACH_CATEGORY;
            setCheckSettingsSearchMethod(props.parameters.searchMethod)
          }}
          checked={radioSearchMethod === '1'}
        />
        <RadioButton name="RadioButtonSearchMethod" id="SearchMethod2" label="Allir" value="2"
          tooltip="Eitt gildi í hverjum flokk þarf að passa"
          onChange={({ target }) => {
            setRadioSearchMethod(target.value)
            props.parameters.searchMethod = target.value === '2'? SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_EACH_CATEGORY : SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY;
            setCheckSettingsSearchMethod(props.parameters.searchMethod)
          }}
          checked={radioSearchMethod === '2'}
        />
        </div>


                  </SidebarAccordion>
                </GridColumn>
              </GridRow>
            </GridContainer>
          </Box>
        </Box>
      } />
  )
}

ServiceList.getInitialProps = async ():Promise<ServiceListProps> => {

  const params:GetServicesParameters = { cursor:null, 
    limit:null, 
    owner:null,
    name:null, 
    pricing:getAllPriceCategories(), 
    data:getAllDataCategories(),
    type:getAllTypeCategories(),    
    access:getAllAccessCategories(),
    searchMethod:SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY
  };
  //params.pricing = params.pricing.filter(e => e !== PRICING_CATEGORY.FREE)
  console.log(JSON.parse(JSON.stringify(params)))
return { parameters:params, prevCursor:null, nextCursor:null, servicesList: null };
}