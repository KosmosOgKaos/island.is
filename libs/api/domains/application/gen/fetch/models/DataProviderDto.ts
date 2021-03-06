/* tslint:disable */
/* eslint-disable */
/**
 * Application backend
 * This is provided as a reference to implement other backends.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface DataProviderDto
 */
export interface DataProviderDto {
    /**
     * 
     * @type {string}
     * @memberof DataProviderDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof DataProviderDto
     */
    type: DataProviderDtoTypeEnum;
}

export function DataProviderDtoFromJSON(json: any): DataProviderDto {
    return DataProviderDtoFromJSONTyped(json, false);
}

export function DataProviderDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DataProviderDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'type': json['type'],
    };
}

export function DataProviderDtoToJSON(value?: DataProviderDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'type': value.type,
    };
}

/**
* @export
* @enum {string}
*/
export enum DataProviderDtoTypeEnum {
    ExpectedDateOfBirth = 'ExpectedDateOfBirth',
    ExampleFails = 'ExampleFails',
    ExampleSucceeds = 'ExampleSucceeds'
}


