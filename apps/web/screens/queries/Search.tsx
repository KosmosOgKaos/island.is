import gql from 'graphql-tag'

export const GET_SEARCH_RESULTS_QUERY = gql`
  query GetSearchResults($query: SearcherInput!) {
    searchResults(query: $query) {
      total
      items {
        id
        contentStatus
        title
        slug
        category {
          slug
        }
        organization {
          id
          title
          slug
        }
        relatedArticles {
          id
        }
        subArticles {
          title
        }
      }
    }
  }
`

export const GET_SEARCH_AUTOCOMPLETE_TERM_QUERY = gql`
  query AutocompleteTermResults($input: WebSearchAutocompleteInput!) {
    webSearchAutocomplete(input: $input) {
      completions
    }
  }
`

export const GET_SEARCH_RESULTS_QUERY_DETAILED = gql`
  query GetSearchResultsDetailed($query: SearcherInput!) {
    searchResults(query: $query) {
      total
      items {
        id
        contentStatus
        title
        slug
        category {
          slug
        }
        organization {
          id
          title
          slug
        }
        relatedArticles {
          id
        }
        subArticles {
          title
        }
      }
    }
  }
`
