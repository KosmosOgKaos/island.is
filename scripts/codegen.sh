#!/bin/bash

echo "Generating api.graphql..."

# We generate the api.graphql the main entry files
# yarn start api
# yarn start air-discount-api

echo "Now running all the codegen scripts..."

# We run all the codegen scripts
yarn nx run api:codegen
yarn nx run api:contentful-types
yarn nx run web:codegen
yarn nx run gjafakort-api:codegen
yarn nx run air-discount-scheme-api:codegen
