'use strict';
/* eslint-env node */
/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  up: (queryInterface) => {

    const openId = {
      id: 'a57a3c0d-2645-44fd-950e-f3a7fb23ee8e',//uuidv4(),
      name: 'openid',
      display_name: 'Your user identifier',
      required: true,
      emphasize: false,
      enabled: true,
      show_in_discovery_document: true
    };

    const openIdClaims = [
      {identity_resource_id: openId.id, claim_name: 'sub'},
      {identity_resource_id: openId.id, claim_name: 'nat'},
      {identity_resource_id: openId.id, claim_name: 'natreg'}
    ];

    const profile = {
      id: 'fde089c6-142c-471e-a3f7-c4f76d0360d1',//uuidv4(),
      name: 'profile',
      display_name: 'User profile',
      description: 'Your user profile information (first name, last name, etc.)',
      required: false,
      emphasize: true,
      enabled: true,
      show_in_discovery_document: true
    };

    const profileClaims = [
      {identity_resource_id: profile.id, claim_name: 'name'},
      {identity_resource_id: profile.id, claim_name: 'family_name'},
      {identity_resource_id: profile.id, claim_name: 'given_name'},
      {identity_resource_id: profile.id, claim_name: 'middle_name'},
      {identity_resource_id: profile.id, claim_name: 'nickname'},
      {identity_resource_id: profile.id, claim_name: 'preferred_username'},
      {identity_resource_id: profile.id, claim_name: 'profile'},
      {identity_resource_id: profile.id, claim_name: 'picture'},
      {identity_resource_id: profile.id, claim_name: 'website'},
      {identity_resource_id: profile.id, claim_name: 'gender'},
      {identity_resource_id: profile.id, claim_name: 'birthdate'},
      {identity_resource_id: profile.id, claim_name: 'zoneinfo'},
      {identity_resource_id: profile.id, claim_name: 'locale'},
      {identity_resource_id: profile.id, claim_name: 'updated_at'}
    ];

    const email = {
      id: 'ac5300ca-bce5-49db-8d98-17f73c233b8c',//uuidv4(),
      name: 'email',
      display_name: 'Your email address',
      required: false,
      emphasize: true,
      enabled: true,
      show_in_discovery_document: true
    };

    const emailClaims = [
      {identity_resource_id: email.id, claim_name: 'email'},
      {identity_resource_id: email.id, claim_name: 'email_verified'},
    ];

    const identityResources = queryInterface.bulkInsert('identity_resource', [openId, profile, email], {})

    const userClaims = queryInterface.bulkInsert('identity_resource_user_claim', openIdClaims.concat(profileClaims, emailClaims), {})

    return identityResources.then(userClaims)
  },

  down: (queryInterface) => {

    const identityResources =  queryInterface.bulkDelete('identity_resource', null, {});
    const userClaims =  queryInterface.bulkDelete('identity_resource_user_claim', null, {});

    return userClaims.then(identityResources)
  }
};
