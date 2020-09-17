import React from 'react'
import { ServiceCardInformation, 
        getService, 
        ServiceResult, ServiceDetail, Layout} from '../../components';

export function ServiceDetailPage(service: ServiceCardInformation) {

    return (
        <Layout
            left ={
                        <ServiceDetail service={service} />}
        />
    )
}

ServiceDetailPage.getInitialProps = async (ctx):Promise<ServiceCardInformation> => {
    const { query } = ctx;
    const service:ServiceResult = await getService(query.service);

  return service.result;
}