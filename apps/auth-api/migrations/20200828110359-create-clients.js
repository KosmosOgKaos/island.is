'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        CREATE TABLE client (
          client_id VARCHAR NOT NULL,
          allow_offline_access BOOLEAN NOT NULL DEFAULT false,
          identity_token_lifetime         INTEGER NOT NULL DEFAULT 300,
          access_token_lifetime           INTEGER NOT NULL DEFAULT 3600,
          authorization_code_lifetime     INTEGER NOT NULL DEFAULT 300,
          absolute_refresh_token_lifetime INTEGER NOT NULL DEFAULT 2592000,
          sliding_refresh_token_lifetime  INTEGER NOT NULL DEFAULT 1296000,
          consent_lifetime                INTEGER,
          refresh_token_usage            INTEGER NOT NULL DEFAULT 1,
          update_access_token_claims_on_refresh    BOOLEAN NOT NULL DEFAULT true,
          refresh_token_expiration       INTEGER NOT NULL DEFAULT 0,
          access_token_type             INTEGER NOT NULL DEFAULT 0,
          enable_local_login             BOOLEAN NOT NULL DEFAULT true,
          include_jwt_id                 BOOLEAN NOT NULL DEFAULT true,
          always_send_client_claims      BOOLEAN NOT NULL DEFAULT false,
          pair_wise_subject_salt         VARCHAR,
          user_sso_lifetime              INTEGER,
          user_code_type                 VARCHAR,
          device_code_lifetime           INTEGER NOT NULL DEFAULT 300,
          always_include_user_claims_in_id_token  BOOLEAN NOT NULL DEFAULT false,
          back_channel_logout_session_required BOOLEAN NOT NULL DEFAULT true,
          enabled                        BOOLEAN NOT NULL DEFAULT true,
          logo_uri                       VARCHAR,
          require_consent                BOOLEAN DEFAULT false,
          require_pkce                  BOOLEAN NOT NULL DEFAULT true,
          allow_plain_text_pkce           BOOLEAN NOT NULL DEFAULT false,
          require_request_object           BOOLEAN NOT NULL DEFAULT false,
          allow_access_token_via_browser   BOOLEAN NOT NULL DEFAULT false,
          front_channel_logout_uri        VARCHAR,
          front_channel_logout_session_required  BOOLEAN NOT NULL DEFAULT true,
          back_channel_logout_uri         VARCHAR,
          allow_remember_consent         BOOLEAN NOT NULL DEFAULT true,
          client_claims_prefix           VARCHAR NOT NULL DEFAULT 'client_',
          client_name                   VARCHAR,
          client_uri                    VARCHAR,
          description                  VARCHAR,
          protocol_type                 VARCHAR NOT NULL DEFAULT 'oidc',
          require_client_secret          BOOLEAN NOT NULL DEFAULT true,
          created TIMESTAMP WITH TIME ZONE DEFAULT now(),
          modified TIMESTAMP WITH TIME ZONE,
          PRIMARY KEY (client_id)
      );

      CREATE TABLE client_allowed_cors_origin (
        origin VARCHAR NOT NULL,
        client_id VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_allowed_cors_origin_client FOREIGN KEY (client_Id) REFERENCES client (client_id),
        PRIMARY KEY (origin, client_id)
      );

      CREATE TABLE client_allowed_scope (
        scope_name VARCHAR NOT NULL,
        client_id  VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_allowed_scope_client FOREIGN KEY (client_id) REFERENCES client (client_id),
        PRIMARY KEY (client_id, scope_name)
      );

      CREATE TABLE client_idp_restrictions (
        name VARCHAR NOT NULL,
        client_id VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_identity_provider_restrictions_client FOREIGN KEY (client_id) REFERENCES client (client_id),
        PRIMARY KEY (client_id, name)
      );

      CREATE TABLE client_post_logout_redirect_uri (
        client_id    VARCHAR NOT NULL,
        redirect_uri VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_post_redirect_uri_client FOREIGN KEY (client_id) REFERENCES client (client_id),
        PRIMARY KEY (client_id, redirect_uri)
      );

      CREATE TABLE client_secret (
        client_id VARCHAR NOT NULL,
        value VARCHAR NOT NULL,
        description VARCHAR NULL,
        type VARCHAR NOT NULL,
        expiration TIMESTAMP WITH TIME ZONE NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_secret_client FOREIGN KEY (client_id) REFERENCES client (client_id),
        PRIMARY KEY (client_id, value)
      );

      CREATE TABLE client_redirect_uri (
        client_id VARCHAR NOT NULL,
        redirect_uri VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (client_id, redirect_uri)
      );

      CREATE TABLE client_grant_type (
        client_id  VARCHAR NOT NULL,
        grant_type VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        CONSTRAINT FK_client_grant_type_client FOREIGN KEY (client_id) REFERENCES client (client_id),
        PRIMARY KEY (client_id, grant_type)
      );

<<<<<<< HEAD
=======
      CREATE TABLE grants (
        id uuid NOT NULL,
        key VARCHAR NOT NULL,
        client_id  VARCHAR NOT NULL,
        data  VARCHAR NOT NULL,
        expiration TIMESTAMP WITH TIME ZONE DEFAULT now(),
        subject_id VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (id),
        CONSTRAINT FK_grant_client FOREIGN KEY (client_id) REFERENCES client (client_id)
      );

>>>>>>> f7e1e8d6357d8c2706c9ee3ce6d190beeb4520fe
    COMMIT;
    `)
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        DROP TABLE client_secret;
        DROP TABLE client_post_logout_redirect_uri;
        DROP TABLE client_idp_restrictions;
        DROP TABLE client_allowed_cors_origin;
        DROP TABLE client_allowed_scope;
        DROP TABLE client_redirect_uri;
        DROP TABLE client_grant_type;
<<<<<<< HEAD
=======
        DROP TABLE grants;
>>>>>>> f7e1e8d6357d8c2706c9ee3ce6d190beeb4520fe
        DROP TABLE client;
      COMMIT;
    `)
  },
};
