/* tslint:disable */
/* eslint-disable */
/**
 * X-Road Service Metadata API for REST
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.2
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
 * @interface ServiceIdType
 */
export interface ServiceIdType {
    /**
     * 
     * @type {string}
     * @memberof ServiceIdType
     */
    objectType?: ServiceIdTypeObjectTypeEnum;
}

export function ServiceIdTypeFromJSON(json: any): ServiceIdType {
    return ServiceIdTypeFromJSONTyped(json, false);
}

export function ServiceIdTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceIdType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'objectType': !exists(json, 'object_type') ? undefined : json['object_type'],
    };
}

export function ServiceIdTypeToJSON(value?: ServiceIdType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'object_type': value.objectType,
    };
}

/**
* @export
* @enum {string}
*/
export enum ServiceIdTypeObjectTypeEnum {
    MEMBER = 'MEMBER',
    SUBSYSTEM = 'SUBSYSTEM',
    SERVER = 'SERVER',
    GLOBALGROUP = 'GLOBALGROUP',
    SECURITYCATEGORY = 'SECURITYCATEGORY',
    SERVICE = 'SERVICE',
    CENTRALSERVICE = 'CENTRALSERVICE',
    LOCALGROUP = 'LOCALGROUP'
}


