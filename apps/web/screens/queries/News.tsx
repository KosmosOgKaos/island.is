import gql from 'graphql-tag'

export const GET_NEWS_LIST_QUERY = gql`
  query GetNewsList($input: GetNewsListInput!) {
    getNewsList(input: $input) {
      page {
        page
        perPage
        totalPages
      }
      news {
        id
        title
        subtitle
        date
        slug
        intro
        image {
          url
          title
          width
          height
        }
      }
    }
  }
`

export const GET_SINGLE_NEWS_ITEM_QUERY = gql`
  query GetSingleNewsItem($input: GetSingleNewsInput!) {
    getSingleNews(input: $input) {
      id
      title
      subtitle
      date
      slug
      intro
      content
      image {
        url
        title
        width
        height
      }
    }
  }
`
